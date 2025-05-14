import { useState } from 'react'
import CrearSet from '../componentes/crearSet'
import './estilos/setsPrueba.css'
import FormularioSet from '../componentes/formularioSet'
import SetNombrePrueba from '../componentes/setNombrePrueba'

function SetPrueba() {
  return (
    <div className='contenedor-set'>
      <h1>Sets de Pruebas</h1>
      <CrearSet/>
    </div>
  )
}

export default SetPrueba