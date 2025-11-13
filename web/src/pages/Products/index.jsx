import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { productService, categoryService } from '../../services/api';
import './style.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    categoria: '',
    tamanho: 'M',
    cor: '',
    genero: 'Unissex',
    preco: '',
    quantidade: '',
    quantidadeMinima: '5',
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
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
      if (editingProduct) {
        await productService.update(editingProduct._id, formData);
        alert('Produto atualizado com sucesso!');
      } else {
        await productService.create(formData);
        alert('Produto criado com sucesso!');
      }

      setShowModal(false);
      resetForm();
      loadProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao salvar produto');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      nome: product.nome,
      descricao: product.descricao || '',
      categoria: product.categoria._id,
      tamanho: product.tamanho,
      cor: product.cor,
      genero: product.genero,
      preco: product.preco,
      quantidade: product.quantidade,
      quantidadeMinima: product.quantidadeMinima,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await productService.delete(id);
        alert('Produto excluído com sucesso!');
        loadProducts();
      } catch (error) {
        alert('Erro ao excluir produto');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      descricao: '',
      categoria: '',
      tamanho: 'M',
      cor: '',
      genero: 'Unissex',
      preco: '',
      quantidade: '',
      quantidadeMinima: '5',
    });
    setEditingProduct(null);
  };

  const columns = [
    { label: 'Nome', key: 'nome' },
    {
      label: 'Categoria',
      key: 'categoria',
      render: (value) => value?.nome || '-',
    },
    { label: 'Cor', key: 'cor' },
    { label: 'Tamanho', key: 'tamanho' },
    {
      label: 'Preço',
      key: 'preco',
      render: (value) =>
        new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value),
    },
    { label: 'Quantidade', key: 'quantidade' },
    {
      label: 'Ações',
      key: 'actions',
      render: (_, product) => (
        <div className="action-buttons">
          <button className="btn-edit" onClick={() => handleEdit(product)}>
            Editar
          </button>
          <button
            className="btn-delete"
            onClick={() => handleDelete(product._id)}
          >
            Excluir
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div className="products-page">
        <div className="page-header">
          <h1 className="page-title">Produtos</h1>
          <Button
            variant="success"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            Novo Produto
          </Button>
        </div>

        <Card>
          <Table columns={columns} data={products} />
        </Card>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>
                  {editingProduct ? 'Editar Produto' : 'Novo Produto'}
                </h2>
                <button
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="product-form">
                <Input
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />

                <Input
                  label="Descrição"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />

                <div className="input-group">
                  <label>Categoria *</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecione...</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Cor"
                  name="cor"
                  value={formData.cor}
                  onChange={handleChange}
                  required
                />

                <div className="form-row">
                  <div className="input-group">
                    <label>Tamanho *</label>
                    <select
                      name="tamanho"
                      value={formData.tamanho}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="PP">PP</option>
                      <option value="P">P</option>
                      <option value="M">M</option>
                      <option value="G">G</option>
                      <option value="GG">GG</option>
                      <option value="XG">XG</option>
                      <option value="Único">Único</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Gênero *</label>
                    <select
                      name="genero"
                      value={formData.genero}
                      onChange={handleChange}
                      required
                      className="input-field"
                    >
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Unissex">Unissex</option>
                      <option value="Infantil">Infantil</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <Input
                    label="Preço"
                    type="number"
                    name="preco"
                    value={formData.preco}
                    onChange={handleChange}
                    required
                    step="0.01"
                  />

                  <Input
                    label="Quantidade"
                    type="number"
                    name="quantidade"
                    value={formData.quantidade}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Quantidade Mínima"
                    type="number"
                    name="quantidadeMinima"
                    value={formData.quantidadeMinima}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="modal-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="success">
                    {editingProduct ? 'Atualizar' : 'Criar'}
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

export default Products;
