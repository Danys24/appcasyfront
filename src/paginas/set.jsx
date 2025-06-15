import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CrearCasoPrueba from '../componentes/crearCasoPrueba';
import './estilos/set.css'
import {obtenerSetsPorIdProyectoTotal} from '../servicios/setsService';


function Set() {
  const { idSet, id } = useParams();
  const [listaSets, setListaSets] = useState([]);

  useEffect(() => {
    const cargarSets = async () => {
      try {
        const respuesta = await obtenerSetsPorIdProyectoTotal(id);
        setListaSets(respuesta);

      } catch{
        
      }
    }

    cargarSets();
  }, [])

  const setEncontrado = listaSets.find((s) => s.id == idSet);

  if (!setEncontrado) {
    return <p>No se encontró el set con id {id}</p>
  }

  return (
    <div className='contenedor-info-set'>
      <div className='cont-info'>
        <h2>{setEncontrado.nombre}</h2>
        <div>
          <p>Estado</p>  
          <div className='estado-div'>{setEncontrado.estado}</div>
        </div>  
      </div>    
      <p>{setEncontrado.descripcion}</p>
      <h3>Casos de Prueba</h3>
      <CrearCasoPrueba/>
    </div>
  )
}

export default Set