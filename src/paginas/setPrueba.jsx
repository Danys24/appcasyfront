import { useState, useEffect } from 'react'
import CrearSet from '../componentes/crearSet'
import './estilos/setsPrueba.css'
import MenuProyectos from '../componentes/menuProyectos';
import {useParams} from 'react-router-dom';
import {obtenerProyectos,obtenerProyectosPorIdUsuarioTotal} from '../servicios/proyectosService.js';
import {ProyectoProvider} from '../context/proyectoContext.jsx';

function SetPrueba() {

  return (
    <div className='contenedor-set'>
      <h2>Sets de Pruebas</h2>
      <CrearSet/>
    </div>
  )
}

export default SetPrueba