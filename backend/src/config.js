require('dotenv').config();


module.exports = {
port: process.env.PORT || 4000,
jwtSecret: process.env.JWT_SECRET || 'troque_por_uma_chave_segura',
sql: {
host: process.env.SQL_HOST || 'localhost',
port: Number(process.env.SQL_PORT || 1433),
user: process.env.SQL_USER || 'sa',
password: process.env.SQL_PASS || 'YourStrong!Passw0rd',
database: process.env.SQL_DB || 'armazenai'
},
mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/armazenai'
};