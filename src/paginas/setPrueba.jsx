import { useState, useEffect } from 'react'
import CrearSet from '../componentes/crearSet'
import './estilos/setsPrueba.css'
import MenuProyectos from '../componentes/menuProyectos';
import {useParams, Outlet} from 'react-router-dom';
import {obtenerProyectos,obtenerProyectosPorIdUsuarioTotal} from '../servicios/proyectosService.js';
import {ProyectoProvider} from '../context/proyectoContext.jsx';

function SetPrueba() {

  const {id} = useParams();
  const [listaProyectos, setListaProyectos] = useState([]);

  useEffect(() => {

    const guardarProyectos = async () =>{
      try{

        const respuesta = await obtenerProyectosPorIdUsuarioTotal();
        setListaProyectos(respuesta);

      }catch(err){

      }
    }

    guardarProyectos();

  }, [])

  const proyectoEncontrado = listaProyectos.find((l) => l.id == id);

  if(!proyectoEncontrado){
    return <p>No se encontro el proyecto con el id {id}</p>
  }

  return (
    <div className='contenedor-set'>
      <h2>{proyectoEncontrado.nombre}</h2>
      <p className='decripcion-proyecto'>{proyectoEncontrado.descripcion}</p>
      <h2>Sets de Pruebas</h2>
      <CrearSet/>
    </div>
  )
}

export default SetPrueba