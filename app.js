const { log } = require('console');
const fs = require('fs');

//Estas funciones son asincronas por lo tanto su jecucion no  se realizara en el orden en el que estan escritas
//a menis que llamenos a su bersin sincrona ejm. asincrono = readFile, sincrona = readFileSync
//si utilizamos enta version sincrona no sera necesario colocar el callback sino que asignaremos al resultado
//de la funcion una variable y la mostramos con console.log
//ejm:
//const content = readFileSync('index.html, 'utf-8');
//console.log(content);

//Leer un archivo
//fs.readFile('index.html', 'utf-8', (err, contenido) => {
//  if (err) {
//    throw err;
//  } else {
//    console.log(contenido);
//  }
//});

//Renombrar un archivo
// fs.rename('index.html', 'main.html', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Nombre cambiado');
// })


////Agregar contenido al final de un archivo
//fs.appendFile('index.html', '<p>Hola</p>', (err) => {
//  if (err) {
//    throw err;
//  }
//  console.log('Archivo actualizado')
//});

//Reemplazar todo el archivo
// fs.writeFile('index.html', 'contenido nuevo', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('contenido reemplazado exitosamente');
// });

//Eliminar un archivo
// fs.unlink('main.html', (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('Eliminado exitosamente')
// })

