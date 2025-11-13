# 🚀 Guia de Configuração e Execução - ArmazenaAi

Este guia contém instruções detalhadas para configurar e executar o projeto ArmazenaAi.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **MongoDB** (versão 6 ou superior)
- **Docker** e **Docker Compose** (opcional, para execução com containers)
- **Git**

## 🏗️ Arquitetura do Projeto

O projeto está organizado em uma estrutura de monorepo:

```
ArmazenaAi/
├── api/              # Backend (Node.js + Express + MongoDB)
├── web/              # Frontend (React + Vite)
├── docker-compose.yml
└── SETUP.md
```

## 📦 Instalação

### Opção 1: Execução Local (sem Docker)

#### 1. Instalar MongoDB

Certifique-se de que o MongoDB está instalado e rodando em `mongodb://localhost:27017`.

#### 2. Configurar o Backend (API)

```bash
# Navegar para o diretório da API
cd api

# Instalar dependências
npm install

# O arquivo .env já está configurado com:
# PORT=3000
# JWT_SECRET=uma_chave_super_secreta_aqui
# JWT_EXPIRES_IN=1h
# SALT_ROUNDS=10
# MONGODB_URI=mongodb://localhost:27017/armazenaai

# Iniciar o servidor
npm start
```

A API estará disponível em: `http://localhost:3000`

#### 3. Configurar o Frontend (Web)

```bash
# Em outro terminal, navegar para o diretório web
cd web

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

### Opção 2: Execução com Docker (Recomendado)

```bash
# Na raiz do projeto, executar:
docker-compose up --build

# Para executar em segundo plano:
docker-compose up -d --build
```

**Serviços disponíveis:**
- Frontend: `http://localhost`
- API: `http://localhost:3000`
- MongoDB: `localhost:27017`

**Parar os containers:**
```bash
docker-compose down
```

**Ver logs:**
```bash
docker-compose logs -f
```

## 👤 Primeiro Acesso

### 1. Criar o Primeiro Usuário

Como a aplicação requer autenticação, você precisa criar um usuário para fazer login.

**Via API (Postman, Insomnia, ou curl):**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Administrador",
    "email": "admin@armazenaai.com",
    "senha": "senha123",
    "role": "admin"
  }'
```

**Resposta esperada:**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "user": {
      "_id": "...",
      "nome": "Administrador",
      "email": "admin@armazenaai.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 2. Fazer Login na Aplicação

1. Acesse `http://localhost:5173` (desenvolvimento) ou `http://localhost` (Docker)
2. Use as credenciais:
   - **Email:** `admin@armazenaai.com`
   - **Senha:** `senha123`

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação e Segurança
- Registro e login de usuários
- JWT (JSON Web Token) para autenticação
- Senhas criptografadas com bcrypt
- Rotas protegidas por autenticação
- Controle de acesso por roles (admin, gerente, funcionário)

### ✅ Gerenciamento de Produtos
- Cadastro completo de produtos (nome, categoria, tamanho, cor, gênero, preço)
- Edição e exclusão de produtos
- Listagem com filtros por categoria, gênero, tamanho e cor
- Controle de quantidade em estoque
- Alertas de estoque baixo

### ✅ Gerenciamento de Categorias
- CRUD completo de categorias
- Vinculação de produtos às categorias

### ✅ Controle de Estoque
- Registro de entrada e saída de produtos
- Histórico completo de movimentações
- Rastreamento de quem fez cada movimentação
- Motivos e observações para cada movimentação
- Atualização automática de quantidades

### ✅ Dashboard
- Visão geral do estoque
- Total de produtos cadastrados
- Produtos com estoque baixo
- Valor total em estoque
- Lista rápida de produtos que precisam reposição

### ✅ Inteligência Artificial
- Previsão de demanda baseada em histórico de vendas
- Análise de tendências (crescente, decrescente, estável)
- Detecção de sazonalidade por dia da semana
- Sugestões inteligentes de reposição
- Cálculo de previsão para 7 e 30 dias

## 📡 Endpoints da API

