
<img src="./assets readme/Banner.jpg">

# ArmazenaAi - Sistema Inteligente de Gestão de Estoque

> Sistema Full Stack moderno para controle de estoque com Inteligência Artificial para previsão de demanda

**🌐 Acesso à Aplicação Online:** [https://armazenaai-web.fly.dev/](https://armazenaai-web.fly.dev/)

Use as credenciais:
   - **Email:** `admin@armazenaai.com`
   - **Senha:** `senha123`



## 🎯 Sobre o Projeto

O **ArmazenaAi** é um sistema completo de gestão de estoque desenvolvido para lojistas e pequenas empresas do ramo da moda. A aplicação oferece controle total sobre o inventário, facilitando a gestão de itens de vestuário e acessórios, garantindo organização, agilidade e controle em tempo real.

Com ele é possível evitar problemas como:
- Perda de vendas por falta de controle de disponibilidade
- Excesso de produtos parados sem giro
- Erros manuais em planilhas

### Funcionalidades Principais:
- ✅ Controle de produtos (cadastro, edição, exclusão)
- ✅ Gestão de categorias
- ✅ Movimentações de estoque (entrada/saída)
- ✅ Dashboard com estatísticas em tempo real
- ✅ **Previsão de demanda com Machine Learning**
- ✅ Alertas de estoque baixo
- ✅ Histórico completo de movimentações



## Imagens do Sistema:

### Login
<img src="./assets readme/Login.jpg">

### Dashboard
<img src="./assets readme/Dashboard.jpg">

### Produtos
<img src="./assets readme/Produtos.jpg">

### Novo Produto
<img src="./assets readme/Novo Produto.jpg">

### Estoque
<img src="./assets readme/Estoque.jpg">

### Nova movimentação
<img src="./assets readme/Nova movimentação.jpg">

### Sugestões da IA
<img src="./assets readme/Sugestões da IA.jpg">



## ✅ Requisitos Técnicos Implementados

Este projeto atende aos requisitos técnicos da disciplina:

### 1️⃣ Frontend Moderno
- **React.js** com Vite
- Interface **responsiva** e compatível com dispositivos móveis
- Design moderno com gradientes, animações e componentes reutilizáveis
- Navegação por rotas (React Router)
- Gerenciamento de estado com Context API

### 2️⃣ Backend com API REST
- **Node.js + Express.js**
- API RESTful completa com operações **CRUD**
- Endpoints para: Produtos, Categorias, Usuários, Estoque, Movimentações, IA
- Arquitetura em camadas (Controllers, Services, Models)
- Validação de dados e tratamento de erros

### 3️⃣ Banco de Dados
- **MongoDB (NoSQL)**: Produtos, Usuários, Movimentações, Categorias
- **SQL Server (Relacional)**: utilizado para garantir consistência em tabelas estruturadas
- Integração híbrida demonstrando compreensão dos dois modelos

### 4️⃣ Criptografia de Senha
- **Bcrypt** para hash de senhas
- Salt rounds configurável (padrão: 10)
- Senhas **nunca** armazenadas em texto plano
- Método seguro de comparação de senhas

### 5️⃣ Autenticação e Proteção de Rotas
- **JWT (JSON Web Token)** para autenticação
- Login com validação de credenciais
- Middleware de autenticação no backend
- Proteção de rotas privadas no frontend
- Interceptors Axios para anexar token automaticamente
- Logout e renovação de sessão

### 6️⃣ Containerização com Docker
- **Dockerfile** para API (Node.js Alpine)
- **Dockerfile** para Web (Nginx Alpine)
- **docker-compose.yml** com orquestração completa
- Ambientes isolados e reproduzíveis
- Configuração para desenvolvimento e produção

### 7️⃣ Uso de Inteligência Artificial
- **Machine Learning REAL implementado**
- **Regressão Polinomial** (`ml-regression-polynomial`)
- Previsão de demanda baseada em histórico de vendas
- Análise estatística avançada (desvio padrão, volatilidade)
- Detecção de tendências (Crescente/Decrescente/Estável)
- Detecção de sazonalidade por dia da semana
- Ajuste automático de previsões
- Cálculo de confiabilidade (Alta/Média/Baixa)
- Recomendações inteligentes contextualizadas
- **100% gratuito** (sem APIs pagas)

### 8️⃣ Documentação
- ✅ README completo com instruções
- ✅ Diagrama de arquitetura
- ✅ Comentários no código
- ✅ Estrutura organizada e legível

### 9️⃣ Apresentação Funcional
- ✅ Sistema **online e funcional**: [armazenaai-web.fly.dev](https://armazenaai-web.fly.dev/)
- ✅ Deploy automatizado no Fly.io
- ✅ Demonstração completa das funcionalidades

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React.js** - Biblioteca para interfaces
- **Vite** - Build tool rápido
- **React Router** - Navegação entre páginas
- **Axios** - Cliente HTTP
- **React Toastify** - Notificações
- **React Icons** - Ícones modernos

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Mongoose** - ODM para MongoDB
- **Dotenv** - Variáveis de ambiente

### Banco de Dados
- **MongoDB Atlas** - Banco NoSQL em nuvem
- **SQL Server** - Banco SQL para dados relacionais

### Machine Learning
- **ml-regression-polynomial** - Regressão polinomial
- **simple-statistics** - Análise estatística
- Algoritmos próprios de detecção de tendências e sazonalidade

### DevOps & Deploy
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Fly.io** - Hospedagem em nuvem
- **GitHub** - Controle de versão
- **Git** - Versionamento

---

## 🏗️ Arquitetura da Aplicação

<img src="./assets readme/Arquitetura.png">


### Fluxo de Dados:
1. **Frontend** faz requisição HTTP para o Backend
2. **Controller** recebe e valida a requisição
3. **Middleware** verifica autenticação JWT
4. **Service** aplica regras de negócio
5. **Model** interage com o Banco de Dados
6. **IA** processa dados e retorna previsões
7. **Response** é enviada de volta ao Frontend

---

## ⚡ Funcionalidades

### 👤 Autenticação
- Login com email e senha
- Registro de novos usuários
- Proteção de rotas privadas
- Logout seguro

### 📦 Gestão de Produtos
- Cadastro completo (nome, categoria, cor, tamanho, preço, quantidade)
- Edição de produtos existentes
- Exclusão de produtos
- Listagem com filtros
- Busca por nome
- Indicador de estoque baixo

### 📊 Dashboard
- Total de produtos cadastrados
- Produtos com estoque baixo
- Valor total em estoque
- Lista de produtos críticos

### 🔄 Movimentações de Estoque
- Entrada de produtos (compra, devolução, produção, etc.)
- Saída de produtos (venda, perda, devolução ao fornecedor, etc.)
- Motivos padronizados por tipo
- Histórico completo de movimentações
- Atualização automática de estoque
- Registro de usuário e data/hora

### 🤖 Inteligência Artificial
- Previsões de demanda para 7 e 30 dias
- Análise de tendências de vendas
- Detecção de sazonalidade
- Sugestões de reposição prioritárias
- Níveis de urgência (Crítico, Urgente, Atenção, Normal, Adequado)
- Cálculo de confiabilidade das previsões
- Análise de volatilidade

### 🏷️ Categorias
- Gerenciamento de categorias de produtos
- Organização do inventário

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** 18+
- **Docker** e **Docker Compose**
- **MongoDB** (ou usar MongoDB Atlas)
- **Git**

### Opção 1: Usando Docker (Recomendado)

```bash
# 1. Clonar o repositório
git clone https://github.com/ArmazenaAI/ArmazenaAi.git
cd ArmazenaAi

# 2. Configurar variáveis de ambiente
cp api/.env.example api/.env
# Editar api/.env com suas credenciais

# 3. Subir os containers
docker-compose up -d

# 4. Acessar a aplicação
# Frontend: http://localhost
# Backend: http://localhost:3000
```

### Opção 2: Execução Local

#### Backend (API)
```bash
cd api
npm install
cp .env.example .env
# Configurar .env com MongoDB URI
npm start
# API rodando em http://localhost:3000
```

#### Frontend (Web)
```bash
cd web
npm install
npm run dev
# Aplicação rodando em http://localhost:5173
```

### Variáveis de Ambiente

**api/.env**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/armazenaai
JWT_SECRET=seu_secret_seguro_aqui
JWT_EXPIRES_IN=7d
SALT_ROUNDS=10
```

---

## 📂 Estrutura do Projeto

```
ArmazenaAi/
├── api/                          # Backend (Node.js)
│   ├── config/                   # Configurações
│   ├── controllers/              # Controladores REST
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── stockController.js
│   │   ├── categoryController.js
│   │   └── aiController.js
│   ├── middlewares/              # Middlewares
│   │   └── authMiddleware.js
│   ├── models/                   # Modelos MongoDB
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── StockMovement.js
│   ├── service/                  # Lógica de negócio
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── categoryService.js
│   │   └── aiService.js          # 🤖 IA/ML
│   ├── repository/               # Rotas
│   ├── Dockerfile
│   ├── package.json
│   └── index.js
│
├── web/                          # Frontend (React)
│   ├── src/
│   │   ├── components/           # Componentes reutilizáveis
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Layout/
│   │   │   └── Table/
│   │   ├── pages/                # Páginas
│   │   │   ├── Dashboard/
│   │   │   ├── Login/
│   │   │   ├── Products/
│   │   │   ├── Stock/
│   │   │   └── AISuggestions/
│   │   ├── context/              # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── services/             # API Client
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile.prod
│   ├── nginx.conf
│   └── package.json
│
├── docker-compose.yml            # Orquestração
├── .gitignore
└── README.md
```

---

## 🤖 Inteligência Artificial

### Tecnologia Implementada

O sistema utiliza **Machine Learning real** para previsão de demanda:

#### Algoritmo: Regressão Polinomial
- Treina modelo com histórico de vendas
- Captura tendências não-lineares
- Faz previsões baseadas em padrões aprendidos

#### Análises Estatísticas
- **Média diária de vendas**
- **Desvio padrão** (volatilidade)
- **Mediana** para valores atípicos
- **Cálculo de confiabilidade** (Alta/Média/Baixa)

#### Detecção de Padrões
- **Tendências**: Crescente Acelerado, Crescente, Estável, Decrescente, Decrescente Acelerado
- **Sazonalidade**: Análise por dia da semana
- **Ajuste automático**: Previsões ajustadas conforme padrões detectados

#### Previsões
- **7 dias**: Demanda estimada para próxima semana
- **30 dias**: Demanda estimada para próximo mês
- **Priorização**: Alta, Média ou Baixa
- **Recomendações**: Ações sugeridas com níveis de urgência

### Como Funciona

1. Sistema analisa movimentações de **saída tipo "venda"**
2. Agrupa vendas por dia
3. Treina modelo de regressão polinomial
4. Detecta tendências e sazonalidade
5. Faz previsões para 7 e 30 dias
6. Ajusta previsões com base em padrões
7. Compara com estoque atual
8. Gera recomendações inteligentes

### Exemplo de Resposta da IA

```json
{
  "produto": "Camiseta Básica Preta",
  "estoqueAtual": 15,
  "previsao7dias": 25,
  "previsao30dias": 100,
  "recomendacao": "🔴 CRÍTICO - Reposição imediata necessária! Estoque atual (15) é insuficiente para os próximos 7 dias (demanda prevista: 25 unidades). Tendência crescente detectada - considere aumentar pedidos.",
  "metodo": "Regressão Polinomial (ML)",
  "analise": {
    "tendencia": "Crescente",
    "volatilidade": "2.5",
    "confiabilidade": "Alta",
    "sazonalidade": {
      "diaMaisVendas": "Sáb",
      "fatorSazonalidade": 1.8
    }
  }
}
```

---

## 🔒 Segurança

### Implementações de Segurança

✅ **Criptografia de Senhas**
- Bcrypt com salt rounds configurável
- Hash irreversível
- Comparação segura

✅ **Autenticação JWT**
- Token assinado com secret
- Expiração configurável
- Validação em todas as rotas privadas

✅ **Proteção de Rotas**
- Middleware de autenticação
- Verificação de token
- Redirecionamento automático

✅ **Validação de Dados**
- Validação no frontend e backend
- Sanitização de inputs
- Prevenção de SQL/NoSQL Injection

✅ **CORS Configurado**
- Origens permitidas definidas
- Headers seguros

✅ **Variáveis de Ambiente**
- Credenciais fora do código
- .env não versionado
- Secrets seguros

---

## 🚀 Deploy

### Aplicação Online

**Frontend:** [https://armazenaai-web.fly.dev/](https://armazenaai-web.fly.dev/)
**Backend:** [https://armazenaai-api.fly.dev/](https://armazenaai-api.fly.dev/)

### Plataforma de Deploy

- **Fly.io** - Hospedagem de containers
- Build automático via Dockerfile
- Deploy via GitHub (CI/CD)
- Escalabilidade automática
- HTTPS configurado

---

## 👥 Equipe

Projeto desenvolvido por:

- **Guilherme Andrade**
- **Thullio Ferreira**
- **Gabriel Lucca**
- **Guilherme Imada**
- **Gabriel Piccirilo**
- **Carlos Eduardo**

**📚 Curso:** Sistemas de Informação
**🏫 Instituição:** Uni-FACEF
**📅 Ano:** 2025

---

## 📝 Licença

Este projeto é um trabalho acadêmico desenvolvido para fins educacionais.

---

## 🙏 Agradecimentos

- **Professor:** Por orientar e apoiar o desenvolvimento
- **Equipe:** Pela colaboração e dedicação
- **Comunidade Open Source:** Pelas ferramentas incríveis

---

**Desenvolvido com ❤️ pela equipe ArmazenaAi**


