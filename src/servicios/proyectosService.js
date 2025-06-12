import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}


export async function obtenerProyectosPorIdUsuario(page, limit){
    try{
        const res = await fetch(`${URL}usuarios/${idUsuario}/proyectos?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al obtener los proyectos');
        }

        const data = await res.json();
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerProyectos(){
    try{
        const res = await fetch(`${URL}proyectos`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los proyectos');
        }

        
        return data;

    }catch(err){
        throw err;
    }
}

export async function crearUnProyecto(form){
    try{
        const res = await fetch(`${URL}proyectos`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(form)
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al crear el proyecto');
        }

        const data = await res.json();

    }catch(err){
        console.error(err);
    }
}

export async function obtenerUnProyecto(id){
    try{
        const res = await fetch(`${URL}proyectos/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al obtener el proyecto');
        }

        const data = await res.json();
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function actualizarUnProyecto(form){
    try{
        const res = await fetch(`${URL}proyectos/${form.id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                nombre:form.nombre,
                descripcion: form.descripcion
            })
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al actualizar el proyecto');
        }

        const data = await res.json();

    }catch(err){
        console.error(err);
    }
}

export async function eliminarUnProyecto(id){
    try{
        const res = await fetch(`${URL}proyectos/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Error al eliminar el proyecto');
        }

        const data = await res.json();

    }catch(err){
        console.error(err);
    }
}