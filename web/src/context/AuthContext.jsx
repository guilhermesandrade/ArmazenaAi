import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário do localStorage ao iniciar
    const loadUser = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await authService.login(email, senha);

      if (response.success) {
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao fazer login',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);

      if (response.success) {
        const { user, token } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        return { success: true };
      }

      return { success: false, message: response.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao registrar usuário',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;
