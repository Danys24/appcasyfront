import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuariosVinculados from './usuariosVinculados.jsx';
import VincularUsuario from './vincularUsuario.jsx';
import './crearProyecto.css';
import {obtenerProyectosPorIdUsuario, 
        crearUnProyecto, 
        obtenerUnProyecto, 
        actualizarUnProyecto, 
        eliminarUnProyecto} from '../servicios/proyectosService.js';


function CrearProyecto() {
  const navegar = useNavigate();
  const [mostrarUsuarios, setMostrarUsuarios] = useState(null);
  const [mostrarUsuariosVincular, setMostrarUsuariosVincular] = useState(null);
  const [listaProyectos, setListaProyectos] = useState([]);
  const [crearProyecto, setCrearProyecto] = useState(false);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [datos, setDatos] = useState(null);
  const [page, setPage] = useState(1);       
  const [limit, setLimit] = useState(10); 
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    id:'',
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {

    const cargarProyectos = async () => {
      try {
        const respuesta = await obtenerProyectosPorIdUsuario(page,limit);
        setListaProyectos(respuesta.data);
        setTotal(respuesta.total);
      } catch(error){
        console.error('Error al cargar proyectos:', error);
      }
    }

    cargarProyectos();

  }, [page,limit])

  const totalPaginas = Math.ceil(total / limit);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = async (e) => {
    //e.preventDefault();
    await crearUnProyecto(formData);
    //setDatos(formData); 
    //setListaProyectos([...listaProyectos,formData]);     // guardamos los datos ingresados
    setCrearProyecto(false); // ocultamos el formulario
    setFormData({ nombre: '', descripcion: ''}); // opcional: limpiar formulario
  }

  const editarProyecto = async (objeto) => {
    setCrearProyecto(true);
    setEditar(true);
    setGuardar(false);
    const proyecto = await obtenerUnProyecto(parseInt(objeto.id));
    setFormData(proyecto);
  }

  const eliminarProyecto = async (objeto) => {
    //const index = listaProyectos.findIndex(c => c.nombre === objeto.nombre);
    //const setTemp = [...listaProyectos];
    //setTemp.splice(index,1);
    //setListaProyectos(setTemp);
    await eliminarUnProyecto(parseInt(objeto.id));
    window.location.reload();
  }

  const restablecer = () => {
    setCrearProyecto(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: '', descripcion: '' });
  }

  const actualizarProyecto = async (e) => {
    //e.preventDefault();
    //const proyectosTemp = listaProyectos.map((dato) => {
      //return dato.id == formData.id ? formData : dato;
    //})
    await actualizarUnProyecto(formData);
    //setListaProyectos(proyectosTemp);
    setCrearProyecto(false);
    setFormData({ nombre: '', descripcion: ''});
  }

  const abrirUsuariosVinculados = (id) => {
    setMostrarUsuarios(prev => (prev == id ? null : id));
  }

  const abrirVinculacionUsuarios = (id) => {
    setMostrarUsuariosVincular(prev => (prev == id ? null : id));
  }

  return (
    <div>
      {!crearProyecto && (
        <button className='boton-crear-set' onClick={restablecer}>Crear Proyecto</button>
      )}

      {crearProyecto && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarProyecto : handleGuardar}>
            <svg onClick={() => setCrearProyecto(false)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
            </svg>
            <label>
              Proyecto
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
            </label>
            <label>
              Descripción
              <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} required></textarea>
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

      {listaProyectos && (
        <div className='contenedor-set-pruebas'>
          {listaProyectos.map((objeto, index) => (
            <div className='contenedor-set-item' key={objeto.id}>
                <div className='nombre'>
                  <p>{objeto.nombre}</p>
                  <div className='contenedor-accion-usuarios'>
                      <div className='usuarios-vinculados' onClick={() => abrirUsuariosVinculados(objeto.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M12,12A6,6,0,1,0,6,6,6.006,6.006,0,0,0,12,12ZM12,2A4,4,0,1,1,8,6,4,4,0,0,1,12,2Z"/><path d="M12,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,12,14Z"/></svg>
                      </div>
                      {mostrarUsuarios === objeto.id &&(
                        <UsuariosVinculados key={index} idProyecto={objeto.id}/>
                      )}
                      <div className='vincular-usuario' onClick={() => abrirVinculacionUsuarios(objeto.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><polygon points="18 10.5 13.5 10.5 13.5 6 10.5 6 10.5 10.5 6 10.5 6 13.5 10.5 13.5 10.5 18 13.5 18 13.5 13.5 18 13.5 18 10.5"/></svg>
                      </div>
                      {mostrarUsuariosVincular === objeto.id &&(
                        <VincularUsuario key={index} idProyecto={objeto.id}/>
                      )}
                  </div>
                </div>
                <p>{objeto.descripcion}</p>
                <div className='acciones'>
                  <button className='btn-accion-set' onClick={() => editarProyecto(objeto)}>Editar</button>
                  <Link className='btn-accion-set' to={`/proyecto/${objeto.id}/SetPrueba`}>Abrir</Link>
                  <button className='btn-accion-set' onClick={() => eliminarProyecto(objeto)}>Eliminar</button>
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

export default CrearProyecto