import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './style.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>ArmazenaAi</h2>
        </div>
        <div className="navbar-user">
          <span className="user-name">{user?.nome}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </nav>

      <div className="layout-content">
        <aside className="sidebar">
          <Link to="/dashboard" className="sidebar-link">
            Dashboard
          </Link>
          <Link to="/products" className="sidebar-link">
            Produtos
          </Link>
          <Link to="/stock" className="sidebar-link">
            Estoque
          </Link>
        </aside>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
