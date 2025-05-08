import { useState } from 'react'
import { useParams } from 'react-router-dom'


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
    <>
      <h1>Caso de prueba</h1>
      <h2>Detalle del Caso de prueba</h2>
      <p>Nombre: {setEncontrado.nombre}</p>
      <p>Descripción: {setEncontrado.descripcion}</p>
      <p>Estado: {setEncontrado.estado}</p>
      <table>
        <tr>
            <th>ID</th>
            <th>PASO</th>
            <th>RESULTADO</th>
            <th>OBSERVACIÓN</th>
            <th>EVIDENCIA</th>
            <th>ESTADO</th>
        </tr>
        {filas.map((fil) => (
            <tr key={fil.ID}>
                <td>{fil.ID}</td>
                <td><textarea name="" id=""></textarea></td>
                <td><textarea name="" id=""></textarea></td>
                <td><textarea name="" id=""></textarea></td>
                <td>
                    <input type="file" />  
                </td>
                <td>
                    <select>
                        <option value="Pendiente">Penidente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Pendiente">Exitoso</option>
                    </select>
                </td>
                <td>Eliminar</td>
            </tr>
        ))}
        <button onClick={nuevoPaso}>[+]</button>
      </table>
      
    </>
  )
}

export default CasoPrueba