import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import { productService, aiService } from '../../services/api';
import './style.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalValue: 0,
  });
  const [lowStockItems, setLowStockItems] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Buscar todos os produtos
      const productsResponse = await productService.getAll();
      const products = productsResponse.data || [];

      // Buscar produtos com estoque baixo
      const lowStockResponse = await productService.getLowStock();
      const lowStock = lowStockResponse.data || [];

      // Buscar sugestões de IA
      try {
        const aiResponse = await aiService.getReplenishmentSuggestions();
        const suggestions = aiResponse.data || [];
        setAiSuggestions(suggestions.slice(0, 3)); // Mostrar apenas os 3 primeiros
      } catch (aiError) {
        console.error('Erro ao carregar sugestões de IA:', aiError);
        setAiSuggestions([]);
      }

      // Calcular estatísticas
      const totalValue = products.reduce((sum, product) => {
        return sum + product.preco * product.quantidade;
      }, 0);

      setStats({
        totalProducts: products.length,
        lowStockProducts: lowStock.length,
        totalValue,
      });

      setLowStockItems(lowStock.slice(0, 5)); // Mostrar apenas os 5 primeiros
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        <h1 className="page-title">Dashboard</h1>

        <div className="stats-grid">
          <Card title="Total de Produtos">
            <div className="stat-value">{stats.totalProducts}</div>
            <div className="stat-label">produtos cadastrados</div>
          </Card>

          <Card title="Estoque Baixo">
            <div className="stat-value warning">{stats.lowStockProducts}</div>
            <div className="stat-label">produtos com estoque baixo</div>
          </Card>

          <Card title="Valor em Estoque">
            <div className="stat-value">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(stats.totalValue)}
            </div>
            <div className="stat-label">valor total em estoque</div>
          </Card>
        </div>

        {lowStockItems.length > 0 && (
          <Card title="Produtos com Estoque Baixo">
            <div className="low-stock-list">
              {lowStockItems.map((product) => (
                <div key={product._id} className="low-stock-item">
                  <div className="product-info">
                    <div className="product-name">{product.nome}</div>
                    <div className="product-details">
                      {product.cor} - {product.tamanho}
                    </div>
                  </div>
                  <div className="stock-info">
                    <span className="stock-quantity">{product.quantidade}</span>
                    <span className="stock-label">em estoque</span>
                  </div>
                </div>
              ))}
            </div>
            {stats.lowStockProducts > 5 && (
              <button
                className="view-all-btn"
                onClick={() => navigate('/products')}
              >
                Ver todos os produtos com estoque baixo
              </button>
            )}
          </Card>
        )}

        {aiSuggestions.length > 0 && (
          <Card title="🤖 Sugestões de IA - Previsão de Reposição">
            <div className="ai-suggestions-list">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`ai-suggestion-item ${
                    suggestion.prioridade === 'Alta' ? 'priority-high' : 'priority-medium'
                  }`}
                >
                  <div className="suggestion-header">
                    <div className="product-name">{suggestion.produto}</div>
                    <span className={`priority-badge ${suggestion.prioridade.toLowerCase()}`}>
                      {suggestion.prioridade}
                    </span>
                  </div>
                  <div className="suggestion-stats">
                    <div className="stat-item">
                      <span className="stat-label">Estoque Atual:</span>
                      <span className="stat-value">{suggestion.estoqueAtual}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Previsão 7 dias:</span>
                      <span className="stat-value">{suggestion.previsao7dias}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Previsão 30 dias:</span>
                      <span className="stat-value">{suggestion.previsao30dias}</span>
                    </div>
                  </div>
                  <div className="suggestion-recommendation">
                    {suggestion.recomendacao}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
