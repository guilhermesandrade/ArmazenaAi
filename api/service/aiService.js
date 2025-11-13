const { StockMovement, Product } = require('../models');
const PolynomialRegression = require('ml-regression-polynomial');
const { mean, standardDeviation, median } = require('simple-statistics');

class AIService {
  // Prever demanda usando Machine Learning (Regressão Polinomial)
  async predictDemand(productId, days = 30) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      // Buscar saídas dos últimos X dias (mais histórico para treinar o modelo)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (days * 2)); // Buscar dobro do período para melhor treinamento

      const movements = await StockMovement.find({
        produto: productId,
        tipo: 'saida',
        createdAt: { $gte: startDate },
      }).sort({ createdAt: 1 });

      if (movements.length < 3) {
        return {
          produto: product.nome,
          diasAnalisados: days,
          totalSaidas: 0,
          mediaDiaria: 0,
          previsao7dias: 0,
          previsao30dias: 0,
          recomendacao: 'Sem dados suficientes para previsão (mínimo 3 vendas necessárias)',
          metodo: 'Sem dados',
        };
      }

      // Agrupar vendas por dia
      const salesByDay = this.aggregateSalesByDay(movements);

      if (salesByDay.length < 3) {
        // Fallback para média simples se não houver dias suficientes
        return this.simpleForecast(product, movements, days);
      }

      // Preparar dados para ML
      const x = salesByDay.map((_, index) => index); // Dias (0, 1, 2, ...)
      const y = salesByDay.map(sale => sale.quantidade); // Quantidades vendidas

      // Treinar modelo de regressão polinomial (grau 2 para capturar tendências)
      const degree = Math.min(2, salesByDay.length - 1);
      const regression = new PolynomialRegression(x, y, degree);

      // Fazer previsões para os próximos 7 e 30 dias
      const lastDay = x[x.length - 1];
      const predictions7 = [];
      const predictions30 = [];

      for (let i = 1; i <= 30; i++) {
        const predicted = Math.max(0, regression.predict(lastDay + i)); // Não permitir valores negativos
        if (i <= 7) predictions7.push(predicted);
        predictions30.push(predicted);
      }

      const previsao7dias = Math.ceil(predictions7.reduce((a, b) => a + b, 0));
      const previsao30dias = Math.ceil(predictions30.reduce((a, b) => a + b, 0));

      // Calcular estatísticas
      const totalSaidas = movements.reduce((sum, mov) => sum + mov.quantidade, 0);
      const mediaDiaria = mean(y);
      const volatilidade = standardDeviation(y);

      // Detectar tendência usando regressão
      const trend = this.calculateMLTrend(x, y, regression);

      // Detectar sazonalidade
      const seasonality = this.detectSeasonality(movements);

      // Ajustar previsões baseado em sazonalidade
      const adjustedPrev7 = this.adjustForSeasonality(previsao7dias, seasonality, 7);
      const adjustedPrev30 = this.adjustForSeasonality(previsao30dias, seasonality, 30);

      // Gerar recomendação inteligente
      const recomendacao = this.generateSmartRecommendation(
        product.quantidade,
        adjustedPrev7,
        adjustedPrev30,
        trend,
        volatilidade
      );

