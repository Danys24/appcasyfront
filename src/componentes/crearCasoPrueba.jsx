import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './crearcasoprueba.css'


function CrearCasoPrueba() {
  const [listaCasos, setListaCasos] = useState([]);
  const [crearCaso, setCrearCaso] = useState(false);
  const [datos, setDatos] = useState(null);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: ''
  });

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

  const editarSet = (objeto) => {
    setCrearCaso(true);
    setEditar(true);
    setGuardar(false);
    setFormData(objeto);
  }

  const eliminarSet = (objeto) => {
    const index = listaCasos.findIndex(c => c.nombre === objeto.nombre);
    const setTemp = [...listaCasos];
    setTemp.splice(index,1);
    setListaCasos(setTemp);
  }

  const restablecer = () => {
    setCrearCaso(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: '', descripcion: '', estado: '' });
  }

  const actualizarSet = (e) => {
    e.preventDefault();
    const setsTemp = listaCasos.map((dato) => {
      return dato.nombre == formData.nombre ? formData : dato;
    })
    setListaCasos(setsTemp);
    setCrearCaso(false);
    setFormData({ nombre: '', descripcion: '', estado: '' });
  }

  return (
    <div>
      {!crearCaso && (
        <button className='btn-crear-caso' onClick={restablecer}>Crear Caso Prueba</button>
      )}

      {crearCaso && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarSet : handleGuardar}>
            <svg onClick={() => setCrearCaso(false)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
            </svg>
            <label>
              Caso de Prueba
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
            </label>
            <label>
              Descripción
              <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required></textarea>
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
            { guardar &&(
              <button type="submit">Guardar</button>
            )}

            { editar && (
              <button type="submit">Actualizar</button>
            )}
          </form>
        </div>
      )}

      {datos && (
        <div className='container-info-prueba'>
          {listaCasos.map((objeto) => (
            <div className='container-prueba'>
              <div className='prueba-info'>
                <p>1</p>
                <p>{objeto.nombre}</p>
                <p>{objeto.estado}</p>
                <div>Ciclo</div>
              </div>
              <p>{objeto.descripcion}</p>
              <div className='accion'>
                <button className='btn-accion' onClick={() => editarSet(objeto)}>Editar</button>
                <Link className='btn-accion' to={`/CasoPrueba/${objeto.nombre}`}>Ejecutar</Link>
                <button className='btn-accion' onClick={() => eliminarSet(objeto)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrearCasoPrueba