import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { ThemeModeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';

import logoLight from '../assets/DustSenseW.png';
import logoDark from '../assets/DustSenseB.png';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, mode } = useContext(ThemeModeContext);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem button onClick={() => { navigate('/home'); setMobileOpen(false); }}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => { navigate('/alerts'); setMobileOpen(false); }}>
        <ListItemIcon><NotificationsIcon /></ListItemIcon>
        <ListItemText primary="Alertas" />
      </ListItem>
      <ListItem button onClick={() => { navigate('/graphics'); setMobileOpen(false); }}>
        <ListItemIcon><BarChartIcon /></ListItemIcon>
        <ListItemText primary="Gráficos" />
      </ListItem>
      {/* Opción visible solo para administradores */}
      {user?.roles === 'admin' && (
        <ListItem button onClick={() => { navigate('/users'); setMobileOpen(false); }}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Botón de menú y Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Botón de menú para dispositivos móviles */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <img
              src={mode === 'dark' ? logoDark : logoLight}
              alt="Logo"
              style={{
                height: 40,
                marginLeft: { xs: 'auto', sm: 0 },
                marginRight: 16
              }}
            />
          </Box>

          {/* Menú de navegación para escritorio */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/home')}>Inicio</Button>
            <Button color="inherit" startIcon={<NotificationsIcon />} onClick={() => navigate('/alerts')}>Alertas</Button>
            <Button color="inherit" startIcon={<BarChartIcon />} onClick={() => navigate('/graphics')}>Gráficos</Button>
            {/* Opción visible solo para administradores */}
            {user?.roles === 'admin' && (
              <Button color="inherit" startIcon={<PeopleIcon />} onClick={() => navigate('/users')}>Usuarios</Button>
            )}
          </Box>

          {/* Botón para cambiar de tema y cerrar sesión */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={toggleTheme} startIcon={mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />} />
            <Button
              variant="outlined"
              onClick={handleLogout}
              color="inherit"
            >
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral para menú en dispositivos móviles */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
