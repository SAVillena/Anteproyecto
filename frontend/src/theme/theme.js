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
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: '#000000',
            secondary: '#555555',
          },
        }
      : {
          background: {
            default: '#242424',
            paper: '#333',
          },
          text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.54)',
          },
        }),
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

export const createMyTheme = (mode) => createTheme(getDesignTokens(mode));
