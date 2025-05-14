import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CrearCasoPrueba from '../componentes/crearCasoPrueba';
import './estilos/set.css'


function Set() {
  const { nombre } = useParams()

  // Simulación de datos (en la práctica traerías de estado global o fetch):
  const setsGuardados = [
    { id: '1', nombre: 'Prueba1', descripcion: 'desc 1', estado: 'Pendiente' },
    { id: '2', nombre: 'Prueba2', descripcion: 'desc 2', estado: 'Exitoso' }
  ]

  const setEncontrado = setsGuardados.find((s) => s.nombre === nombre)

  if (!setEncontrado) {
    return <p>No se encontró el set con nombre {nombre}</p>
  }

  return (
    <div className='contenedor-info-set'>
      <div className='cont-info'>
        <h2>{setEncontrado.nombre}</h2>
        <p>Estado <br/> <div className='estado-div'>{setEncontrado.estado}</div></p>    
      </div>    
      <p>{setEncontrado.descripcion}</p>
      <h3>Casos de Prueba</h3>
      <CrearCasoPrueba/>
    </div>
  )
}

export default Set