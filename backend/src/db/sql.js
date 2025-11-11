const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');


const sequelize = new Sequelize(config.sql.database, config.sql.user, config.sql.password, {
host: config.sql.host,
port: config.sql.port,
dialect: 'mssql',
logging: false,
dialectOptions: {
options: { encrypt: false }
}
});


module.exports = { sequelize, DataTypes };