import { useState } from 'react'
import './crearset.css'


function SetNombrePrueba() {
  return (
    <div>
        <div>
            <h3>Nombre del Set</h3>
            <select>
                <option value="Pendiente">Pendiente</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Exitoso">Exitoso</option>
            </select>
        </div>
        <div>
            <h3>Descripción</h3>
            <p>Descripcion del set de prueba</p>
        </div>
    </div>
  )
}

export default SetNombrePrueba