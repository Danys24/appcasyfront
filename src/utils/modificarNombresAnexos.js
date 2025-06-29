export function generarNombreArchivo(extension = 'png') {
  const ahora = new Date();
  const fecha = ahora.toISOString().slice(0, 10); // "2025-06-28"
  const hora = ahora.toTimeString().slice(0, 8).replace(/:/g, ''); // "154500"
  return `evidencia-${fecha}-${hora}.${extension}`;
}
