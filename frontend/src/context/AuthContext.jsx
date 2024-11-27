import { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Recupera el usuario almacenado en localStorage
  const user = JSON.parse(localStorage.getItem('user')) || null;
  const isAuthenticated = Boolean(user);

  // Función para verificar si el usuario tiene un rol específico
  const hasRole = (role) => user?.roles === role;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}
