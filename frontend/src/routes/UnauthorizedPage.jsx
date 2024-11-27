import React, { useContext } from 'react';
import { Box, Typography, Button, IconButton, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeModeContext } from '../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useContext(ThemeModeContext);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', backgroundColor: 'background.default', color: 'text.primary' }}>
      {/* Botón de cambio de tema en la esquina superior derecha */}
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16 }}
        onClick={toggleTheme}
        color="inherit"
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Grid
        container
        sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' , justifyContent: 'center', p: 4 }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={6}
          sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            textAlign: 'center',
            border: '2px solid cyan'
          }}
        >
          <WarningAmberIcon sx={{ fontSize: 80, color: '#ff9800', marginBottom: 2 }} />
          <Typography variant="h4" gutterBottom>
            Acceso Denegado
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            No tienes permiso para acceder a esta página. Por favor, verifica tus permisos o contacta al administrador.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/home')} // Cambia esta ruta si necesitas redirigir a otro lugar
            sx={{ textTransform: 'none', px: 4 }}
          >
            Volver al Inicio
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnauthorizedPage;
