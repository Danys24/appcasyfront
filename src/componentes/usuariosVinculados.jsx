import './usuariosVinculado.css';
import {obtenerUsuariosPorIdProyecto} from '../servicios/usuariosService.js';
import {useEffect, useState} from 'react';


function UsuariosVinculados({idProyecto}){

    const [listaUsuarios, setListaUsuarios] = useState([]);

    useEffect(() => {

        const obtenerUsuarios = async () => {
            try{

                const respuesta = await obtenerUsuariosPorIdProyecto(idProyecto);
                setListaUsuarios(respuesta);

            }catch(err){
                console.error("error al obtener los usuarios", err);
            }
        }

        obtenerUsuarios();
        
    }, [])


    return (
        <div className='ventana-usuarios-vinculados'>
            {
               listaUsuarios.map((usuario) => (
                    <h4 key={usuario.id} className='contendor-usuarios'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
                                <path d="M12.006,12.309c3.611-.021,5.555-1.971,5.622-5.671-.062-3.56-2.111-5.614-5.634-5.637-3.561,.022-5.622,2.122-5.622,5.672s2.062,5.615,5.634,5.636Z"/>
                                <path d="M11.994,13.661c-5.328,.034-8.195,2.911-8.291,8.322-.004,.268,.099,.527,.287,.718s.445,.299,.713,.299h14.595c.268,0,.525-.108,.713-.299,.188-.191,.291-.45,.287-.718-.092-5.333-3.036-8.288-8.304-8.322Z"/>
                            </svg>
                        </div>
                        {usuario.nombre}
                    </h4>
               )) 
            }
        </div>
    )

}

export default UsuariosVinculados;