import { useState, useEffect } from 'react';
import {useParams, Outlet} from 'react-router-dom';
import './estilos/proyectos.css';
import MenuProyectos from '../componentes/menuProyectos';
import {obtenerProyectosPorIdUsuarioTotal} from '../servicios/proyectosService.js';


function Proyecto() {
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
    <div className='contenedor-proyecto'>
        <MenuProyectos/>
        <Outlet/>

    </div>
  )
}

export default Proyecto