const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');


async function authMiddleware(req,res,next){
const auth = req.headers.authorization;
if(!auth) return res.status(401).json({error:'No token'});
const parts = auth.split(' ');
if(parts.length !==2) return res.status(401).json({error:'Token error'});
const [scheme, token] = parts;
if(!/^Bearer$/i.test(scheme)) return res.status(401).json({error:'Token malformatted'});
try{
const decoded = jwt.verify(token, config.jwtSecret);
const user = await User.findByPk(decoded.id);
if(!user) return res.status(401).json({error:'User not found'});
req.user = { id: user.id, role: user.role };
next();
}catch(err){
return res.status(401).json({error:'Invalid token'});
}
}


module.exports = authMiddleware;