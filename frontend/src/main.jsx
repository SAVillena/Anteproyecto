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

import { ThemeModeProvider } from './context/ThemeContext';
import CssBaseline from '@mui/material/CssBaseline';

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
        element: <UserManagement />,
      }
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeModeProvider> {/* Movemos ThemeModeProvider para que envuelva toda la app */}
    <CssBaseline /> {/* Esto asegura que la app esté normalizada */}
    <RouterProvider router={router} />
  </ThemeModeProvider>
);
