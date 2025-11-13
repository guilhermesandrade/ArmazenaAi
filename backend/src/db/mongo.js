const mongoose = require('mongoose');
const config = require('../config');


async function connectMongo() {
await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('MongoDB connected');
}


module.exports = { connectMongo, mongoose };