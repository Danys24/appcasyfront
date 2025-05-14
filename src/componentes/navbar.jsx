import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import CASY from '../assets/imagenes/CASY.png'
import { useAuth } from '../context/authContext'

export default function Navbar() {

  const { user, logout, isAuthenticated } = useAuth()
  const {navegar} = useNavigate()

  const cerrarSesion = () => {
    logout()
    navegar('/login')
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
           <Link to="/Inicio">Inicio</Link>
           <Link to="/SetPrueba">Crear Set Prueba</Link>
           <Link to="/Informes">Informes</Link>
           <Link to="/Ayuda">Ayuda</Link>
           <button onClick={cerrarSesion}>Cerrar Sesion</button>
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
            <Link to="/">Home</Link>
            <Link to="/CrearUsuario">Crear Usuario</Link>
            <Link to="/Login">Login</Link>
          </div>
        </nav>
      )}

    </>
  )
}