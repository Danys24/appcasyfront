import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './estilos/resultadoprueba.css';
import {obtenerCasosPorIdSetTotal} from '../servicios/casosService.js';
import {obtenerPasosPorIdCaso} from '../servicios/pasosService.js';
import {obtenerCiclosPorIdCasos} from '../servicios/ciclosService.js';
import {obtenerResultadosPorIdPasoIdCiclo, obtenerResultadosPorIdCasoIdCiclo,crearUnResultado,actualizarUnResultado} from '../servicios/resultadoService.js';

function ResultadoPrueba() {

  const { idSet, idCaso, idCiclo} = useParams();
  const [listaCasos, setListaCasos] = useState([]);
  const [listaCiclos, setListaCiclos] = useState([]);
  const [listaResultados, setListaResultados] = useState([]);
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

  const guardarCasos = async () => {
      try {
        const respuesta = await obtenerCasosPorIdSetTotal(idSet);
        setListaCasos(respuesta); 
      } catch{
        
      }
  }

  const guardarPasos = async () => {
      try {
        const respuesta = await obtenerPasosPorIdCaso(idCaso);
        setFilas(respuesta); 
      } catch{
        
      }
  }

  const guardarCiclos = async () => {
      try {
        const respuesta = await obtenerCiclosPorIdCasos(idCaso);
        setListaCiclos(respuesta); 
      } catch{
        
      }
  }

  const mostrarResultados = async () => {
      try {
        const respuesta = await obtenerResultadosPorIdCasoIdCiclo(idCiclo,idCaso);
        setListaResultados(respuesta);
      } catch{
        
      }
  }

  useEffect(() => {
    guardarCasos();
    guardarPasos();
    mostrarResultados();
  },[])

  useEffect(() => {
    guardarCiclos();
  },[])

  console.log(listaResultados)

  const handleInputChange = (index, campo, valor) => {
    const nuevasFilas = [...listaResultados];
    nuevasFilas[index][campo] = valor;
    setListaResultados(nuevasFilas);
  }

  const casoEncontrado = listaCasos.find((s) => s.id == idCaso);
  const cicloEncontrado = listaCiclos.find((s) => s.id == idCiclo);


  if (!casoEncontrado) {
    return <p>No se encontró el caso con id {idCaso}</p>
  }

  const guardarPaso = async (fil) => {
    //const pasosTemp = filas.map((fila) => {
    //  return pasoData.ID === fila.ID ? pasoData : fila
    //});
    //setFilas(pasosTemp);
    if(!fil.id_resultado){
      await crearUnResultado(fil,idCaso,idCiclo);
      await mostrarResultados();
    } else {
      await actualizarUnResultado(fil);
      await mostrarResultados();
    }
  }

  return (
    <div className='contenedor-info-resultado'>
      <div className='info-prueba'>
        <p>{casoEncontrado.nombre}</p>
        <p>{casoEncontrado.estado}</p>
      </div>
      <p>{casoEncontrado.descripcion}</p>
      <p>Ciclo: {cicloEncontrado?.nombre}</p>
      <table className='pasos-prueba'>
        <thead>
          <tr>
              <th className='id-paso'>ID</th>
              <th>PASO</th>
              <th>RESULTADO</th>
              <th>OBSERVACIÓN</th>
              <th>EVIDENCIA</th>
              <th>ESTADO</th>
              <th>GUARDAR</th>
              <th>EVIDENCIAS</th>
          </tr>
        </thead>
        <tbody>
        {listaResultados.map((fil,index) => (
            <tr key={index}>
                <td>{fil.orden}</td>
                <td><textarea value={fil.paso} disabled></textarea></td>
                <td><textarea value={fil.resultado} disabled></textarea></td>
                <td><textarea value={fil.observacion} onChange={(e) => handleInputChange(index, 'observacion', e.target.value)}></textarea></td>
                <td>
                  <input className='anexo-paso' type="file" id='archivo'/>
                  <label htmlFor="archivo" className='anexos-resultado'>
                      <svg xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M10.542,4.321,10.565,19l3,0L13.542,4.339,16.306,7.1l2.121-2.122L14.508,1.062a3.5,3.5,0,0,0-4.95,0L5.639,4.981,7.76,7.1Z"/><path d="M21,16v5H3V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z"/></svg>
                      <span>Sin archivos</span>
                  </label>  
                </td>
                <td>
                  <select className='estado-paso' value = {fil.estado} onChange={(e) => handleInputChange(index, 'estado', e.target.value)} required>
                      <option value="">Estado</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Proceso">En Proceso</option>
                      <option value="Fallo">Fallo</option>
                      <option value="Pendiente">Exitoso</option>
                  </select>
                </td>
                <td>
                  <svg onClick={() => guardarPaso(fil)} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"/></svg>
                </td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23.821,11.181v0C22.943,9.261,19.5,3,12,3S1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64C1.057,14.739,4.5,21,12,21s10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM12,18a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,18Z"/><circle cx="12" cy="12" r="4"/></svg>
                </td>
            </tr>
        ))}
        </tbody>
      </table> 
    </div>
  )
}

export default ResultadoPrueba