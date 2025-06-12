import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}


export async function obtenerUsuariosPorIdProyecto(id){
    try{
        const res = await fetch(`${URL}proyectos/${id}/usuarios`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al obtener los usuarios');
        }

        const data = await res.json();
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerUsuariosPorIdProyectoNoVinculado(id){
    try{
        const res = await fetch(`${URL}proyectos/${id}/usuariosNoAsociados`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            if(res.status === 404){
                throw new Error('No hay usuarios para vincular')
            }
            throw new Error(data.error || 'Error al vincular el usuario');
        }


        
        return data;

    }catch(err){
        throw err;
    }
}

export async function vincularUsuarioProyecto(idUsuario,idProyecto){
    try{
        const res = await fetch(`${URL}usuarios/vincularUsuarioProyecto`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idUsuario: idUsuario,
                idProyecto: idProyecto
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al vincular el usuario');
        }

        //return data;

    }catch(err){
        console.error(err);
        throw err;
    }
}

