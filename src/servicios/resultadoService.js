import {jwtDecode} from 'jwt-decode';


const URL = 'http://localhost:3000/';
let token = localStorage.getItem('token');

let idUsuario;

if(token){
    token = token.replace(/^"|"$/g, '');
    const decode = jwtDecode(token);
    idUsuario = decode.id;
}

export async function obtenerResultadosPorIdPasoIdCiclo(idCiclo,idPaso){
    try{
        const res = await fetch(`${URL}ciclosCasos/${idCiclo}/pasos/${idPaso}/resultados`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los resultados');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function obtenerResultadosPorIdCasoIdCiclo(idCiclo,idCaso){
    try{
        const res = await fetch(`${URL}casos/${idCaso}/ciclos/${idCiclo}/resultados`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener los resultados');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}

export async function crearUnResultado(form,idCaso,idCiclo){
    try{
        const res = await fetch(`${URL}resultados`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(
                {
                    idPaso:form.id,
                    idCiclo:idCiclo,
                    idCaso:idCaso,
                    observacion: form.observacion, 
                    estado: form.estado 
                }
            )
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear el resultado');
        }

    }catch(err){
        console.error(err);
    }
}


export async function actualizarUnResultado(form){
    try{
        const res = await fetch(`${URL}resultados/${form.id_resultado}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                observacion:form.observacion,
                estado:form.estado
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al actualizar el resultado');
        }

    }catch(err){
        console.error(err);
    }
}

export async function crearEvidencia(form){
    try{
        const res = await fetch(`${URL}resultados/evidencias`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${token}`,
            },
            body:form,

        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al crear la evidencia');
        }

    }catch(err){
        console.error(err);
    }
}

export async function obtenerEvidenciasPorIdResultado(idResultado){
    try{
        const res = await fetch(`${URL}resultados/${idResultado}/evidencias`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al obtener las evidencias');
        }

        
        return data;

    }catch(err){
        throw err;
    }
}

export async function eliminarEvidenciaPorId(id){
    try{
        const res = await fetch(`${URL}resultados/evidencias/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || 'Error al eliminar la evidencia');
        }

        
        return data;

    }catch(err){
        console.error(err);
    }
}






