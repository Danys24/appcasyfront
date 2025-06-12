import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import CASY from '../assets/imagenes/Casy_APP.png';
import { useAuth } from '../context/authContext';
import {useState} from 'react';
import VentanaUsuario from './ventanaUsuario';

export default function Navbar() {

  const { token, logout, isAuthenticated } = useAuth();
  const [verVentanaUsuario, setVerVentanaUsuario] = useState(false);
  const [cerrarVentana, setCerrarVentana] = useState(false);
  const {navegar} = useNavigate();

  const abrirVentanaUsuario = () => {
    if(!cerrarVentana){
      setVerVentanaUsuario(true);
      setCerrarVentana(true)
    } else{
      setVerVentanaUsuario(false);
      setCerrarVentana(false)
    } 
  }

  return (
    <>
      {isAuthenticated ? (
        <nav className="navbar">
         <div className="contenedor-logo">
           <Link to="/inicio" className='c-logo'>
               <img className="logo" src={CASY} alt='logo'/>
           </Link>
         </div>
         <div className='menu-contenedor'>
           <Link to="/Inicio">
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                <path d="M21.062,6.729c-.035-.075-.088-.139-.154-.188-.174-.129-.389-.288-.636-.469V3.114c0-.276-.224-.5-.5-.5s-.5,.224-.5,.5v2.231c-2.437-1.752-6.221-4.346-7.272-4.346-1.364,0-7.164,4.242-8.909,5.542-.066,.05-.12,.115-.155,.191-.047,.103-1.165,2.58-1.165,7.727,0,2.249,.209,5.575,.448,7.117,.029,.19,.165,.346,.35,.402,.138,.042,3.442,1.021,9.432,1.021s9.292-.98,9.429-1.021c.185-.056,.32-.212,.35-.402,.24-1.545,.451-4.871,.451-7.117,0-5.191-1.119-7.629-1.167-7.73Zm-11.811,15.196v-4.8c0-1.575,1.232-2.856,2.748-2.856s2.748,1.281,2.748,2.856v4.8c-.84,.047-1.757,.075-2.748,.075s-1.908-.028-2.748-.075Zm11.584-.823c-.665,.167-2.409,.549-5.088,.757v-4.733c0-2.126-1.682-3.856-3.748-3.856s-3.748,1.73-3.748,3.856v4.733c-2.68-.208-4.425-.591-5.091-.757-.213-1.607-.391-4.581-.391-6.643,0-4.312,.823-6.678,1.028-7.198,3.486-2.591,7.479-5.249,8.2-5.261,.719,.019,4.713,2.676,8.204,5.263,.204,.513,1.026,2.85,1.026,7.197,0,2.021-.183,5.046-.394,6.643Z"/>
              </svg>
              Inicio
            </Link>
           <div onClick={abrirVentanaUsuario} className='cont-usuario'>
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>           
           </div>
           {
              verVentanaUsuario &&(
                <VentanaUsuario/>
              )
            }
         </div>
       </nav>
      ) : (
        <nav className="navbar">
          <div className="contenedor-logo">
            <Link to="/" className='c-logo'>
                <img className="logo" src={CASY} alt='logo'/>
            </Link>
          </div>
          <div className='menu-contenedor'>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M12,14a3,3,0,0,0-3,3v7.026h6V17A3,3,0,0,0,12,14Z"/><path d="M13.338.833a2,2,0,0,0-2.676,0L0,10.429v10.4a3.2,3.2,0,0,0,3.2,3.2H7V17a5,5,0,0,1,10,0v7.026h3.8a3.2,3.2,0,0,0,3.2-3.2v-10.4Z"/></svg>
              Home
            </Link>
            <Link to="/Login">
              <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M7,24a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l8.17-8.17a3,3,0,0,0,0-4.24L6.29,1.71A1,1,0,0,1,7.71.29l8.17,8.17a5,5,0,0,1,0,7.08L7.71,23.71A1,1,0,0,1,7,24Z"/></svg>
              Login
            </Link>
          </div>
        </nav>
      )}

    </>
  )
}