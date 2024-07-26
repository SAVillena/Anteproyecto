// src/components/Navbar.jsx

import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';


const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <span className="navbar-logo">Logo</span>
      <ul className="navbar-links">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a > Alertas </a>
        </li>
        <li>
          <a > Graficos</a>
        </li>
      </ul>
      <div className="user-info">
        Estás logueado como: {user.email}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
