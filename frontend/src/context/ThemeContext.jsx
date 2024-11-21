import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createMyTheme } from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '../theme/GlobalStyles'; // Importa los estilos globales

export const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  // Este useEffect actualiza el atributo 'data-theme' en el body
  useEffect(() => {
    document.body.setAttribute('data-theme', mode); // Actualiza el tema en el body
  }, [mode]);

  const theme = useMemo(() => createMyTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} /> 
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
