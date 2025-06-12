import { useState } from 'react';
import './estilos/ciclo.css';
import MenuProyectos from '../componentes/menuProyectos';


function Ciclo() {
  return (
    <div className='contenedor-proyecto'>
      <MenuProyectos/>
      <h2>Crea y gestiona tus proyectos</h2>
      <p>Trabaja con tu equipo de calidad de forma conjunta y organizada 
        garantizando un flujo de tabajo que permite la certificacion de tus procesos.</p>
    </div>
  )
}

export default Ciclo