import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import './estilos/login.css'

export default function CrearUsuario() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const fakeUser = { name: 'Danys', role: 'tester' }
    //login(fakeUser)
    navigate('/Login') // redirige al login
  }

  return (
    <div className='form-contenedor'>
        <form onSubmit={handleSubmit}>
            <h2>Crear Usuario</h2>
            <input type="text" placeholder="Usuario" required />
            <input type="password" placeholder="Contraseña" required />
            <button type="submit">Guardar</button>
            <Link to="/login" className='sesion'>Ya tengo un usuario</Link>
        </form>
    </div>
  )
}