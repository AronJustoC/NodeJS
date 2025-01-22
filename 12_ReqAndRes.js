const http = require('http');
const server = http.createServer((req, res) => {
  //console.log('===> request(solicitud)');
  // console.log(req.url);
  // console.log(req.method);
  // console.log(req.headers);
  console.log('===> response(respuesta)');
  //console.log(res.statusCode); // 200
  // res.statusCode = 404;
  // console.log(res.statusCode); // 404
  //res.setHeader('Content-Type', 'application/json'); //Podemos asignar un header ejm clave valor
  //console.log(res.getHeaders()); //Mostrar los headers
  res.end('Hello World');
});

const port = 3000;
server.listen(port, () => {
  console.log(`===> server(listening) on port ${port}`);
});
