import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}

export async function obtenerPasosPorIdCaso(idCaso){
    try{
        const res = await fetch(`${URL}casos/${idCaso}/pasos`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los pasos');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function crearUnPaso(idCaso,form){
    try{
        const res = await fetch(`${URL}pasos`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    idCaso:idCaso,
                    paso:form.paso,
                    resultado:form.resultado
                }
            )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear el paso');
        }
        

    }catch(err){
        console.error(err);
        console.log(idCaso,form.paso, form.resultado)
    }
}

export async function obtenerUnPaso(id){
    try{
        const res = await fetch(`${URL}pasos/${id}`, {
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

export async function actualizarUnPaso(form){
    try{
        const res = await fetch(`${URL}pasos/${form.id}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                paso:form.paso,
                resultado: form.resultado
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al actualizar el paso');
        }

    }catch(err){
        console.error(err);
    }
}

export async function eliminarUnPaso(id){
    try{
        const res = await fetch(`${URL}pasos/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al eliminar el paso');
        }

    }catch(err){
        console.error(err);
    }
}

export async function ordenarPasos(idCaso){
    try{
        const res = await fetch(`${URL}casos/${idCaso}/pasos`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al ordenar los pasos');
        }

    }catch(err){
        console.error(err);
    }
}