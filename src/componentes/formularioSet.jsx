import { useState } from 'react'
import './crearset.css'


function FormularioSet() {
  return (
    <form>
        <label for='nombre'>Nombre del Set</label>
        <input type="text" className='nombre'/>
        <label for='descripcion'>Descripción</label>
        <input type="text" className='descripcion'/>
        <label>Estado</label>
        <select>
            <option value="Pendiente">Pendiente</option>
            <option value="En Proceso">En Proceso</option>
            <option value="Exitoso">Exitoso</option>
        </select>
        <input type="submit" value="Guardar"/>
    </form>
  )
}

export default FormularioSet