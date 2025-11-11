import { Link } from 'react-router-dom';


export default function Navbar() {
const handleLogout = () => {
localStorage.removeItem('token');
window.location.href = '/';
};


return (
<nav className="navbar">
<h3>ArmazenaAi</h3>
<ul>
<li><Link to="/dashboard">Dashboard</Link></li>
<li><Link to="/products">Produtos</Link></li>
<li><Link to="/movements">Movimentações</Link></li>
<li><button onClick={handleLogout}>Sair</button></li>
</ul>
</nav>
);
}