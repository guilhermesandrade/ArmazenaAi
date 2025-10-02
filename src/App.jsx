import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import boxLogo from './images/box.png'
import './App.css'
import Dashboard from './pages/Dashboard'

function Home() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  return (
    <>
      <div>
        <a target="_blank" rel="noopener noreferrer">
          <img src={boxLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Em breve ArmazenaAi</h1>
      <h2>A tela de dashboards do mais novo app para Controle de estoque</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Brinque com o contador por enquanto... {count}
        </button>
      </div>

      {/* Botão que leva até a tela Dashboard */}
      <button onClick={() => navigate('/dashboard')}>
        Ir para Dashboard
      </button>

      <a
        className="read-the-docs"
        href="https://github.com/guilhermesandrade/ArmazenaAi#"
        target="_blank"
        rel="noopener noreferrer"
      >
        Clique aqui e vá para meu repositório
      </a>
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
