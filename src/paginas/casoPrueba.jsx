import { useState } from 'react'
import { useParams } from 'react-router-dom'
import './estilos/casoPrueba.css'

function CasoPrueba() {
  const { nombre } = useParams();
  const [datos, setDatos] = useState(null);
  const [filas, setFilas] = useState([]);
  const [pasoData, setPasoData] = useState({
    ID:filas.length + 1, 
    PASO:'',
    RESULTADO:'',
    OBSERVACION:'', 
    EVIDENCIA:'',
    ESTADO:''
  });

  // Simulación de datos (en la práctica traerías de estado global o fetch):
  const setsGuardados = [
    { id: '1', nombre: 'Prueba1', descripcion: 'desc 1', estado: 'Pendiente' },
    { id: '2', nombre: 'Prueba2', descripcion: 'desc 2', estado: 'Exitoso' }
  ]

  const handleInputChange = (index, campo, valor) => {
    const nuevasFilas = [...filas];
    nuevasFilas[index][campo] = valor;
    setFilas(nuevasFilas);
  }

  const setEncontrado = setsGuardados.find((s) => s.nombre === nombre)

  if (!setEncontrado) {
    return <p>No se encontró el set con nombre {nombre}</p>
  }

  const nuevoPaso = () => {
    setPasoData({ID:filas.ID, PASO:'',RESULTADO:'',OBSERVACION:'', EVIDENCIA:'',ESTADO:''})
    const agregarPaso = {ID:filas.length + 1, PASO:'',RESULTADO:'',OBSERVACION:'', EVIDENCIA:'',ESTADO:''}
    setFilas([...filas, agregarPaso])
    console.log(filas)

  }

  const guardarPaso = () => {
    const pasosTemp = filas.map((fila) => {
      return pasoData.ID === fila.ID ? pasoData : fila
    });
    setFilas(pasosTemp);
    console.log(filas)
    console.log(pasoData)
  }

  const eliminarPaso = (fil) => {
    const index = filas.findIndex(c => c.ID === fil.ID);
    const filasTemp = [...filas];
    filasTemp.splice(index,1);
    setFilas(filasTemp)
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
        {filas.map((fil,index) => (
            <tr key={fil.ID}>
                <td>{fil.ID}</td>
                <td><textarea value={fil.PASO} onChange={(e) => handleInputChange(index, 'PASO', e.target.value)}></textarea></td>
                <td><textarea value={fil.RESULTADO} onChange={(e) => handleInputChange(index, 'RESULTADO', e.target.value)}></textarea></td>
                <td><textarea value={fil.OBSERVACION} onChange={(e) => handleInputChange(index, 'OBSERVACION', e.target.value)}></textarea></td>
                <td>
                    <input className='anexo-paso' type="file" />  
                </td>
                <td>
                    <select className='estado-paso' value={fil.ESTADO} onChange={(e) => handleInputChange(index, 'ESTADO', e.target.value)}>
                        <option value="Pendiente">Penidente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Pendiente">Exitoso</option>
                    </select>
                </td>
                <td>
                  <svg onClick={() => eliminarPaso(fil)} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                </td>
                <td>
                  <svg onClick={() => guardarPaso(fil)} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"/></svg>
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