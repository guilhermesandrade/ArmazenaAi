// Simulação de IA simples para previsão de reposição
export const suggestRestock = (salesHistory = []) => {
if (!salesHistory.length) return 'Dados insuficientes';


const avgSales = salesHistory.reduce((a, b) => a + b, 0) / salesHistory.length;
if (avgSales > 10) return 'Alta demanda, recomenda-se repor o estoque em breve';
if (avgSales > 5) return 'Demanda moderada, monitorar o estoque';
return 'Baixa demanda, não há necessidade imediata de reposição';
};