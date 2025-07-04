import {useEffect,useRef ,useState} from 'react';
import jsPDF from "jspdf";

function ExportarCaso(){
    const generarPDF = () => {
        const doc = new jsPDF();
    }
    

    return (
        <div>
            <button onClick={generarPDF}>Exportar</button>
        </div>
    )


}

export default ExportarCaso;