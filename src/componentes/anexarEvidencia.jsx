import './anexarEvidencia.css';
import {crearEvidencia} from '../servicios/resultadoService.js';
import {useEffect,useRef ,useState} from 'react';
import {generarNombreArchivo} from '../utils/modificarNombresAnexos.js';


function AnexarEvidencia({idResultado}){

    const [anexar, setAnexar] = useState(false);
    const [listaArchivos, setListaArchivos] = useState([]);
    const fileInputRef = useRef();

    useEffect(() => {
        const handlePaste = (e) => {
            const items = e.clipboardData.items;
            for (let item of items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile();

                    // Obtener extensión (ej. "png", "jpg")
                    const tipo = file.type.split('/')[1] || 'png';
                    const nombreNuevo = generarNombreArchivo(tipo);

                    const archivoRenombrado = new File([file], nombreNuevo, {
                        type: file.type,
                    });

                    setListaArchivos(prev => [...prev, archivoRenombrado])
                    // Si quieres, puedes hacer algo con el archivo aquí
                }
            }
        };

        window.addEventListener('paste', handlePaste);

        // Cleanup
        return () => {
            window.removeEventListener('paste', handlePaste);
        };
    }, []);

    const mostrarVentanaAnexos = () => {
        if(!anexar){
            setAnexar(true);
        }else{
            setAnexar(false)
        }
    }

    const obtenerArchivos = (e) => {
        const archivos = Array.from(e.target.files);

        if(archivos.length > 0){
            setListaArchivos(prev => [...prev, ...archivos])
            
        }
    }

    const eliminarAnexo = (index) => {
        const tempListaArchivos = [...listaArchivos];
        tempListaArchivos.splice(index,1);
        setListaArchivos(tempListaArchivos);
    }

    const guardarAnexos = async () => {
        const formData = new FormData();
        listaArchivos.forEach((archivo, index) => {
            formData.append('imagenes', archivo);
        });
        formData.append('idResultado', idResultado);

        await crearEvidencia(formData);
        setAnexar(false);
        setListaArchivos([]);
        window.location.reload();

    }


    return (
        <>
            <svg onClick={mostrarVentanaAnexos} xmlns="http://www.w3.org/2000/svg" id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="512" height="512"><path d="M10.542,4.321,10.565,19l3,0L13.542,4.339,16.306,7.1l2.121-2.122L14.508,1.062a3.5,3.5,0,0,0-4.95,0L5.639,4.981,7.76,7.1Z"/><path d="M21,16v5H3V16H0v5a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V16Z"/></svg>
            
            {
                anexar && (
                    <div className='ventana-anexar-evidencia'>
                        <div className='anexar-evidencia'>
                            <div className='titulo-anexos'>
                                <h4>Agregar evidencias</h4>
                            </div>
                            <div className='contenedor-anexos'>
                                <input multiple accept="image/*" className="cargue-anexo-input" type="file" id='anexos' onChange={obtenerArchivos} ref={fileInputRef}/>
                                <label className='anexar-local' htmlFor="anexos">Clik aqui para anexar imagenes desde tu almacenamiento local</label>
                                <div className='cargue-anexo'>
                                    {listaArchivos.map((archivo, index) => (
                                        <p className='info-anexo'>
                                            {archivo.name}
                                            <svg onClick={() => eliminarAnexo(index)} xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                                <path d="M22.706,1.731c-.424-.711-1.345-.941-2.056-.521-.197,.118-4.323,2.597-8.65,6.738C7.673,3.807,3.547,1.328,3.35,1.211c-.71-.422-1.631-.191-2.056,.521-.424,.712-.191,1.632,.521,2.057,.045,.027,3.993,2.398,8.082,6.302-4.691,5.092-7.559,10.477-7.681,10.709-.387,.732-.107,1.64,.625,2.026,.224,.118,.463,.174,.699,.174,.539,0,1.059-.29,1.328-.8,.028-.053,2.761-5.185,7.132-9.964,4.359,4.767,7.104,9.912,7.132,9.965,.269,.509,.79,.799,1.328,.799,.236,0,.476-.056,.699-.174,.732-.388,1.013-1.294,.625-2.026-.122-.232-2.99-5.617-7.681-10.709,4.08-3.893,8.038-6.276,8.083-6.303,.711-.425,.943-1.345,.52-2.057Z"/>
                                            </svg>
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className='acciones-anexos'>
                                <button onClick={guardarAnexos} className='btn-acciones-anexos'>Cargar</button>
                                <button onClick={mostrarVentanaAnexos} className='btn-acciones-anexos'>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )

}

export default AnexarEvidencia;