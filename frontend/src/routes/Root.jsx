import { Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Navbar from '../components/NavBar';

function Root() {
  return (
    <AuthProvider>
      <Navbar />
      <PageRoot /> 
    </AuthProvider>
  );
}

function PageRoot() { 
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Root;
