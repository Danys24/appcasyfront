import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './crearset.css';
import {obtenerSetsPorIdProyectoPaginas, crearUnSet, obtenerUnSet, actualizarUnSet,eliminarUnSet} from '../servicios/setsService.js';


function CrearSet() {
  const {id} = useParams();
  const [listaSets, setListaSets] = useState([]);
  const [crearSetPrueba, setCrearSetPrueba] = useState(false);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [datos, setDatos] = useState(null);
  const [page, setPage] = useState(1);       
  const [limit, setLimit] = useState(10); 
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    id:'',
    nombre: '',
    descripcion: '',
    estado: ''
  });

  useEffect(() => {
    const obtenerSets = async () => {
      try {
        const respuesta = await obtenerSetsPorIdProyectoPaginas(id, page, limit);
        setListaSets(respuesta.data);
        setTotal(respuesta.total);
        
      } catch(err){
        console.error("error al obtener los sets", err);
      }
    }

    obtenerSets();
  }, [page, limit])

  const totalPaginas = Math.ceil(total / limit);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = async (e) => {
    //e.preventDefault();
    await crearUnSet(id,formData);     // guardamos los datos ingresados
    setCrearSetPrueba(false); // ocultamos el formulario
    setFormData({ nombre: '', descripcion: '', estado: '' }); // opcional: limpiar formulario
  }

  const editarSet = async (objeto) => {
    setCrearSetPrueba(true);
    setEditar(true);
    setGuardar(false);
    const setPrueba = await obtenerUnSet(objeto.id);
    const data = setPrueba[0];
    setFormData({
      id:data.id,
      nombre:data.nombre,
      descripcion:data.descripcion,
      estado:data.estado});
  }

  const eliminarSet = async (objeto) => {
    //const index = listaSets.findIndex(c => c.nombre === objeto.nombre);
    //const setTemp = [...listaSets];
    //setTemp.splice(index,1);
    //setListaSets(setTemp);
    await eliminarUnSet(parseInt(objeto.id));
    window.location.reload();
  }

  const restablecer = () => {
    setCrearSetPrueba(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: '', descripcion: '', estado: '' });
  }

  const actualizarSet = async (e) => {
    //e.preventDefault();
    //const setsTemp = listaSets.map((dato) => {
      //return dato.nombre == formData.nombre ? formData : dato;
    //})
    await actualizarUnSet(formData)
    //setListaSets(setsTemp);
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

      {listaSets && (
        <div className='contenedor-set-pruebas'>
          {listaSets.map((objeto) => (
            <div className='contenedor-set-item' key={objeto.id}>
                <div className='nombre'>
                  <p>{objeto.nombre}</p>
                  <div className='estado'>
                    <p>Estado</p>
                    <div className='estado-div'>{objeto.estado}</div>
                  </div>
                </div>
                <p>{objeto.descripcion}</p>
                <div className='acciones'>
                  <button className='btn-accion-set' onClick={() => editarSet(objeto)}>Editar</button>
                  <Link className='btn-accion-set' to={`Set/${objeto.id}`}>Abrir</Link>
                  <button className='btn-accion-set' onClick={() => eliminarSet(objeto)}>Eliminar</button>
                </div>

            </div>
          ))}
            <div className='contenedor-paginado'>
              <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              
              <div className='contenedor-navegar'>
                <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>
                  Anterior
                </button>

                <span>Página {page} de {totalPaginas}</span>

                <button onClick={() => setPage(p => Math.min(p + 1, totalPaginas))} disabled={page === totalPaginas}>
                  Siguiente
                </button>
              </div>
            </div>
        </div>
      )}
    </div>
  )
}

export default CrearSet