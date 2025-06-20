import './ventanaUsuario.css';
import {useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../context/authContext';

function VentanaUsuario(){
    const{logout} = useAuth();
    const {navegar} = useNavigate();

    const token = localStorage.getItem('token');
    let usuario;

    if(token){
        const decode = jwtDecode(token);
        usuario = decode.nombre;
    }

    const cerrarSesion = () => {
        logout()
        navegar('/login')
    }

    return (
        <div className='ventana-usuario'>
            <h3>{usuario}</h3>
            <button onClick={cerrarSesion}>Cerrar Sesion</button>
        </div>
    )

}

export default VentanaUsuario;