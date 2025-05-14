import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './estilos/casoPrueba.css'

function CasoPrueba() {
  const { nombre } = useParams()
  const [filas, setFilas] = useState([])

  // Simulación de datos (en la práctica traerías de estado global o fetch):
  const setsGuardados = [
    { id: '1', nombre: 'Prueba1', descripcion: 'desc 1', estado: 'Pendiente' },
    { id: '2', nombre: 'Prueba2', descripcion: 'desc 2', estado: 'Exitoso' }
  ]

  const setEncontrado = setsGuardados.find((s) => s.nombre === nombre)

  if (!setEncontrado) {
    return <p>No se encontró el set con nombre {nombre}</p>
  }

  const nuevoPaso = () => {
    const agregarPaso = {ID:filas.length + 1, PASO:'',RESULTADO:'',OBSERVACION:'', EVIDENCIA:'',ESTADO:''}
    setFilas([...filas, agregarPaso])
  }

  return (
    <div className='contenedor-info-prueba'>
      <div className='info-prueba'>
        <p>{setEncontrado.nombre}</p>
        <p>{setEncontrado.estado}</p>
      </div>
      <p>{setEncontrado.descripcion}</p>
      <div style={{ maxHeight: '40rem', overflowY: 'auto'}}>
      <table className='pasos-prueba'>
        <thead>
          <tr>
              <th className='id-paso'>ID</th>
              <th>PASO</th>
              <th>RESULTADO</th>
              <th>OBSERVACIÓN</th>
              <th>EVIDENCIA</th>
              <th>ESTADO</th>
          </tr>
        </thead>
        <tbody>
        {filas.map((fil) => (
            <tr key={fil.ID}>
                <td>{fil.ID}</td>
                <td><textarea name="" id=""></textarea></td>
                <td><textarea name="" id=""></textarea></td>
                <td><textarea name="" id=""></textarea></td>
                <td>
                    <input className='anexo-paso' type="file" />  
                </td>
                <td>
                    <select className='estado-paso'>
                        <option value="Pendiente">Penidente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Pendiente">Exitoso</option>
                    </select>
                </td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
      </div>
      <button className='btn-paso' onClick={nuevoPaso}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
          <path d="M21.868,11.017c-.15-.038-3.519-.874-8.803-.977,.172-4.325,.856-7.062,.864-7.093,.204-.802-.28-1.619-1.082-1.824-.803-.205-1.618,.277-1.824,1.08-.036,.14-.789,3.123-.961,7.861-4.806,.17-7.792,.918-7.932,.954-.802,.205-1.286,1.021-1.082,1.823,.204,.802,1.021,1.29,1.822,1.084,.031-.008,2.774-.688,7.167-.857,.104,5.273,.944,8.589,.987,8.734,.315,1.077,1.368,1.209,1.827,1.075,.795-.233,1.284-1.025,1.078-1.827-.008-.033-.789-3.13-.891-8.01,4.904,.1,8.065,.876,8.098,.885,.881,.256,1.648-.409,1.82-1.089,.202-.803-.284-1.617-1.086-1.82Z"/>
        </svg>
      </button>   
    </div>
  )
}

export default CasoPrueba