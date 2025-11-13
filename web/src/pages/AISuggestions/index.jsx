import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { aiService } from '../../services/api';
import { FaBrain, FaChartLine, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import './style.css';

const AISuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await aiService.getReplenishmentSuggestions();
      setSuggestions(response.data || []);
    } catch (err) {
      console.error('Erro ao carregar sugestões de IA:', err);
      setError('Não foi possível carregar as sugestões. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'Alta':
        return <FaExclamationTriangle className="priority-icon high" />;
      case 'Média':
        return <FaChartLine className="priority-icon medium" />;
      default:
        return <FaCheckCircle className="priority-icon low" />;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="ai-suggestions-page">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Carregando sugestões de IA...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="ai-suggestions-page">
          <div className="error-container">
            <FaExclamationTriangle className="error-icon" />
            <h3>Erro ao carregar sugestões</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={loadSuggestions}>
              Tentar Novamente
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="ai-suggestions-page">
        <div className="page-header">
          <div className="header-content">
            <FaBrain className="header-icon" />
            <div>
              <h1 className="page-title">Sugestões de IA</h1>
              <p className="page-subtitle">
                Recomendações inteligentes para reposição de estoque
              </p>
            </div>
          </div>
          <button className="refresh-btn" onClick={loadSuggestions}>
            Atualizar
          </button>
        </div>

        {suggestions.length === 0 ? (
          <div className="empty-state">
            <FaCheckCircle className="empty-icon" />
            <h3>Tudo certo!</h3>
            <p>Não há sugestões de reposição no momento.</p>
          </div>
        ) : (
          <div className="suggestions-grid">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion-card priority-${suggestion.prioridade.toLowerCase()}`}
              >
                <div className="card-header">
                  <div className="product-info">
                    {getPriorityIcon(suggestion.prioridade)}
                    <h3 className="product-name">{suggestion.produto}</h3>
                  </div>
                  <span className={`priority-badge ${suggestion.prioridade.toLowerCase()}`}>
                    {suggestion.prioridade}
                  </span>
                </div>

                <div className="card-stats">
                  <div className="stat-box">
                    <span className="stat-label">Estoque Atual</span>
                    <span className="stat-value">{suggestion.estoqueAtual}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Previsão 7 dias</span>
                    <span className="stat-value forecast">{suggestion.previsao7dias}</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Previsão 30 dias</span>
                    <span className="stat-value forecast">{suggestion.previsao30dias}</span>
                  </div>
                </div>

                <div className="card-recommendation">
                  <FaChartLine className="recommendation-icon" />
                  <p>{suggestion.recomendacao}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AISuggestions;
