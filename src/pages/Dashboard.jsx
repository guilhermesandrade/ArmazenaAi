// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  // Estados simulando dados de estoque
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dados fictícios
  const dadosFicticios = [
    { id: 1, nome: "Arroz", quantidade: 20, minimo: 10, maximo: 50, vendidos: 8 },
    { id: 2, nome: "Feijão", quantidade: 5, minimo: 15, maximo: 40, vendidos: 12 },
    { id: 3, nome: "Macarrão", quantidade: 60, minimo: 20, maximo: 50, vendidos: 15 },
    { id: 4, nome: "Óleo", quantidade: 12, minimo: 8, maximo: 25, vendidos: 6 },
    { id: 5, nome: "Sal", quantidade: 2, minimo: 5, maximo: 20, vendidos: 3 }
  ];

  useEffect(() => {
    // Simulando carregamento (como se fosse API)
    setTimeout(() => {
      setProdutos(dadosFicticios);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <p style={{ color: "#fff" }}>Carregando dados...</p>;

  // Separando dados para relatórios
  const produtosParaComprar = produtos.filter(p => p.quantidade < p.minimo);
  const produtosExcesso = produtos.filter(p => p.quantidade > p.maximo);

  // Preparando dados para os gráficos
  const vendasData = produtos.map(p => ({ nome: p.nome, vendidos: p.vendidos }));
  const estoqueData = produtos.map(p => ({ nome: p.nome, quantidade: p.quantidade }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

  return (
    <div style={{ padding: "20px", backgroundColor: "#1e1e1e", minHeight: "100vh", color: "#fff" }}>
      <h1>📊 Dashboard de Estoque</h1>

      {/* Produtos que precisam ser comprados */}
      <div style={{ marginTop: "20px" }}>
        <h2>⚠️ Produtos para comprar</h2>
        {produtosParaComprar.length > 0 ? (
          <ul>
            {produtosParaComprar.map(p => (
              <li key={p.id}>{p.nome} (Quantidade atual: {p.quantidade}, mínimo: {p.minimo})</li>
            ))}
          </ul>
        ) : (
          <p>Todos os produtos estão dentro do limite mínimo ✅</p>
        )}
      </div>

      {/* Produtos em excesso */}
      <div style={{ marginTop: "20px" }}>
        <h2>📦 Produtos em excesso</h2>
        {produtosExcesso.length > 0 ? (
          <ul>
            {produtosExcesso.map(p => (
              <li key={p.id}>{p.nome} (Quantidade atual: {p.quantidade}, máximo: {p.maximo})</li>
            ))}
          </ul>
        ) : (
          <p>Não há produtos em excesso ✅</p>
        )}
      </div>

      {/* Gráfico de vendas */}
      <div style={{ marginTop: "40px", height: "300px" }}>
        <h2>📅 Vendas por produto</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={vendasData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendidos" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de estoque atual */}
      <div style={{ marginTop: "40px", height: "300px" }}>
        <h2>📦 Estoque atual</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={estoqueData}
              dataKey="quantidade"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {estoqueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
