import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './vincularciclocaso.css';
import {obtenerCiclosPorIdProyectoPaginas,crearUnCiclo, obtenerUnCiclo, actualizarUnCiclo,eliminarUnCiclo} from '../servicios/ciclosService.js';
import Ciclo from '../paginas/ciclos.jsx';

function VincularCicloCaso() {
  const {id} = useParams();
  const [listaCiclos, setListaCiclos] = useState([]);
  const [crearCiclo, setCrearCiclo] = useState(false);
  const [datos, setDatos] = useState(null);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [page, setPage] = useState(1);       
  const [limit, setLimit] = useState(10); 
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    id:'',
    nombre: ''
  });

  useEffect(() => {
    const guardarCiclos = async () => {
      try {
        const respuesta = await obtenerCiclosPorIdProyectoPaginas(id, page, limit);
        setListaCiclos(respuesta.data);
        setTotal(respuesta.total)
      } catch {
        
      }
    } 

    guardarCiclos();
  }, [page, limit])

  const totalPaginas = Math.ceil(total / limit);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = async (e) => {
    //e.preventDefault()
    await crearUnCiclo(id, formData)     // guardamos los datos ingresados
    setCrearCiclo(false) // ocultamos el formulario
    setFormData({ nombre: ''}) // opcional: limpiar formulario
  }

  const editarCiclo = async (objeto) => {
    setCrearCiclo(true);
    setEditar(true);
    setGuardar(false);
    const ciclos = await obtenerUnCiclo(objeto.id);
    const data = ciclos[0];
    setFormData({
      id:data.id,
      nombre:data.nombre
    });
  }

  const eliminarCiclo = async (objeto) => {
    //const index = listaCasos.findIndex(c => c.nombre === objeto.nombre);
    //const setTemp = [...listaCasos];
    //setTemp.splice(index,1);
    //setListaCasos(setTemp);
    await eliminarUnCiclo(objeto.id);
    window.location.reload();
  }

  const restablecer = () => {
    setCrearCiclo(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ nombre: ''});
  }

  const actualizarCiclo = async (e) => {
    //e.preventDefault();
    //const setsTemp = listaCasos.map((dato) => {
    //  return dato.nombre == formData.nombre ? formData : dato;
    //})
    //setListaCasos(setsTemp);
    await actualizarUnCiclo(formData);
    setCrearCiclo(false);
    setFormData({ nombre: ''});
  }

  return (
    <div>
      {!crearCiclo && (
        <button className='btn-crear-ciclo' onClick={restablecer}>
          <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><polygon points="24 10.5 13.5 10.5 13.5 0 10.5 0 10.5 10.5 0 10.5 0 13.5 10.5 13.5 10.5 24 13.5 24 13.5 13.5 24 13.5 24 10.5"/></svg>
          Crear Ciclo
        </button>
      )}

      {crearCiclo && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarCiclo : handleGuardar} id='form-ciclo'>
            <svg onClick={() => setCrearCiclo(false)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
            </svg>
            <label>
              Nombre Ciclo
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required/>
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

      {listaCiclos && (
        <div className='container-info-ciclo'>
          {listaCiclos.map((objeto) => (
            <div className='container-ciclo' key={objeto.id}>
              <div className='ciclo-info'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M12,2.99a9.03,9.03,0,0,1,6.36,2.65L15.986,8.014h5.83a1.146,1.146,0,0,0,1.146-1.146V1.038L20.471,3.529A11.98,11.98,0,0,0,0,12H2.99A9.02,9.02,0,0,1,12,2.99Z"/><path d="M21.01,12A8.994,8.994,0,0,1,5.64,18.36l2.374-2.374H1.993a.956.956,0,0,0-.955.955v6.021l2.491-2.491A11.98,11.98,0,0,0,24,12Z"/></svg>
                <p>{objeto.nombre}</p>
              </div>
              <div className='accion-ciclos'>
                <button className='btn-accion' onClick={() => editarCiclo(objeto)}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="512" height="512"><path d="M21,11.5V15H18a3,3,0,0,0-3,3v3H4.5A1.5,1.5,0,0,1,3,19.5V4.5A1.5,1.5,0,0,1,4.5,3h9A1.5,1.5,0,0,0,15,1.5h0A1.5,1.5,0,0,0,13.5,0h-9A4.5,4.5,0,0,0,0,4.5v15A4.5,4.5,0,0,0,4.5,24H16.484a4.5,4.5,0,0,0,3.181-1.317l3.017-3.017A4.5,4.5,0,0,0,24,16.485V11.5A1.5,1.5,0,0,0,22.5,10h0A1.5,1.5,0,0,0,21,11.5Z"/><path d="M17.793,1.793l-12.5,12.5A1,1,0,0,0,5,15v3a1,1,0,0,0,1,1H9a1,1,0,0,0,.707-.293L22.038,6.376a3.379,3.379,0,0,0,.952-3.17A3.118,3.118,0,0,0,17.793,1.793Z"/></svg>
                </button>
                <button className='btn-accion' onClick={() => eliminarCiclo(objeto)}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"/></svg>
                </button>
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

export default VincularCicloCaso