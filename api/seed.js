require('dotenv').config();
const mongoose = require('mongoose');
const { User, Category, Product } = require('./models');

const seedDatabase = async () => {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');

    // Limpar dados existentes
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Dados anteriores removidos');

    // Criar usuário administrador
    const admin = await User.create({
      nome: 'Administrador',
      email: 'admin@armazenaai.com',
      senha: 'senha123',
      role: 'admin',
    });
    console.log('✅ Usuário admin criado');

    // Criar categorias
    const categories = await Category.create([
      { nome: 'Camisetas', descricao: 'Camisetas em geral' },
      { nome: 'Calças', descricao: 'Calças e jeans' },
      { nome: 'Vestidos', descricao: 'Vestidos femininos' },
      { nome: 'Acessórios', descricao: 'Bonés, chapéus, cintos' },
      { nome: 'Calçados', descricao: 'Sapatos e tênis' },
    ]);
    console.log('✅ Categorias criadas');

    // Criar produtos
    const products = await Product.create([
      {
        nome: 'Camiseta Básica Branca',
        descricao: 'Camiseta 100% algodão',
        categoria: categories[0]._id,
        tamanho: 'M',
        cor: 'Branca',
        genero: 'Unissex',
        preco: 49.90,
        quantidade: 15,
        quantidadeMinima: 5,
      },
      {
        nome: 'Camiseta Básica Preta',
        descricao: 'Camiseta 100% algodão',
        categoria: categories[0]._id,
        tamanho: 'G',
        cor: 'Preta',
        genero: 'Unissex',
        preco: 49.90,
        quantidade: 3,
        quantidadeMinima: 5,
      },
      {
        nome: 'Calça Jeans Masculina',
        descricao: 'Jeans slim fit',
        categoria: categories[1]._id,
        tamanho: 'M',
        cor: 'Azul',
        genero: 'Masculino',
        preco: 129.90,
        quantidade: 8,
        quantidadeMinima: 3,
      },
      {
        nome: 'Vestido Floral',
        descricao: 'Vestido estampado',
        categoria: categories[2]._id,
        tamanho: 'P',
        cor: 'Floral',
        genero: 'Feminino',
        preco: 99.90,
        quantidade: 12,
        quantidadeMinima: 5,
      },
      {
        nome: 'Boné Preto',
        descricao: 'Boné com ajuste traseiro',
        categoria: categories[3]._id,
        tamanho: 'Único',
        cor: 'Preto',
        genero: 'Unissex',
        preco: 39.90,
        quantidade: 20,
        quantidadeMinima: 10,
      },
      {
        nome: 'Tênis Esportivo',
        descricao: 'Tênis para corrida',
        categoria: categories[4]._id,
        tamanho: 'M',
        cor: 'Azul/Branco',
        genero: 'Unissex',
        preco: 249.90,
        quantidade: 2,
        quantidadeMinima: 5,
      },
    ]);
    console.log('✅ Produtos criados');

    console.log('\n🎉 Banco de dados populado com sucesso!\n');
    console.log('📧 Credenciais de login:');
    console.log('   Email: admin@armazenaai.com');
    console.log('   Senha: senha123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

seedDatabase();
