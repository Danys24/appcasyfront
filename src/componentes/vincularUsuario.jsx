import './vincularUsuario.css';
import {obtenerUsuariosPorIdProyecto,obtenerUsuariosPorIdProyectoNoVinculado,vincularUsuarioProyecto} from '../servicios/usuariosService.js';
import {useEffect, useState} from 'react';


function VincularUsuario({idProyecto}){

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form, setForm] = useState({
        id:'',
        nombre:''
    });

    useEffect(() => {

        const obtenerUsuarios = async () => {
            try{

                const respuesta = await obtenerUsuariosPorIdProyectoNoVinculado(idProyecto);
                setListaUsuarios(respuesta);               

            }catch(err){
                setListaUsuarios([]);
            }
        }

        obtenerUsuarios();
        
    }, [])

    const handleInputChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        })
    }


    const vincularUsuario = async (e) => {
        try{
            await vincularUsuarioProyecto(form.id, idProyecto);
            setSuccess('Usuario vinculado correctamente');
            setError('');
        }catch(err){
            setError(err);
            setSuccess('');
        } 
    }

    return (
        <div className='ventana-vincular-usuario'>

            {
                listaUsuarios.length === 0 
                ? 
                (<p>No hay usuarios para vincular</p>)
                :
                (
                    <form onSubmit={vincularUsuario}>
                        <div className='contenedor-vin-usuario'>
                            <label htmlFor="vincular">Vincular Usuario al Proyecto</label>
                            <select name="id" id="vincular" value={form.id} onChange={handleInputChange} required>
                                    <option value="">Seleccione un usuario</option>
                                    {
                                        listaUsuarios.map((usuario) => (
                                            <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
                                        ))
                                    }
                                        
                            </select>
                        </div>
                        <button type='submit' className='btn-vincular'>Vincular</button>
                                
                    </form>
                )

            }
            
        </div>
    )

}

export default VincularUsuario;