import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './estilos/casoprueba.css';
import {obtenerCasosPorIdSetTotal} from '../servicios/casosService.js';
import {obtenerPasosPorIdCaso,crearUnPaso,actualizarUnPaso,obtenerUnPaso,eliminarUnPaso,ordenarPasos} from '../servicios/pasosService.js';
import VincularCicloCaso from '../componentes/vincularCicloCaso.jsx'


function CasoPrueba() {

  const { idSet, idCaso } = useParams();
  const [listaCasos, setListaCasos] = useState([]);
  const [listaPasos, setListaPasos] = useState([]);
  const [datos, setDatos] = useState(null);
  const [filas, setFilas] = useState([]);
  const [pasoData, setPasoData] = useState({
    id:'', 
    orden:'',
    paso:'',
    resultado:''
  });

  useEffect(() => {
    const guardarCasos = async () => {
      try {
        const respuesta = await obtenerCasosPorIdSetTotal(idSet);
        setListaCasos(respuesta); 
      } catch{
        
      }
    }

    guardarCasos();
  },[])

  const guardarPasos = async () => {
      try {
        const respuesta = await obtenerPasosPorIdCaso(idCaso);
        setFilas(respuesta); 
      } catch{
        
      }
  }

  useEffect(() => {
    guardarPasos();
  },[])

  console.log('pasos',filas);


  const handleInputChange = (index, campo, valor) => {
    const nuevasFilas = [...filas];
    const nuevaFila = {...nuevasFilas[index]};
    nuevaFila[campo] = valor;
    nuevasFilas[index]=nuevaFila;
    setFilas(nuevasFilas);
  }

  //Obtiene el caso de una lista de casos para renderizar la informacion del caso en la interfaz 
  const casoEncontrado = listaCasos.find((s) => s.id == idCaso);

  if (!casoEncontrado) {
    return <p>No se encontró el caso con id {idCaso}</p>
  }

  const nuevoPaso = () => {
    const tempFilas = [];
    filas.forEach((fila) =>{
        if(fila.id === ''){
          tempFilas.push(fila);
        }
    })

    if(tempFilas.length === 0){
      const agregarPaso = {id:'', orden:'', paso:'',resultado:''};
      setFilas([...filas, agregarPaso]);
    }

  }

  const guardarPaso = async (fill) => {
    //const pasosTemp = filas.map((fila) => {
      //return pasoData.ID === fila.ID ? pasoData : fila
    //});
    if(!fill.id){
      await crearUnPaso(idCaso,fill);
      await guardarPasos();
    } else {
      await actualizarUnPaso(fill);
      await guardarPasos();
    }
  }

  const eliminarPaso = async (fil) => {
    //const index = filas.findIndex(c => c.id === fil.id);
    //const filasTemp = [...filas];
    //filasTemp.splice(index,1);
    //setFilas(filasTemp)
    await eliminarUnPaso(fil.id);
    ordenarPasos(idCaso);
    await guardarPasos();
  }

  return (
    <div className='contenedor-info-prueba'>
      <div className='info-prueba'>
        <p>{casoEncontrado.nombre}</p>
        <p>{casoEncontrado.estado}</p>
      </div>
      <p>{casoEncontrado.descripcion}</p>
      <table className='pasos-prueba'>
        <thead>
          <tr>
              <th className='id-paso'>ID</th>
              <th>PASO</th>
              <th>RESULTADO</th>
              <th>GUARDAR</th>
              <th>ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
        {filas.map((fil,index) => (
            <tr key={fil.id}>
                <td>{fil.orden}</td>
                <td><textarea value={fil.paso} onChange={(e) => handleInputChange(index, 'paso', e.target.value)} required></textarea></td>
                <td><textarea value={fil.resultado} onChange={(e) => handleInputChange(index, 'resultado', e.target.value)} required></textarea></td>
                <td>
                  <svg onClick={() => guardarPaso(fil)} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"/></svg>
                </td>
                <td>
                  <svg onClick={() => eliminarPaso(fil)} xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"/><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"/><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"/></svg>
                </td>
            </tr>
        ))}
        </tbody>
      </table>
      <button className='btn-paso' onClick={nuevoPaso}>
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
          <path d="M21.868,11.017c-.15-.038-3.519-.874-8.803-.977,.172-4.325,.856-7.062,.864-7.093,.204-.802-.28-1.619-1.082-1.824-.803-.205-1.618,.277-1.824,1.08-.036,.14-.789,3.123-.961,7.861-4.806,.17-7.792,.918-7.932,.954-.802,.205-1.286,1.021-1.082,1.823,.204,.802,1.021,1.29,1.822,1.084,.031-.008,2.774-.688,7.167-.857,.104,5.273,.944,8.589,.987,8.734,.315,1.077,1.368,1.209,1.827,1.075,.795-.233,1.284-1.025,1.078-1.827-.008-.033-.789-3.13-.891-8.01,4.904,.1,8.065,.876,8.098,.885,.881,.256,1.648-.409,1.82-1.089,.202-.803-.284-1.617-1.086-1.82Z"/>
        </svg>
      </button> 
      <VincularCicloCaso/>
    </div>
  )
}

export default CasoPrueba