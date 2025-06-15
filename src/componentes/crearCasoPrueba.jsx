import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './crearcasoprueba.css'
import {obtenerCasosPorIdSetPaginas, crearUnCaso, obtenerUnCaso, actualizarUnCaso,eliminarUnCaso,ordenarCasos} from '../servicios/casosService.js';
import {obtenerUsuariosPorIdProyecto} from '../servicios/usuariosService.js';

function CrearCasoPrueba() {
  const {idSet,id} = useParams();
  const [listaCasos, setListaCasos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [crearCaso, setCrearCaso] = useState(false);
  const [datos, setDatos] = useState(null);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [page, setPage] = useState(1);       
  const [limit, setLimit] = useState(10); 
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    id:'',
    nombre: '',
    descripcion: '',
    estado: '',
    responsable:'',
    orden:''
  });

  useEffect(() => {
    const guardarCasos = async () => {
      try {
        const respuesta = await obtenerCasosPorIdSetPaginas(idSet, page, limit);
        setListaCasos(respuesta.data);
        setTotal(respuesta.total)
      } catch {
        
      }
    } 

    guardarCasos();
  }, [page, limit])

  useEffect(() => {
    const guardarUsuarios = async () => {
      try {
        const respuesta = await obtenerUsuariosPorIdProyecto(id);
        setListaUsuarios(respuesta)
      } catch {
        
      }
    } 

    guardarUsuarios();
  }, [])

  const totalPaginas = Math.ceil(total / limit);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = async (e) => {
    //e.preventDefault()
    await crearUnCaso(idSet, formData)     // guardamos los datos ingresados
    setCrearCaso(false) // ocultamos el formulario
    setFormData({ nombre: '', descripcion: '', estado: '', responsable:'' }) // opcional: limpiar formulario
  }

  const editarSet = async (objeto) => {
    setCrearCaso(true);
    setEditar(true);
    setGuardar(false);
    const casos = await obtenerUnCaso(objeto.id);
    const data = casos[0];
    setFormData({
      id:data.id,
      nombre:data.nombre,
      descripcion:data.descripcion,
      estado:data.estado,
      responsable:data.responsable,
      orden:data.orden
    });
  }

  const eliminarSet = async (objeto) => {
    //const index = listaCasos.findIndex(c => c.nombre === objeto.nombre);
    //const setTemp = [...listaCasos];
    //setTemp.splice(index,1);
    //setListaCasos(setTemp);
    await eliminarUnCaso(objeto.id);
    await ordenarCasos(idSet);
    window.location.reload();
  }

  const restablecer = () => {
    setCrearCaso(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: '', descripcion: '', estado: '', responsable: '' });
  }

  const actualizarSet = async (e) => {
    //e.preventDefault();
    //const setsTemp = listaCasos.map((dato) => {
    //  return dato.nombre == formData.nombre ? formData : dato;
    //})
    //setListaCasos(setsTemp);
    await actualizarUnCaso(formData);
    setCrearCaso(false);
    setFormData({ nombre: '', descripcion: '', estado: '', responsable: '' });
  }

  return (
    <div>
      {!crearCaso && (
        <button className='btn-crear-caso' onClick={restablecer}>Crear Caso Prueba</button>
      )}

      {crearCaso && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarSet : handleGuardar} id='form-casos'>
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
                  <option value="Fallo">Fallo</option>
                  <option value="Exitoso">Exitoso</option>
              </select>
            </label>
            <label>
              Responsable
              <select name='responsable'  value={formData.responsable} onChange={handleInputChange} required> 
                  <option value="">Seleccione un usuario</option>
                  {listaUsuarios.map((usuario) =>(
                      <option value={usuario.nombre}>{usuario.nombre}</option>
                  ))}
                  
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

      {listaCasos && (
        <div className='container-info-prueba'>
          {listaCasos.map((objeto) => (
            <div className='container-prueba' key={objeto.id}>
              <div className='prueba-info'>
                <p>{objeto.orden}</p>
                <p>{objeto.nombre}</p>
                <div className='responsable-estado'>
                  <p>Estado</p>
                  <p className='estado-caso'>{objeto.estado}</p>
                </div>
                <div className='responsable-estado'>
                  <p>Responsable</p>
                  <div className='responsable-caso'>
                      <div className='responsable'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                            <path d="M12.006,12.309c3.611-.021,5.555-1.971,5.622-5.671-.062-3.56-2.111-5.614-5.634-5.637-3.561,.022-5.622,2.122-5.622,5.672s2.062,5.615,5.634,5.636Z"/>
                            <path d="M11.994,13.661c-5.328,.034-8.195,2.911-8.291,8.322-.004,.268,.099,.527,.287,.718s.445,.299,.713,.299h14.595c.268,0,.525-.108,.713-.299,.188-.191,.291-.45,.287-.718-.092-5.333-3.036-8.288-8.304-8.322Z"/>
                        </svg>
                      </div>
                    {objeto.responsable}
                  </div>
                </div>
                
              </div>
              <p>{objeto.descripcion}</p>
              <div className='accion'>
                <button className='btn-accion' onClick={() => editarSet(objeto)}>Editar</button>
                <Link className='btn-accion' to={`/CasoPrueba/${objeto.nombre}`}>Ejecutar</Link>
                <button className='btn-accion' onClick={() => eliminarSet(objeto)}>Eliminar</button>
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

export default CrearCasoPrueba