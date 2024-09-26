import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import CssBaseline from '@mui/material/CssBaseline';

function Root() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <PageRoot />
      </AuthProvider>
    </>
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
