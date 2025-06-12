import { useState, useEffect } from 'react'
import CrearSet from '../componentes/crearSet'
import './estilos/setsPrueba.css'
import MenuProyectos from '../componentes/menuProyectos';
import {useParams} from 'react-router-dom';
import {obtenerProyectos} from '../servicios/proyectosService.js'

function SetPrueba() {
  const {id} = useParams();
  const [listaProyectos, setListaProyectos] = useState([]);

  useEffect(() => {

    const guardarProyectos = async () =>{
      try{

        const respuesta = await obtenerProyectos();
        setListaProyectos(respuesta);

      }catch(err){

      }
    }

    guardarProyectos();

  }, [])

  console.log("proyectos", listaProyectos)
  console.log("id", id)
  
  const proyectoEncontrado = listaProyectos.find((l) => l.id == id);
  console.log("proyecto encontrado",proyectoEncontrado)

  if(!proyectoEncontrado){
    return <p>No se encontro el proyecto con el id {id}</p>
  }

  return (
    <div className='contenedor-set'>
      <MenuProyectos/>
      <h2>{proyectoEncontrado.nombre}</h2>
      <p>{proyectoEncontrado.descripcion}</p>
      <h2>Sets de Pruebas</h2>
      <CrearSet/>
    </div>
  )
}

export default SetPrueba