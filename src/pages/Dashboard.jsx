import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Dados fictícios
  const vendas = [
    { produto: "Mouse", qtd: 120 },
    { produto: "Teclado", qtd: 90 },
    { produto: "Monitor", qtd: 70 },
    { produto: "Notebook", qtd: 50 },
    { produto: "Cadeira", qtd: 40 },
  ];

  const movimentacao = [
    { mes: "Jan", entrada: 300, saida: 200 },
    { mes: "Fev", entrada: 280, saida: 230 },
    { mes: "Mar", entrada: 350, saida: 300 },
    { mes: "Abr", entrada: 400, saida: 320 },
    { mes: "Mai", entrada: 420, saida: 380 },
  ];

  const categorias = [
    { name: "Informática", value: 400 },
    { name: "Móveis", value: 300 },
    { name: "Papelaria", value: 200 },
    { name: "Outros", value: 100 },
  ];

  const estoqueAtual = [
    { produto: "Mouse", qtd: 80 },
    { produto: "Teclado", qtd: 60 },
    { produto: "Monitor", qtd: 25 },
    { produto: "Notebook", qtd: 15 },
    { produto: "Cadeira", qtd: 10 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">📦 Dashboard de Estoque</h1>

      {/* GRID: Desktop = 2 colunas, Mobile = 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        
        {/* Produtos mais vendidos */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Produtos mais vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vendas}>
              <XAxis dataKey="produto" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qtd" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Entradas e saídas */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Entradas x Saídas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={movimentacao}>
              <XAxis dataKey="mes" stroke="#ccc" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="entrada" stroke="#00C49F" />
              <Line type="monotone" dataKey="saida" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Estoque por categoria */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Estoque por categoria</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorias}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                dataKey="value"
                label
              >
                {categorias.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Nível de estoque */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Nível de estoque</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart layout="vertical" data={estoqueAtual}>
              <XAxis type="number" />
              <YAxis dataKey="produto" type="category" stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="qtd" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
