# 📦 ArmazenaAi

ArmazenaAi é um sistema de controle de estoque para moda, desenvolvido em React + JavaScript.
O projeto tem como objetivo facilitar a gestão de itens de vestuário e acessórios, garantindo organização, agilidade e controle em tempo real sobre o inventário.

## 🎯 Objetivo

O projeto foi criado para atender a necessidade de lojistas, empreendedores e pequenas empresas do ramo da moda, permitindo o acompanhamento de peças, categorias e quantidades em estoque.

Com ele é possível evitar problemas como:

Perda de vendas por falta de controle de disponibilidade.

Excesso de produtos parados sem giro.

Erros manuais em planilhas.

## 🚀 🛠️ Tecnologias Utilizadas
#### 🔹 Front-end

React.js (com Vite) para criação da interface dinâmica e responsiva.

JavaScript para a lógica de interação e manipulação de dados.

#### 🔹 Back-end

Node.js + Express.js para criação de rotas e API REST.

Implementação de endpoints para cadastro, edição, exclusão e listagem de produtos.

#### 🔹 Banco de Dados

MongoDB (NoSQL): utilizado para dados dinâmicos e flexíveis, como histórico de movimentações e registros de operações.

SQL Server (Relacional): utilizado para garantir consistência em tabelas estruturadas, como cadastro de produtos, categorias e usuários.

Integração entre os bancos para unir escalabilidade (MongoDB) e consistência transacional (SQL Server).

#### 🔹 Criptografia e Segurança

JWT (JSON Web Token) para autenticação de usuários.

Bcrypt para criptografia de senhas e proteção de dados sensíveis.

#### 🔹 Containerização

Docker para padronização do ambiente de desenvolvimento e implantação da aplicação.

Criação de containers separados para Front-end, Back-end e Banco de Dados, facilitando escalabilidade.

#### 🔹 Inteligência Artificial

Utilização de modelos preditivos para sugerir reposição de produtos com base no histórico de vendas.

Implementação de algoritmos simples para previsão de demanda e detecção de padrões de consumo.

## 🏗️ Arquitetura da Aplicação

A aplicação será estruturada em uma arquitetura baseada em camadas:

#### Camada de Apresentação (Front-end):
Interface desenvolvida em React, responsável pela interação com o usuário, exibição do estoque e formulários de cadastro.

#### Camada de Lógica (Back-end):
API desenvolvida em Node.js + Express, que processa requisições, aplica regras de negócio e integra com o banco de dados.

#### Camada de Dados (Banco de Dados):
SQL Server para informações relacionais (produtos, categorias, usuários).

MongoDB para dados não estruturados (movimentações, registros históricos, logs).

#### Camada de Segurança:
Mecanismos de autenticação (JWT) e criptografia (Bcrypt) garantem acesso seguro às funcionalidades.

#### Camada de Inteligência:
Algoritmos de IA oferecem insights sobre reposição e previsão de demanda.

#### Containerização: 
Docker orquestra os serviços em ambientes isolados, facilitando a execução local e a implantação em servidores de produção.

## 🛠️ Funcionalidades (planejadas)

✔️ Cadastro de produtos (nome, categoria, tamanho, cor, preço e quantidade).

✔️ Edição e exclusão de itens.

✔️ Controle de entrada e saída de estoque.

✔️ Dashboard com visão geral de produtos.

✔️ Busca e filtros por categoria, gênero e tamanho.

✔️ Armazenamento local (localStorage ou API futura).

(novas funcionalidades podem ser adicionadas conforme evolução do projeto)

## 📂 Estrutura do Projeto

ArmazenaAi/

 ├── public/            # Arquivos estáticos
 
 ├── src/
 
 │   ├── components/    # Componentes reutilizáveis (Card, Tabela, Formulários)
 
 │   ├── pages/         # Páginas principais (Login, Dashboard, Estoque)
 
 │   ├── App.jsx        # Componente raiz
 
 │   ├── main.jsx       # Ponto de entrada
 
 │   └── styles/        # Estilizações globais
 
 ├── package.json
 
 └── vite.config.js

## ⚙️ Como Rodar o Projeto
1. Clonar o repositório
git clone git@github.com:guilhermesandrade/ArmazenaAi.git
cd ArmazenaAi

2. Instalar dependências
npm install

3. Rodar em ambiente de desenvolvimento
npm run dev

4. Gerar build de produção
npm run build

## 📊 Futuras Melhorias

Integração com banco de dados (MongoDB ou SQL).

Sistema de autenticação de usuários (login/cadastro).

Relatórios de vendas e estatísticas do estoque.

Exportação de dados para Excel/PDF.

Deploy em produção (Vercel, Netlify ou Firebase Hosting).

## 👨‍💻 Autores

Projeto desenvolvido pelo Grupo composto por:
- Guilherme Andrade
- Thullio Ferreira
- Gabriel Lucca
- Guilherme Imada
- Gabriel Piccirilo
- Carlos Eduardo 

📌 Sistemas de Informação – Uni-FACEF
