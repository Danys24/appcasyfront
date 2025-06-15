import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}


export async function obtenerCasosPorIdSetPaginas(idSet, page, limit){
    try{
        const res = await fetch(`${URL}sets/${idSet}/casosPaginas?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los casos');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerCasosPorIdSetTotal(idSet){
    try{
        const res = await fetch(`${URL}proyectos/${idProyecto}/sets`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los casos');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function crearUnCaso(idSet,form){
    try{
        const res = await fetch(`${URL}casos`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    idSet:idSet,
                    nombre:form.nombre,
                    descripcion:form.descripcion,
                    estado: form.estado, 
                    responsable: form.responsable 
                }
            )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear el caso');
        }

    }catch(err){
        console.error(err);
    }
}

export async function obtenerUnCaso(id){
    try{
        const res = await fetch(`${URL}casos/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener el caso');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function actualizarUnCaso(form){
    try{
        const res = await fetch(`${URL}casos/${form.id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                nombre:form.nombre,
                descripcion: form.descripcion,
                estado:form.estado,
                responsable:form.responsable
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al actualizar el caso');
        }

    }catch(err){
        console.error(err);
    }
}

export async function eliminarUnCaso(id){
    try{
        const res = await fetch(`${URL}casos/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al eliminar el caso');
        }

    }catch(err){
        console.error(err);
    }
}

export async function ordenarCasos(idSet){
    try{
        const res = await fetch(`${URL}sets/${idSet}/casos`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al ordenar los casos');
        }

    }catch(err){
        console.error(err);
    }
}