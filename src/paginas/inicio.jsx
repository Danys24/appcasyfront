import { useState } from 'react';
import CrearProyecto from '../componentes/crearProyecto';
import './estilos/inicio.css';


function Inicio() {
  return (
    <div className='contenedor-inicio'>
      <h2>Crea y gestiona tus proyectos</h2>
      <p>Trabaja con tu equipo de calidad de forma conjunta y organizada 
        garantizando un flujo de tabajo que permite la certificacion de tus procesos.</p>
      <CrearProyecto/>
    </div>
  )
}

export default Inicio
