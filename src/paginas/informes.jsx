import { useState } from 'react'
import './estilos/informes.css'
import MenuProyectos from '../componentes/menuProyectos'


function Informes() {
  return (
    <div className='contenedor-informes'>
      <MenuProyectos/>
      <h2>Informes</h2>
    </div>
  )
}

export default Informes