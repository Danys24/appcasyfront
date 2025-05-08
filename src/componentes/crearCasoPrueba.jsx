import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './crearset.css'


function CrearCasoPrueba() {
  const [listaCasos, setListaCasos] = useState([])
  const [crearCaso, setCrearCaso] = useState(false)
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
    setListaCasos([...listaCasos,formData])     // guardamos los datos ingresados
    setCrearCaso(false) // ocultamos el formulario
    setFormData({ nombre: '', descripcion: '', estado: '' }) // opcional: limpiar formulario
  }

  return (
    <div>
      {!crearCaso && (
        <button onClick={() => setCrearCaso(true)}>Crear Caso Prueba</button>
      )}

      {crearCaso && (
        <form onSubmit={handleGuardar}>
          <label>
            Caso de Prueba
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
          {listaCasos.map((objeto) => (
            <div>
                <h3>Caso de prueba:</h3>
                <p>Nombre Caso Prueba: {objeto.nombre}</p>
                <p>Descripcion: {objeto.descripcion}</p>
                <p>Estado: {objeto.estado}</p>
                <button onClick={() => setCrearCaso(true)}>Editar</button>
                <Link to={`/CasoPrueba/${objeto.nombre}`}>Ver Detalle</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrearCasoPrueba