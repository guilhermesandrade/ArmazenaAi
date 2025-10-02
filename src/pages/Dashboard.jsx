import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

// Dashboard.jsx
// Componente pronto para integrar ao seu projeto React (Vite + Tailwind).
// Como usar:
// 1) Coloque este arquivo em src/pages/Dashboard.jsx
// 2) Instale dependências: npm install recharts axios
// 3) Importe a rota no seu router (ex: /dashboard)
// O componente tenta buscar os dados em /api/dashboard (GET). Se não houver API,
// ele usa dados mock para demonstrar os gráficos e tabelas.

const COLORS = ["#4f46e5", "#06b6d4", "#f97316", "#ef4444", "#10b981"];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, /*setError*/] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const res = await axios.get("/api/dashboard");
        if (mounted && res.data) {
          setData(res.data);
        }
      } catch (err) {
        // se a API não existir, usamos mock local
        console.warn("Não foi possível buscar /api/dashboard — usando mock.", err.message);
        if (mounted) setData(mockData());
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, []);

  if (loading) return <div className="p-6">Carregando dashboard...</div>;
  if (error) return <div className="p-6 text-red-600">Erro: {error}</div>;

  // --- calculos e derivacoes ---
  const totalProducts = data.products.length;
  const outThisMonth = sumBy(data.movements, "monthOut");
  const outThisWeek = sumBy(data.movements, "weekOut");
  const outToday = sumBy(data.movements, "dayOut");

  const needReorder = data.products.filter((p) => p.stock <= p.minQuantity);
  const overstock = data.products.filter((p) => p.stock >= p.maxQuantity);

  const dailySeries = data.timeSeries.daily; // array {date, out}
  const weeklySeries = data.timeSeries.weekly; // array {week, out}
  const monthlySeries = data.timeSeries.monthly; // array {month, out}

  const productDistribution = data.products.map((p) => ({
    name: p.name,
    value: p.stock,
  }));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard — ArmazenaAi</h1>
        <p className="text-sm text-gray-500">Visão geral do estoque e indicadores principais</p>
      </header>

      {/* KPI cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Produtos cadastrados" value={totalProducts} />
        <Card title="Saídas (mês)" value={outThisMonth} />
        <Card title="Saídas (semana)" value={outThisWeek} />
        <Card title="Saídas (hoje)" value={outToday} />
      </section>

      {/* Charts area */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-medium mb-3">Tendência de Saídas (últimos 30 dias)</h2>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <LineChart data={dailySeries} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="out" stroke="#4f46e5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SmallStat title="Mês" series={monthlySeries} />
            <SmallStat title="Semana" series={weeklySeries} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow">
          <h2 className="text-lg font-medium mb-3">Distribuição de Estoque</h2>
          <div style={{ height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={productDistribution} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8">
                  {productDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Low stock / Overstock lists */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ListCard title="Produtos que precisam recomprar" items={needReorder} emptyMessage="Nenhum produto abaixo do mínimo" />
        <ListCard title="Produtos em excesso" items={overstock} emptyMessage="Nenhum produto acima do máximo" />
      </section>

      {/* Detailed table */}
      <section className="bg-white rounded-2xl p-4 shadow">
        <h2 className="text-lg font-medium mb-3">Inventário — Detalhes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-600 border-b">
                <th className="py-2">SKU</th>
                <th className="py-2">Produto</th>
                <th className="py-2">Categoria</th>
                <th className="py-2">Tamanho</th>
                <th className="py-2">Estoque</th>
                <th className="py-2">Mínimo</th>
                <th className="py-2">Máximo</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 text-sm">{p.sku}</td>
                  <td className="py-3 text-sm">{p.name}</td>
                  <td className="py-3 text-sm">{p.category}</td>
                  <td className="py-3 text-sm">{p.size ?? "-"}</td>
                  <td className="py-3 text-sm">{p.stock}</td>
                  <td className="py-3 text-sm">{p.minQuantity}</td>
                  <td className="py-3 text-sm">{p.maxQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="mt-6 text-sm text-gray-500">Última atualização: {new Date().toLocaleString()}</footer>
    </div>
  );
}

// ----- Componentes auxiliares -----
function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow flex items-center justify-between">
      <div>
        <div className="text-xs text-gray-500">{title}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      <div className="text-gray-300 text-3xl">📦</div>
    </div>
  );
}

function SmallStat({ title, series }) {
  // mostra um pequeno bar chart
  return (
    <div className="bg-gray-50 rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-sm font-medium">Total: {sumBy(series, "out")}</div>
      </div>
      <div style={{ height: 80 }}>
        <ResponsiveContainer>
          <BarChart data={series} margin={{ left: -20, right: 0 }}>
            <XAxis dataKey={Object.keys(series[0] || {})[0]} hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="out" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ListCard({ title, items, emptyMessage }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h3 className="text-md font-medium mb-3">{title}</h3>
      <div className="space-y-2">
        {items.length === 0 ? (
          <div className="text-sm text-gray-500">{emptyMessage}</div>
        ) : (
          items.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">Estoque: {p.stock} · Mín: {p.minQuantity} · Máx: {p.maxQuantity}</div>
              </div>
              <div className="text-sm">SKU: {p.sku}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ----- utilidades -----
function sumBy(list, key) {
  if (!Array.isArray(list)) return 0;
  return list.reduce((acc, cur) => acc + (Number(cur[key]) || 0), 0);
}

function mockData() {
  // exemplo de payload esperado pela tela
  const products = [
    { id: 1, sku: "CAM001", name: "Camiseta Básica", category: "Camisetas", size: "M", stock: 8, minQuantity: 5, maxQuantity: 50 },
    { id: 2, sku: "CAL001", name: "Calça Jeans", category: "Calças", size: "40", stock: 2, minQuantity: 3, maxQuantity: 30 },
    { id: 3, sku: "BLZ001", name: "Blazer Social", category: "Casacos", size: "G", stock: 60, minQuantity: 2, maxQuantity: 40 },
    { id: 4, sku: "SAP001", name: "Sapato Casual", category: "Calçados", size: "42", stock: 12, minQuantity: 4, maxQuantity: 20 },
  ];

  // séries temporais: daily (últimos 30 dias), weekly (últimas 12 semanas), monthly (últimos 6 meses)
  const daily = Array.from({ length: 30 }).map((_, i) => ({ date: formatDateOffset(-29 + i), out: Math.floor(Math.random() * 6) }));
  const weekly = Array.from({ length: 12 }).map((_, i) => ({ week: `W${12 - i}`, out: Math.floor(Math.random() * 40) }));
  const monthly = Array.from({ length: 6 }).map((_, i) => ({ month: `M${6 - i}`, out: Math.floor(Math.random() * 160) }));

  // movimentos agregados
  const movements = [
    { monthOut: sumBy(daily, "out"), weekOut: sumBy(weekly, "out"), dayOut: daily[daily.length - 1].out },
  ];

  return {
    products,
    timeSeries: { daily, weekly, monthly },
    movements,
  };
}

function formatDateOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}
