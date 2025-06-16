import { useState } from 'react';
import './estilos/ciclo.css';
import MenuProyectos from '../componentes/menuProyectos';
import CrearCicloCaso from '../componentes/crearCicloCaso';


function Ciclo() {
  return (
    <div className='contenedor-ciclos'>
      <h2>Ciclos de Prueba</h2>
      <p>Crea los ciclos para la ejecución de los casos de prueba</p>
      <CrearCicloCaso/>
    </div>
  )
}

export default Ciclo