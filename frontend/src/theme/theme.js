import { createTheme } from '@mui/material/styles';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#f44336',
    },
    ...(mode === 'light'
      ? {
          background: {
            default: '#e0e0e0', // Fondo general gris claro
            paper: '#ffffff',   // Fondo de las tarjetas en blanco
          },
          text: {
            primary: '#000000',  // Texto en negro para contraste
            secondary: '#555555', // Texto secundario en gris oscuro
          },
        }
      : {
          background: {
            default: '#1b1b1b', // Fondo general en gris oscuro
            paper: '#2c2c2c',   // Fondo de las tarjetas en gris más claro
          },
          text: {
            primary: 'rgba(255, 255, 255, 0.87)', // Texto principal en blanco semiopaco
            secondary: 'rgba(255, 255, 255, 0.7)', // Texto secundario en blanco más opaco
          },
        }),
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

export const createMyTheme = (mode) => createTheme(getDesignTokens(mode));
