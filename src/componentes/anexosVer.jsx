import './anexosVer.css';
import {obtenerEvidenciasPorIdResultado,eliminarEvidenciaPorId} from '../servicios/resultadoService.js';
import {useEffect,useRef ,useState} from 'react';


function AnexosVer({idResultado}){

    const [anexar, setAnexar] = useState(false);
    const [listaArchivos, setListaArchivos] = useState([]);

    const guardarEvidencias = async () => {
        try {
            const respuesta = await obtenerEvidenciasPorIdResultado(idResultado);
            setListaArchivos(respuesta);       
        } catch {
            setListaArchivos([]);
        }
    }

    useEffect(() => {
        guardarEvidencias();
    },[])

    const mostrarVentanaAnexos = () => {
        if(!anexar){
            setAnexar(true);
        }else{
            setAnexar(false)
        }
    }

    const eliminarAnexo = async (id) => {
        await eliminarEvidenciaPorId(id);
        guardarEvidencias();
    }

    return (
        <>
            <svg onClick={mostrarVentanaAnexos} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="M23.821,11.181v0C22.943,9.261,19.5,3,12,3S1.057,9.261.179,11.181a1.969,1.969,0,0,0,0,1.64C1.057,14.739,4.5,21,12,21s10.943-6.261,11.821-8.181A1.968,1.968,0,0,0,23.821,11.181ZM12,18a6,6,0,1,1,6-6A6.006,6.006,0,0,1,12,18Z"/><circle cx="12" cy="12" r="4"/></svg>

            {
                anexar && (
                    <div className='ventana-anexos-evidencia'>
                        <div className='anexos-evidencia'>
                            <div className='titulo-anexos-ver'>
                                <h4>Evidencias</h4>
                            </div>
                            <div className='contenedor-ver-anexos'>
                                <div className='info-anexos'>
                                    {listaArchivos.map((archivo) => (
                                        <div className='anexo-imagen'>
                                            <svg onClick={() => eliminarAnexo(archivo.id)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                                <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
                                            </svg>
                                            <img src={archivo.url_evidencia}  alt="" />
                                        </div>
                                    ))}
                                </div>
                                
                            </div>
                            <div className='acciones-anexos-ver'>
                                <button onClick={mostrarVentanaAnexos} className='btn-acciones-anexos'>Cerrar</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default AnexosVer;