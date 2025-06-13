import {createContext, useContext, useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {obtenerUnProyecto} from '../servicios/proyectosService.js';

const ProyectoContext = createContext();

export const useProyecto = () => {
    useContext(ProyectoContext);
}

export const ProyectoProvider = ({children}) => {
    const {id} = useParams();
    const [proyecto, setProyecto] = useState(null);

    useEffect(() => {

        const guardarUnProyecto = async () => {
            try{
                const respuesta = await obtenerUnProyecto(id);
                setProyecto(respuesta);
            }catch{

            }
        }
        guardarUnProyecto();
    },[])

    return (
        <ProyectoContext.Provider value={{proyecto}}>
            {children}
        </ProyectoContext.Provider>
    )
}
