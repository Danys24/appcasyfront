import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}


export async function obtenerCiclosPorIdProyectoPaginas(idProyecto, page, limit){
    try{
        const res = await fetch(`${URL}proyectos/${idProyecto}/ciclosCasosPaginado?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los ciclos');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerCiclosPorIdCiclosTotal(idSet){
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

export async function crearUnCiclo(idProyecto,form){
    try{
        const res = await fetch(`${URL}ciclosCasos`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    idProyecto:idProyecto,
                    nombre:form.nombre
                }
            )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear el ciclo');
        }

    }catch(err){
        console.error(err);
    }
}

export async function obtenerUnCiclo(id){
    try{
        const res = await fetch(`${URL}ciclosCasos/${id}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener el ciclo');
        }

        return data;

    }catch(err){
        console.error(err);
    }
}

export async function actualizarUnCiclo(form){
    try{
        const res = await fetch(`${URL}ciclosCasos/${form.id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                nombre:form.nombre
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al actualizar el ciclo');
        }

    }catch(err){
        console.error(err);
    }
}

export async function eliminarUnCiclo(id){
    try{
        const res = await fetch(`${URL}ciclosCasos/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al eliminar el ciclo');
        }

    }catch(err){
        console.error(err);
    }
}
