import { useAuth } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './estilos/login.css';

export default function CrearUsuario() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ usuario: '', clave: '' });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try{
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Error al crear el usuario');
      }

      const data = await res.json();
      setMensaje(data.mensaje)
      console.log('Usuario Creado:', data);
      setForm({usuario:'', clave:''})

      //navigate('/login') // redirige al inicio

    } catch(err){
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className='form-contenedor'>
        <form onSubmit={handleSubmit}>
            <h2>Crear Usuario</h2>
            <input type="text" name='usuario' placeholder="Usuario" value={form.usuario} onChange={handleChange} required />
            <input type="password" name="clave" placeholder="Clave" value={form.clave} onChange={handleChange} required />
            <button type="submit">Guardar</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p style={{ color: 'green', fontSize:'0.7rem' }}>{mensaje}</p>}
            <Link to="/login" className='sesion'>Ya tengo un usuario</Link>
        </form>
    </div>
  )
}