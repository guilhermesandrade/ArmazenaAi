const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');


async function register(req,res){
const { name, email, password } = req.body;
if(!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
const exists = await User.findOne({ where: { email } });
if(exists) return res.status(400).json({ error: 'Email already registered' });
const password_hash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password_hash });
const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '8h' });
return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
}


async function login(req,res){
const { email, password } = req.body;
if(!email || !password) return res.status(400).json({ error: 'Missing fields' });
const user = await User.findOne({ where: { email } });
if(!user) return res.status(400).json({ error: 'Invalid credentials' });
const match = await bcrypt.compare(password, user.password_hash);
if(!match) return res.status(400).json({ error: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: '8h' });
return res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
}


module.exports = { register, login };