import { useState } from 'react';
import api from '../services/api';


export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


const handleLogin = async (e) => {
e.preventDefault();
try {
const res = await api.post('/users/login', { email, password });
localStorage.setItem('token', res.data.token);
window.location.href = '/dashboard';
} catch (err) {
alert('Falha no login');
}
};


return (
<div className="login-container">
<h2>ArmazenaAi</h2>
<form onSubmit={handleLogin}>
<input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
<button type="submit">Entrar</button>
</form>
</div>
);
}