import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './crearset.css';


function CrearSet() {
  const [listaSets, setListaSets] = useState([]);
  const [crearSetPrueba, setCrearSetPrueba] = useState(false);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [datos, setDatos] = useState(null);
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
    e.preventDefault();
    setDatos(formData); 
    setListaSets([...listaSets,formData]);     // guardamos los datos ingresados
    setCrearSetPrueba(false); // ocultamos el formulario
    setFormData({ nombre: '', descripcion: '', estado: '' }); // opcional: limpiar formulario
  }

  const editarSet = (objeto) => {
    setCrearSetPrueba(true);
    setEditar(true);
    setGuardar(false);
    setFormData(objeto);
  }

  const eliminarSet = (objeto) => {
    const index = listaSets.findIndex(c => c.nombre === objeto.nombre);
    const setTemp = [...listaSets];
    setTemp.splice(index,1);
    setListaSets(setTemp);
  }

  const restablecer = () => {
    setCrearSetPrueba(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: '', descripcion: '', estado: '' });
  }

  const actualizarSet = (e) => {
    e.preventDefault();
    const setsTemp = listaSets.map((dato) => {
      return dato.nombre == formData.nombre ? formData : dato;
    })
    setListaSets(setsTemp);
    setCrearSetPrueba(false);
    setFormData({ nombre: '', descripcion: '', estado: '' });
  }

  return (
    <div>
      {!crearSetPrueba && (
        <button className='boton-crear-set' onClick={restablecer}>Crear Set Prueba</button>
      )}

      {crearSetPrueba && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarSet : handleGuardar}>
            <svg onClick={() => setCrearSetPrueba(false)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
            </svg>
            <label>
              Set de Prueba
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
        <div className='contenedor-set-pruebas'>
          {listaSets.map((objeto) => (
            <div className='contenedor-set-item'>
                <div className='nombre'>
                  <p>{objeto.nombre}</p>
                  <p className='estado'>Estado <br/> <div className='estado-div'>{objeto.estado}</div></p>
                </div>
                <p>{objeto.descripcion}</p>
                <div className='acciones'>
                  <button className='btn-accion-set' onClick={() => editarSet(objeto)}>Editar</button>
                  <Link className='btn-accion-set' to={`/set/${objeto.nombre}`}>Ejecutar</Link>
                  <button className='btn-accion-set' onClick={() => eliminarSet(objeto)}>Eliminar</button>
                </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrearSet