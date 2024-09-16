import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { ThemeModeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, mode } = useContext(ThemeModeContext);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Estado para el menú
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>

        {/* Menú de navegación */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => navigate('/home')}>Home</MenuItem>
          <MenuItem onClick={() => navigate('/alerts')}>Alertas</MenuItem>
          <MenuItem onClick={() => navigate('/graphics')}>Gráficos</MenuItem>
          <MenuItem onClick={() => navigate('/users')}>Usuarios</MenuItem>
        </Menu>

        {/* Usuario logueado */}
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          Estás logueado como: {user.email}
        </Typography>

        {/* Botón para cambiar de tema */}
        <Button color="inherit" onClick={toggleTheme} startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}>
          {mode === 'dark' ? '' : ''}
        </Button>


        {/* Botón de Cerrar sesión */}
        <Button color="secondary" variant="contained" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
