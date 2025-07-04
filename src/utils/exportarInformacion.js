import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import getImageBase64 from "./convertirImgBase64";

const exportarPDF = (casoEncontrado, cicloEncontrado, listaResultados, listaArchivos) => {

    const doc = new jsPDF();

    const posicionX = 20;
    let posicionY = 20;

    doc.setFont("helvetica");
    doc.setFontSize(14);


    doc.setFont("helvetica","bold");
    doc.text(`${casoEncontrado.nombre}`,posicionX,20);
    doc.setFont("helvetica","normal");
    doc.setFontSize(12);
    doc.text(`Estado: ${casoEncontrado.estado}`,posicionX,30);

    const textoDividido = doc.splitTextToSize(`${casoEncontrado.descripcion}`, 180)
    doc.text(textoDividido,posicionX,40);
    doc.text(`Ciclo: ${cicloEncontrado.nombre}`,posicionX,80);

    let posicion = 90

    listaResultados.forEach(resultado => {
      posicion = posicion + 10;
      doc.text(`Paso: ${resultado.paso}`,posicionX, posicion);
      posicion = posicion + 10;
      doc.text(`Resultado: ${resultado.resultado}`,posicionX, posicion);
      posicion = posicion + 10;
      doc.text(`Estado: ${resultado.estado}`,posicionX, posicion);
      posicion = posicion + 10;
    })

    posicion = posicion + 10
    doc.text("Evidencias",posicionX, posicion);

    function agregarImagenes(lista, index = 0){
      console.log(lista)
      if (index >= lista.length || lista[index].url_evidencia == null) {
        // cuando termina, guardar el PDF
        doc.save(`${casoEncontrado.nombre}.pdf`);
        return;
      }

      const evi = lista[index];
      posicion = posicion + 10;
      getImageBase64(evi.url_evidencia, function (imgBase64) {
        doc.addImage(imgBase64, 'PNG', posicionX, posicion, 150, 100);
        agregarImagenes(lista, index + 1);
      });

    }

    agregarImagenes(listaArchivos);
};

export default exportarPDF;