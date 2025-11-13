import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { productService, stockService } from '../../services/api';
import './style.css';

const Stock = () => {
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    produto: '',
    tipo: 'entrada',
    quantidade: '',
    motivo: '',
    observacao: '',
  });

  // Motivos padronizados por tipo
  const motivosEntrada = [
    { value: 'compra', label: 'Compra de Fornecedor' },
    { value: 'devolucao', label: 'Devolução de Cliente' },
    { value: 'producao', label: 'Produção Interna' },
    { value: 'transferencia', label: 'Transferência entre Lojas' },
    { value: 'ajuste', label: 'Ajuste de Inventário' },
    { value: 'outro', label: 'Outro' },
  ];

  const motivosSaida = [
    { value: 'venda', label: 'Venda' },
    { value: 'perda', label: 'Perda/Quebra' },
    { value: 'devolucao_fornecedor', label: 'Devolução ao Fornecedor' },
    { value: 'uso_interno', label: 'Uso Interno' },
    { value: 'amostra', label: 'Amostra Grátis' },
    { value: 'transferencia', label: 'Transferência entre Lojas' },
    { value: 'ajuste', label: 'Ajuste de Inventário' },
    { value: 'outro', label: 'Outro' },
  ];

  const getMotivosDisponiveis = () => {
    return formData.tipo === 'entrada' ? motivosEntrada : motivosSaida;
  };

  const getMotivoLabel = (tipo, motivoValue) => {
    const motivos = tipo === 'entrada' ? motivosEntrada : motivosSaida;
    const motivo = motivos.find(m => m.value === motivoValue);
    return motivo ? motivo.label : motivoValue;
  };

  useEffect(() => {
    loadProducts();
    loadMovements();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const loadMovements = async () => {
    try {
      const response = await stockService.getMovementHistory({ limit: 50 });
      setMovements(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar movimentações:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await productService.updateStock(formData.produto, {
        quantidade: parseInt(formData.quantidade),
        tipo: formData.tipo,
        motivo: formData.motivo,
        observacao: formData.observacao,
      });

      alert('Estoque atualizado com sucesso!');
      setShowModal(false);
      resetForm();
      loadProducts();
      loadMovements();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao atualizar estoque');
    }
  };

  const handleTipoChange = (e) => {
    setFormData({
      ...formData,
      tipo: e.target.value,
      motivo: '', // Resetar motivo ao mudar tipo
    });
  };

  const resetForm = () => {
    setFormData({
      produto: '',
      tipo: 'entrada',
      quantidade: '',
      motivo: '',
      observacao: '',
    });
  };

  const movementColumns = [
    {
      label: 'Data',
      key: 'createdAt',
      render: (value) => new Date(value).toLocaleString('pt-BR'),
    },
    {
      label: 'Produto',
      key: 'produto',
      render: (value) => value?.nome || '-',
    },
    {
      label: 'Tipo',
      key: 'tipo',
      render: (value) => (
        <span className={`badge badge-${value}`}>
          {value === 'entrada' ? 'Entrada' : 'Saída'}
        </span>
      ),
    },
    { label: 'Quantidade', key: 'quantidade' },
    {
      label: 'Motivo',
      key: 'motivo',
      render: (value, row) => getMotivoLabel(row.tipo, value),
    },
    {
      label: 'Usuário',
      key: 'usuario',
      render: (value) => value?.nome || '-',
    },
  ];

  return (
    <Layout>
      <div className="stock-page">
        <div className="page-header">
          <h1 className="page-title">Controle de Estoque</h1>
          <Button
            variant="success"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            Nova Movimentação
          </Button>
        </div>

        <Card title="Histórico de Movimentações">
          <Table columns={movementColumns} data={movements} />
        </Card>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Nova Movimentação</h2>
                <button
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="stock-form">
                <div className="input-group">
                  <label>Produto *</label>
                  <select
                    name="produto"
                    value={formData.produto}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecione um produto...</option>
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.nome} - {product.cor} ({product.tamanho}) -
                        Estoque: {product.quantidade}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Tipo de Movimentação *</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleTipoChange}
                    required
                    className="input-field"
                  >
                    <option value="entrada">Entrada (Adicionar ao Estoque)</option>
                    <option value="saida">Saída (Remover do Estoque)</option>
                  </select>
                </div>

                <Input
                  label="Quantidade"
                  type="number"
                  name="quantidade"
                  value={formData.quantidade}
                  onChange={handleChange}
                  required
                  min="1"
                />

                <div className="input-group">
                  <label>Motivo *</label>
                  <select
                    name="motivo"
                    value={formData.motivo}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecione o motivo...</option>
                    {getMotivosDisponiveis().map((motivo) => (
                      <option key={motivo.value} value={motivo.value}>
                        {motivo.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Observação"
                  name="observacao"
                  value={formData.observacao}
                  onChange={handleChange}
                  placeholder="Informações adicionais (opcional)"
                />

                <div className="modal-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="success">
                    Registrar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Stock;
