import { useState, useEffect } from 'react';
import {getToken,removeToken} from './utils/auth.js';
import AppRoutes from './rutas/appRutas';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const token = getToken();
    if (!token) {
      // Si el token no existe o expiró
      if(location.pathname !== '/login' && location.pathname !== '/'){
        //alert('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
        removeToken();
        navigate('/login'); // o donde tengas tu login
      }
    }
  }, [navigate]);

  return (
    <div className='App'>
      <AppRoutes/>
    </div>
  )
}

export default App
