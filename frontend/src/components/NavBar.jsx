import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <span className="navbar-logo">Logo</span>
      <ul className="navbar-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/alerts">Alertas</a>
        </li>
        <li>
          <a href="/graphics">Gráficos</a>
        </li>
        <li>
          <a href="/users">Usuarios</a>
        </li>
      </ul>
      <div className="user-info">
        <span>Estás logueado como: {user.email}</span>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
