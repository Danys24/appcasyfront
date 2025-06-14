import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}


export async function obtenerSetsPorIdProyectoPaginas(idProyecto, page, limit){
    try{
        const res = await fetch(`${URL}proyectos/${idProyecto}/setsPaginas?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los sets');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerSetsPorIdProyectoTotal(idProyecto){
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
            throw new Error(data.error || 'Error al obtener los sets');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function crearUnSet(idProyecto,form){
    try{
        const res = await fetch(`${URL}sets`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    idProyecto:idProyecto,
                    nombre:form.nombre,
                    descripcion:form.descripcion,
                    estado: form.estado 
                }
            )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear el set');
        }

    }catch(err){
        console.error(err);
    }
}

export async function obtenerUnSet(id){
    try{
        const res = await fetch(`${URL}sets/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener el set');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function actualizarUnSet(form){
    try{
        const res = await fetch(`${URL}sets/${form.id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                nombre:form.nombre,
                descripcion: form.descripcion,
                estado:form.estado
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al actualizar el set');
        }

    }catch(err){
        console.error(err);
    }
}

export async function eliminarUnSet(id){
    try{
        const res = await fetch(`${URL}sets/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al eliminar el set');
        }

    }catch(err){
        console.error(err);
    }
}