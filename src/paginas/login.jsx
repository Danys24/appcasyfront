import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import './estilos/login.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const fakeUser = { name: 'Danys', role: 'tester' }
    login(fakeUser)
    navigate('/Inicio') // redirige al home
  }

  return (
    <div className='form-contenedor'>
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <input type="text" placeholder="Usuario" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Ingresar</button>
            <Link to="/CrearUsuario" className='sesion'>Crear nuevo usuario</Link>
        </form>
    </div>
  )
}