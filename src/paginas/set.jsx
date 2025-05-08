import { useState } from 'react'
import { useParams } from 'react-router-dom'
import CrearCasoPrueba from '../componentes/crearCasoPrueba'


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
    <>
      <h1>Set</h1>
      <h2>Detalle del Set</h2>
      <p>Nombre: {setEncontrado.nombre}</p>
      <p>Descripción: {setEncontrado.descripcion}</p>
      <p>Estado: {setEncontrado.estado}</p>
      <CrearCasoPrueba/>
    </>
  )
}

export default Set