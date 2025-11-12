const { StockMovement, Product } = require('../models');

class AIService {
  // Prever demanda para um produto baseado no histórico
  async predictDemand(productId, days = 30) {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      // Buscar saídas dos últimos X dias
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);

      const movements = await StockMovement.find({
        produto: productId,
        tipo: 'saida',
        createdAt: { $gte: startDate },
      });

      if (movements.length === 0) {
        return {
          produto: product.nome,
          diasAnalisados: days,
          totalSaidas: 0,
          mediaDiaria: 0,
          previsao7dias: 0,
          previsao30dias: 0,
          recomendacao: 'Sem dados suficientes para previsão',
        };
      }

      // Calcular total de saídas
      const totalSaidas = movements.reduce(
        (sum, mov) => sum + mov.quantidade,
        0
      );

      // Calcular média diária
      const mediaDiaria = totalSaidas / days;

      // Prever para próximos 7 e 30 dias
      const previsao7dias = Math.ceil(mediaDiaria * 7);
      const previsao30dias = Math.ceil(mediaDiaria * 30);

      // Gerar recomendação
      let recomendacao = '';
      const estoqueAtual = product.quantidade;

      if (estoqueAtual < previsao7dias) {
        recomendacao = `URGENTE: Estoque atual (${estoqueAtual}) não é suficiente para os próximos 7 dias. Recomenda-se reposição imediata.`;
      } else if (estoqueAtual < previsao30dias) {
        recomendacao = `ATENÇÃO: Estoque atual (${estoqueAtual}) pode não ser suficiente para os próximos 30 dias. Planeje reposição.`;
      } else {
        recomendacao = `Estoque adequado para a demanda atual. Continue monitorando.`;
      }

      return {
        produto: product.nome,
        diasAnalisados: days,
        totalSaidas,
        mediaDiaria: mediaDiaria.toFixed(2),
        previsao7dias,
        previsao30dias,
        estoqueAtual,
        recomendacao,
        analise: {
          tendencia: this.calculateTrend(movements),
          sazonalidade: this.detectSeasonality(movements),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Calcular tendência de vendas
  calculateTrend(movements) {
    if (movements.length < 2) {
      return 'Dados insuficientes';
    }

    // Dividir em duas metades e comparar
    const midPoint = Math.floor(movements.length / 2);
    const firstHalf = movements.slice(0, midPoint);
    const secondHalf = movements.slice(midPoint);

    const firstHalfAvg =
      firstHalf.reduce((sum, mov) => sum + mov.quantidade, 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((sum, mov) => sum + mov.quantidade, 0) /
      secondHalf.length;

    if (secondHalfAvg > firstHalfAvg * 1.1) {
      return 'Crescente';
    } else if (secondHalfAvg < firstHalfAvg * 0.9) {
      return 'Decrescente';
    } else {
      return 'Estável';
    }
  }

  // Detectar sazonalidade (simplificado)
  detectSeasonality(movements) {
    // Analisar distribuição por dia da semana
    const byDayOfWeek = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    movements.forEach((mov) => {
      const dayOfWeek = new Date(mov.createdAt).getDay();
      byDayOfWeek[dayOfWeek] += mov.quantidade;
    });

    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const maxDay = Object.keys(byDayOfWeek).reduce((a, b) =>
      byDayOfWeek[a] > byDayOfWeek[b] ? a : b
    );

    return {
      diaMaisVendas: days[maxDay],
      distribuicao: Object.keys(byDayOfWeek).map((day) => ({
        dia: days[day],
        vendas: byDayOfWeek[day],
      })),
    };
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
            categoriza: product.categoria,
            estoqueAtual: product.quantidade,
            previsao7dias: prediction.previsao7dias,
            previsao30dias: prediction.previsao30dias,
            recomendacao: prediction.recomendacao,
            prioridade:
              product.quantidade < prediction.previsao7dias ? 'Alta' : 'Média',
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
}

module.exports = new AIService();
