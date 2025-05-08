import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './crearset.css'


function CrearSet() {
  const [listaSets, setListaSets] = useState([])
  const [crearSetPrueba, setCrearSetPrueba] = useState(false)
  const [datos, setDatos] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = (e) => {
    e.preventDefault()
    setDatos(formData) 
    setListaSets([...listaSets,formData])     // guardamos los datos ingresados
    setCrearSetPrueba(false) // ocultamos el formulario
    setFormData({ nombre: '', descripcion: '', estado: '' }) // opcional: limpiar formulario
  }

  return (
    <div>
      {!crearSetPrueba && (
        <button onClick={() => setCrearSetPrueba(true)}>Crear Set Prueba</button>
      )}

      {crearSetPrueba && (
        <form onSubmit={handleGuardar}>
          <label>
            Set de Prueba
            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
          </label>
          <label>
            Descripción
            <input type="text" name="descripcion" value={formData.descripcion} onChange={handleInputChange} required/>
          </label>
          <label>
            Estado
            <select name='estado'  value={formData.estado} onChange={handleInputChange} required> 
                <option value="">Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Exitoso">Exitoso</option>
            </select>
          </label>
          <button type="submit">Guardar</button>
        </form>
      )}

      {datos && (
        <div>
          {listaSets.map((objeto) => (
            <div>
                <h3>Set de prueba:</h3>
                <p>Nombre Set: {objeto.nombre}</p>
                <p>Descripcion: {objeto.descripcion}</p>
                <p>Estado: {objeto.estado}</p>
                <button onClick={() => setCrearSetPrueba(true)}>Editar</button>
                <Link to={`/set/${objeto.nombre}`}>Ver Detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrearSet