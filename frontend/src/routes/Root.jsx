import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import { ThemeModeProvider } from '../context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

function Root() {
  return (
    <ThemeModeProvider>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <PageRoot />
      </AuthProvider>
    </ThemeModeProvider>
  );
}

function PageRoot() {
  return (
    <div className="container-fluid">
      <Outlet />
    </div>
  );
}

export default Root;