      return {
        produto: product.nome,
        diasAnalisados: salesByDay.length,
        totalSaidas,
        mediaDiaria: mediaDiaria.toFixed(2),
        previsao7dias: Math.ceil(adjustedPrev7),
        previsao30dias: Math.ceil(adjustedPrev30),
        estoqueAtual: product.quantidade,
        recomendacao,
        metodo: 'Regressão Polinomial (ML)',
        analise: {
          tendencia: trend,
          volatilidade: volatilidade.toFixed(2),
          confiabilidade: this.calculateConfidence(salesByDay.length, volatilidade),
          sazonalidade: seasonality,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Agrupar vendas por dia
  aggregateSalesByDay(movements) {
    const salesByDay = {};

    movements.forEach(mov => {
      const dateKey = new Date(mov.createdAt).toISOString().split('T')[0];
      if (!salesByDay[dateKey]) {
        salesByDay[dateKey] = { data: dateKey, quantidade: 0 };
      }
      salesByDay[dateKey].quantidade += mov.quantidade;
    });

    return Object.values(salesByDay);
  }

  // Previsão simples (fallback)
  simpleForecast(product, movements, days) {
    const totalSaidas = movements.reduce((sum, mov) => sum + mov.quantidade, 0);
    const mediaDiaria = totalSaidas / days;
    const previsao7dias = Math.ceil(mediaDiaria * 7);
    const previsao30dias = Math.ceil(mediaDiaria * 30);

    return {
      produto: product.nome,
      diasAnalisados: days,
      totalSaidas,
      mediaDiaria: mediaDiaria.toFixed(2),
      previsao7dias,
      previsao30dias,
      estoqueAtual: product.quantidade,
      recomendacao: this.generateSmartRecommendation(
        product.quantidade,
        previsao7dias,
        previsao30dias,
        'Insuficiente',
        0
      ),
      metodo: 'Média Simples (poucos dados)',
      analise: {
        tendencia: 'Dados insuficientes',
        volatilidade: 'N/A',
        confiabilidade: 'Baixa',
        sazonalidade: { diaMaisVendas: 'N/A' },
      },
    };
  }

  // Calcular tendência usando ML
  calculateMLTrend(x, y, regression) {
    const firstPrediction = regression.predict(x[0]);
    const lastPrediction = regression.predict(x[x.length - 1]);
    const futurePrediction = regression.predict(x[x.length - 1] + 7);

    const recentTrend = ((lastPrediction - firstPrediction) / firstPrediction) * 100;
    const futureTrend = ((futurePrediction - lastPrediction) / lastPrediction) * 100;

    if (futureTrend > 10) {
      return 'Crescente Acelerado';
    } else if (futureTrend > 3) {
      return 'Crescente';
    } else if (futureTrend < -10) {
      return 'Decrescente Acelerado';
    } else if (futureTrend < -3) {
      return 'Decrescente';
    } else {
      return 'Estável';
    }
  }

  // Calcular confiabilidade da previsão
  calculateConfidence(dataPoints, volatility) {
    let score = 0;

    // Mais pontos de dados = maior confiança
    if (dataPoints >= 20) score += 40;
    else if (dataPoints >= 10) score += 25;
    else if (dataPoints >= 5) score += 10;

    // Menor volatilidade = maior confiança
    if (volatility < 2) score += 40;
    else if (volatility < 5) score += 25;
    else if (volatility < 10) score += 10;

    // Classificar
    if (score >= 60) return 'Alta';
    if (score >= 30) return 'Média';
    return 'Baixa';
  }

  // Detectar sazonalidade avançada
  detectSeasonality(movements) {
    const byDayOfWeek = {
      0: { count: 0, total: 0 },
      1: { count: 0, total: 0 },
      2: { count: 0, total: 0 },
      3: { count: 0, total: 0 },
      4: { count: 0, total: 0 },
      5: { count: 0, total: 0 },
      6: { count: 0, total: 0 },
    };

    movements.forEach((mov) => {
      const dayOfWeek = new Date(mov.createdAt).getDay();
      byDayOfWeek[dayOfWeek].count++;
      byDayOfWeek[dayOfWeek].total += mov.quantidade;
    });

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const averages = Object.keys(byDayOfWeek).map(day => ({
      dia: days[day],
      media: byDayOfWeek[day].count > 0
        ? byDayOfWeek[day].total / byDayOfWeek[day].count
        : 0,
      vendas: byDayOfWeek[day].total,
    }));

    const maxDay = averages.reduce((max, curr) =>
      curr.media > max.media ? curr : max
    , averages[0]);

    const minDay = averages.reduce((min, curr) =>
      curr.media < min.media && curr.media > 0 ? curr : min
    , averages.find(a => a.media > 0) || averages[0]);

    return {
      diaMaisVendas: maxDay.dia,
      diaMenosVendas: minDay.dia,
      fatorSazonalidade: maxDay.media > 0 ? (maxDay.media / minDay.media) : 1,
      distribuicao: averages,
    };
  }

  // Ajustar previsão baseado em sazonalidade
  adjustForSeasonality(prediction, seasonality, days) {
    // Se não há sazonalidade forte, retornar previsão original
    if (seasonality.fatorSazonalidade < 1.3) {
      return prediction;
    }

    // Aplicar ajuste leve baseado no fator de sazonalidade
    const adjustmentFactor = 1 + ((seasonality.fatorSazonalidade - 1) * 0.2);
    return prediction * adjustmentFactor;
  }

  // Gerar recomendação inteligente
  generateSmartRecommendation(estoqueAtual, prev7dias, prev30dias, tendencia, volatilidade) {
    let urgencia = '';
    let acao = '';
    let detalhes = '';

    // Determinar urgência
    if (estoqueAtual < prev7dias) {
      urgencia = '🔴 CRÍTICO';
      acao = 'Reposição imediata necessária!';
      detalhes = `Estoque atual (${estoqueAtual}) é insuficiente para os próximos 7 dias (demanda prevista: ${prev7dias} unidades).`;
    } else if (estoqueAtual < prev7dias * 1.5) {
      urgencia = '🟠 URGENTE';
      acao = 'Planejar reposição nos próximos 2-3 dias.';
      detalhes = `Estoque baixo. Demanda prevista em 7 dias: ${prev7dias} unidades.`;
    } else if (estoqueAtual < prev30dias) {
      urgencia = '🟡 ATENÇÃO';
      acao = 'Programar reposição nas próximas 2 semanas.';
      detalhes = `Estoque adequado para curto prazo. Demanda prevista em 30 dias: ${prev30dias} unidades.`;
    } else if (estoqueAtual < prev30dias * 1.5) {
      urgencia = '🟢 NORMAL';
      acao = 'Monitorar nos próximos 15 dias.';
      detalhes = `Estoque adequado. Continue acompanhando a demanda.`;
    } else {
      urgencia = '✅ ADEQUADO';
      acao = 'Estoque em bom nível.';
      detalhes = `Estoque confortável (${estoqueAtual} unidades) para a demanda prevista.`;
    }

    // Adicionar contexto de tendência
    if (tendencia.includes('Crescente')) {
      detalhes += ` Tendência ${tendencia.toLowerCase()} detectada - considere aumentar pedidos.`;
    } else if (tendencia.includes('Decrescente')) {
      detalhes += ` Tendência ${tendencia.toLowerCase()} detectada - ajuste pedidos conforme necessário.`;
    }

    // Adicionar alerta de volatilidade
    if (volatilidade > 5) {
      detalhes += ` ⚠️ Alta volatilidade nas vendas - mantenha estoque de segurança.`;
    }

    return `${urgencia} - ${acao} ${detalhes}`;
  }

  // Obter produtos que precisam de reposição
  async getReplenishmentSuggestions() {
    try {
      const products = await Product.find({ ativo: true });
      const suggestions = [];

      for (const product of products) {
        const prediction = await this.predictDemand(product._id, 30);

        if (
          prediction.estoqueAtual < prediction.previsao7dias ||
          product.estoqueBaixo
        ) {
          suggestions.push({
            produto: product.nome,
            categoria: product.categoria,
            estoqueAtual: product.quantidade,
            previsao7dias: prediction.previsao7dias,
            previsao30dias: prediction.previsao30dias,
            recomendacao: prediction.recomendacao,
            prioridade: this.calculatePriority(
              product.quantidade,
              prediction.previsao7dias,
              prediction.previsao30dias
            ),
            metodo: prediction.metodo,
            confiabilidade: prediction.analise?.confiabilidade || 'N/A',
          });
        }
      }

      return suggestions.sort((a, b) => {
        const priorityOrder = { Alta: 0, Média: 1, Baixa: 2 };
        return priorityOrder[a.prioridade] - priorityOrder[b.prioridade];
      });
    } catch (error) {
      throw error;
    }
  }

  // Calcular prioridade de forma mais inteligente
  calculatePriority(estoqueAtual, prev7dias, prev30dias) {
    const ratio7 = estoqueAtual / (prev7dias || 1);
    const ratio30 = estoqueAtual / (prev30dias || 1);

    if (ratio7 < 0.5) return 'Alta'; // Menos de 50% do necessário para 7 dias
    if (ratio7 < 1) return 'Alta'; // Insuficiente para 7 dias
    if (ratio30 < 0.8) return 'Média'; // Menos de 80% do necessário para 30 dias
    return 'Baixa';
  }
}

module.exports = new AIService();
