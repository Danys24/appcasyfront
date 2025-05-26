import { useAuth } from '../context/authContext'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import './estilos/login.css'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', clave: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try{
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error en el login');
      }

      const data = await res.json();
      console.log('Usuario autenticado:', data);

      // Guardar los datos del usuario en localStorage o contexto
      //localStorage.setItem('usuario', JSON.stringify(data.nombre));

      // Si usas contexto de autenticación:
      login(data.nombre);

      /*
      const fakeUser = { name: 'Danys', role: 'tester' }
      login(fakeUser)
      */
      navigate('/Inicio') // redirige al inicio

    } catch(err){
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className='form-contenedor'>
        <form onSubmit={handleSubmit}>
            <h2>Iniciar sesión</h2>
            <input type="text" name='nombre' placeholder="Usuario" value={form.usuario} onChange={handleChange} required />
            <input type="password" name="clave" placeholder="Clave" value={form.clave} onChange={handleChange} required />
            <button type="submit">Ingresar</button>
            {error && <p style={{ color: 'red', fontSize:'0.7rem'}}>{error}</p>}
        </form>
    </div>
  )
}