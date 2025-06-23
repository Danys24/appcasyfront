import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './vincularciclocaso.css';
import {obtenerCiclosPorIdCiclosNoRelacionados,obtenerCiclosPorIdCasos} from '../servicios/ciclosService.js';
import {crearVinculoCicloCaso,actualizarVinculo,eliminarVinculo} from '../servicios/casosService.js'
import Ciclo from '../paginas/ciclos.jsx';

function VincularCicloCaso() {
  const {id, idCaso} = useParams();
  const [listaCiclos, setListaCiclos] = useState([]);
  const [listaCiclosNoRelacionados, setListaCiclosNoRelacionados] = useState([]);
  const [crearVinculo, setCrearVinculo] = useState(false);
  const [mostrarCiclos, setMostrarCiclos] = useState(false);
  const [datos, setDatos] = useState(null);
  const [editar, setEditar] = useState(false);
  const [guardar, setGuardar] = useState(true);
  const [formData, setFormData] = useState({
    id:'',
    nombre: '',
    estado: ''
  });

  const guardarCiclos = async () => {
      try {
        const respuesta = await obtenerCiclosPorIdCasos(idCaso);
        setListaCiclos(respuesta);
      } catch {
        
      }
  } 

  const guardarCiclosNoRelacionados = async () => {
      try {
        const respuesta = await obtenerCiclosPorIdCiclosNoRelacionados(id,idCaso);
        setListaCiclosNoRelacionados(respuesta);
      } catch {
        setListaCiclosNoRelacionados([]);
      }
  } 

  useEffect(() => {
    guardarCiclos();
    guardarCiclosNoRelacionados();
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleGuardar = async (e) => {
    e.preventDefault()
    await crearVinculoCicloCaso(formData,idCaso)     // guardamos los datos ingresados
    setCrearVinculo(false) // ocultamos el formulario
    setFormData({ id:'',nombre:'' ,estado: ''}) // opcional: limpiar formulario
    guardarCiclos();
    guardarCiclosNoRelacionados();
  }

  const editarCiclo = async (objeto) => {
    setCrearVinculo(true);
    setEditar(true);
    setGuardar(false);
    setMostrarCiclos(false);
    setFormData(objeto);
  }

  const eliminarCiclo = async (objeto) => {
    //const index = listaCasos.findIndex(c => c.nombre === objeto.nombre);
    //const setTemp = [...listaCasos];
    //setTemp.splice(index,1);
    //setListaCasos(setTemp);
    await eliminarVinculo(objeto.id,idCaso);
    guardarCiclos();
    guardarCiclosNoRelacionados();
  }

  const restablecer = () => {
    setCrearVinculo(true);
    setMostrarCiclos(true);
    setEditar(false);
    setGuardar(true);
    setFormData({ id:'',nombre:'' ,estado: ''});
  }

  const actualizarCiclo = async (e) => {
    e.preventDefault();
    //const setsTemp = listaCasos.map((dato) => {
    //  return dato.nombre == formData.nombre ? formData : dato;
    //})
    //setListaCasos(setsTemp);
    await actualizarVinculo(formData,idCaso);
    setCrearVinculo(false);
    setFormData({ id:'',nombre:'' ,estado: ''});
    guardarCiclos();
    guardarCiclosNoRelacionados();
  }

  return (
    <div>
      {listaCiclosNoRelacionados.length === 0
      ?
      (<p>No existen mas ciclos para vincular</p>)
      :
      !crearVinculo && (
        <button className='btn-crear-vinculo' onClick={restablecer}>
          <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><polygon points="24 10.5 13.5 10.5 13.5 0 10.5 0 10.5 10.5 0 10.5 0 13.5 10.5 13.5 10.5 24 13.5 24 13.5 13.5 24 13.5 24 10.5"/></svg>
          Vincular Ciclo
        </button>
      )
      }
      {crearVinculo && (
        <div className='modal-overlay'>
          <form onSubmit={editar ? actualizarCiclo : handleGuardar} id='form-ciclo'>
            <svg onClick={() => setCrearVinculo(false)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
              <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
            </svg>
            {
              mostrarCiclos &&(
                <label>
                      Ciclos
                      <select name="id" value={formData.id} onChange={handleInputChange} required>
                        <option value="">Seleccione Un Ciclo</option>
                        {listaCiclosNoRelacionados.map((ciclo) => (
                          <option value={ciclo.id}>{ciclo.nombre}</option>
                        ))}
                      </select>
                </label>
              )
            }
            <label>
              estado
              <select name="estado" value={formData.estado} onChange={handleInputChange} required>
                <option value="">Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Fallo">Fallo</option>
                <option value="Exitoso">Exitoso</option>
              </select>
            </label>
            { guardar &&(
              <button type="submit">Vincular</button>
            )}

            { editar && (
              <button type="submit">Actualizar</button>
            )}
          </form>
        </div>
      )}

      {listaCiclos && (
        <div className='container-info-ciclo-vinculado'>
          {listaCiclos.map((objeto) => (
            <div className='container-ciclo' key={objeto.id}>
              <div className='ciclo-info'>
                <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M12,2.99a9.03,9.03,0,0,1,6.36,2.65L15.986,8.014h5.83a1.146,1.146,0,0,0,1.146-1.146V1.038L20.471,3.529A11.98,11.98,0,0,0,0,12H2.99A9.02,9.02,0,0,1,12,2.99Z"/><path d="M21.01,12A8.994,8.994,0,0,1,5.64,18.36l2.374-2.374H1.993a.956.956,0,0,0-.955.955v6.021l2.491-2.491A11.98,11.98,0,0,0,24,12Z"/></svg>
                <p>{objeto.nombre}</p>
                <p>{objeto.estado}</p>
              </div>
              <div className='accion-ciclos'>
                <button className='btn-accion' onClick={() => editarCiclo(objeto)}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="512" height="512"><path d="M21,11.5V15H18a3,3,0,0,0-3,3v3H4.5A1.5,1.5,0,0,1,3,19.5V4.5A1.5,1.5,0,0,1,4.5,3h9A1.5,1.5,0,0,0,15,1.5h0A1.5,1.5,0,0,0,13.5,0h-9A4.5,4.5,0,0,0,0,4.5v15A4.5,4.5,0,0,0,4.5,24H16.484a4.5,4.5,0,0,0,3.181-1.317l3.017-3.017A4.5,4.5,0,0,0,24,16.485V11.5A1.5,1.5,0,0,0,22.5,10h0A1.5,1.5,0,0,0,21,11.5Z"/><path d="M17.793,1.793l-12.5,12.5A1,1,0,0,0,5,15v3a1,1,0,0,0,1,1H9a1,1,0,0,0,.707-.293L22.038,6.376a3.379,3.379,0,0,0,.952-3.17A3.118,3.118,0,0,0,17.793,1.793Z"/></svg>
                </button>
                <Link className='btn-accion' to={`ciclo/${objeto.id}`}>Ejecutar</Link>
                <button className='btn-accion' onClick={() => eliminarCiclo(objeto)}>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M17,4V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2V4ZM11,17H9V11h2Zm4,0H13V11h2ZM15,4H9V2h6Z"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VincularCicloCaso