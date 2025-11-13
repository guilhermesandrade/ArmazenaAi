import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaBox, FaWarehouse, FaBrain, FaSignOutAlt, FaUser } from 'react-icons/fa';
import './style.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FaHome },
    { path: '/products', label: 'Produtos', icon: FaBox },
    { path: '/stock', label: 'Estoque', icon: FaWarehouse },
    { path: '/ai-suggestions', label: 'Sugestões de IA', icon: FaBrain },
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <FaBrain className="brand-icon" />
          <h2>ArmazenaAi</h2>
        </div>
        <div className="navbar-user">
          <div className="user-info">
            <FaUser className="user-icon" />
            <span className="user-name">{user?.nome}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Sair</span>
          </button>
        </div>
      </nav>

      <div className="layout-content">
        <aside className="sidebar">
          <div className="sidebar-menu">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <Icon className="menu-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
