import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './routes/App.jsx';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Home from './components/Home/Home.jsx';
import UserManagement from './components/UserManagement/UserManagement.jsx';
import GraphicRoute from './routes/GraphicRoute.jsx';
import AlertRoute from './routes/AlertRoute.jsx';

import ProtectedRoute from './routes/ProtectedRoute';
import { ThemeModeProvider } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';
import UnauthorizedPage from './routes/UnauthorizedPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/users',
        element:   <ProtectedRoute requiredRole="admin">
          <UserManagement />,
        </ProtectedRoute>
        
      },
      {
        path: '/graphics',
        element: <GraphicRoute />,
      },
      {
        path: '/alerts',
        element: <AlertRoute />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  }  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeModeProvider> {/* Movemos ThemeModeProvider para que envuelva toda la app */}
    <CssBaseline /> {/* Esto asegura que la app esté normalizada */}
    <RouterProvider router={router} />
  </ThemeModeProvider>
);
