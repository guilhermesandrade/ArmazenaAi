const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const movementRoutes = require('./routes/movementRoutes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/movements', movementRoutes);


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB conectado');
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
.catch((err) => console.error(err));