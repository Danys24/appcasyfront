import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import getImageBase64 from "./convertirImgBase64";

const exportarPDF = (casoEncontrado, cicloEncontrado, listaResultados, listaArchivos) => {

    const doc = new jsPDF();

    const posicionX = 20;
    let posicionY = 20;

    function agregarPagina(){
      doc.addPage();
      posicionY = 20;
    }

    function aumentarPosicionY(aumento){
      posicionY = posicionY + aumento;
    }

    doc.setFont("helvetica");
    doc.setFontSize(14);


    doc.setFont("helvetica","bold");
    doc.text(`${casoEncontrado.nombre}`,posicionX,20);
    doc.setFont("helvetica","normal");
    doc.setFontSize(11);
    doc.text(`Estado: ${casoEncontrado.estado}`,posicionX,30);

    const textoDividido = doc.splitTextToSize(`${casoEncontrado.descripcion}`, 180)
    doc.text(textoDividido,posicionX,40);
    doc.text(`Ciclo: ${cicloEncontrado.nombre}`,posicionX,80);

    posicionY = 90

    listaResultados.forEach(resultado => {
      posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
      doc.text(`Paso: ${resultado.paso}`,posicionX, posicionY);
      posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
      doc.text(`Resultado: ${resultado.resultado}`,posicionX, posicionY);
      posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
      doc.text(`Estado: ${resultado.estado}`,posicionX, posicionY);
      posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
    })

    posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
    doc.text("Evidencias",posicionX, posicionY);

    function agregarImagenes(lista, index = 0){
      console.log(lista)
      if (index >= lista?.length || lista == null) {
        // cuando termina, guardar el PDF
        doc.save(`${casoEncontrado.nombre}.pdf`);
        return;
      }

      const evi = lista[index];
      posicionY > 287 ? agregarPagina(): aumentarPosicionY(10);
      const tamanioImgY = 100;
      getImageBase64(evi, function (imgBase64) {
        (posicionY + tamanioImgY) > 287 ? agregarPagina() : posicionY; 
        doc.addImage(imgBase64, 'PNG', posicionX, posicionY, 150, tamanioImgY);
        aumentarPosicionY(tamanioImgY);
        agregarImagenes(lista, index + 1);
      });

    }

    agregarImagenes(listaArchivos);
};

export default exportarPDF;