const http = require('http'); // Importamos el módulo http
const server = http.createServer((req, res) => { // Creamos un servidor
  console.log('New request'); // Mostramos un mensaje en la consola
  res.end('Hello World!'); // Enviamos una respuesta
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`); // Mostramos un mensaje en la consola
});
