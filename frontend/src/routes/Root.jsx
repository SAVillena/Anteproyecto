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
    <div className="container-fluid"> {/* Cambié a container-fluid para asegurar un buen uso del espacio */}
      <Outlet />
    </div>
  );
}


export default Root;
