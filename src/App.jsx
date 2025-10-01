import { useState } from 'react'
import boxLogo from './images/box.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a  target="_blank" rel="noopener noreferrer">
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

export default App