### Autenticação
```
POST   /api/auth/register       # Registrar usuário
POST   /api/auth/login          # Login
GET    /api/auth/profile        # Obter perfil (requer autenticação)
```

### Categorias
```
POST   /api/categories          # Criar categoria
GET    /api/categories          # Listar categorias
GET    /api/categories/:id      # Obter categoria por ID
PUT    /api/categories/:id      # Atualizar categoria
DELETE /api/categories/:id      # Deletar categoria
```

### Produtos
```
POST   /api/products            # Criar produto
GET    /api/products            # Listar produtos (com filtros)
GET    /api/products/low-stock  # Produtos com estoque baixo
GET    /api/products/:id        # Obter produto por ID
PUT    /api/products/:id        # Atualizar produto
DELETE /api/products/:id        # Deletar produto
POST   /api/products/:id/stock  # Atualizar estoque (entrada/saída)
```

### Estoque
```
GET    /api/stock/movements     # Histórico de movimentações
GET    /api/stock/movements/product/:productId  # Movimentações de um produto
GET    /api/stock/stats         # Estatísticas de movimentação
```

### IA
```
GET    /api/ai/predict/:productId        # Prever demanda de um produto
GET    /api/ai/replenishment             # Sugestões de reposição
```

## 🧪 Testando a Aplicação

### 1. Criar Categorias

Primeiro, crie algumas categorias:

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"nome": "Camisetas", "descricao": "Camisetas em geral"}'
```

### 2. Criar Produtos

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "nome": "Camiseta Básica",
    "categoria": "ID_DA_CATEGORIA",
    "tamanho": "M",
    "cor": "Branca",
    "genero": "Unissex",
    "preco": 49.90,
    "quantidade": 10,
    "quantidadeMinima": 5
  }'
```

### 3. Registrar Movimentação

```bash
curl -X POST http://localhost:3000/api/products/ID_DO_PRODUTO/stock \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "tipo": "saida",
    "quantidade": 2,
    "motivo": "Venda",
    "observacao": "Cliente João"
  }'
```

### 4. Obter Previsão de Demanda

```bash
curl -X GET http://localhost:3000/api/ai/predict/ID_DO_PRODUTO?days=30 \
  -H "Authorization: Bearer SEU_TOKEN"
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **CORS** - Controle de acesso
- **Dotenv** - Gerenciamento de variáveis de ambiente

### Frontend
- **React** 19 - Biblioteca UI
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Servidor web (produção)

## 🔒 Segurança

- Senhas hasheadas com bcrypt (10 rounds)
- Tokens JWT com expiração de 1 hora
- Validação de entrada em todos os endpoints
- CORS configurado
- Soft delete para produtos e categorias
- Middleware de autenticação em rotas protegidas

## 📊 Estrutura do Banco de Dados

### Collections

- **users** - Usuários do sistema
- **products** - Produtos cadastrados
- **categories** - Categorias de produtos
- **stockmovements** - Movimentações de estoque

### Relationships

- `Product.categoria` → `Category._id`
- `StockMovement.produto` → `Product._id`
- `StockMovement.usuario` → `User._id`

## 🐛 Troubleshooting

### Erro de conexão com MongoDB

```
Erro ao conectar ao MongoDB: connect ECONNREFUSED
```

**Solução:** Certifique-se de que o MongoDB está rodando:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### Erro de CORS

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solução:** Verifique se a API está configurada para aceitar requisições do frontend. O CORS já está configurado no backend.

### Porta já em uso

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solução:** Altere a porta no arquivo `.env` ou encerre o processo que está usando a porta:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

## 📝 Notas Adicionais

- O projeto usa **soft delete** - produtos e categorias não são realmente excluídos, apenas marcados como inativos
- A IA é baseada em algoritmos estatísticos simples - para produção, considere usar bibliotecas especializadas
- O sistema suporta múltiplos usuários com diferentes níveis de acesso (role-based)
- Todas as rotas de API (exceto login e registro) requerem autenticação via Bearer token

## 👥 Suporte

Para dúvidas ou problemas, consulte a equipe de desenvolvimento ou abra uma issue no repositório.
