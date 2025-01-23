const http = require('http');
const { infoCourses } = require('./courses');

const server = http.createServer((req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      return handleGetRequest(req, res); //Prodriamos no usar return y usar break
    case 'POST':
      return handlePostRequest(req, res); //Prodriamos no usar return y usar break
    default:
      res.statusCode = 501;
      console.log(`The method used cannot be handled by server: ${method}`);
  }
});

function handleGetRequest(req, res) {
  const path = req.url;
  if (path === '/') {
    res.writeHead(200, { 'content-type': 'application/json' }); //Podemos poner el content-type en el writeHead o en el end res.statusCode = 200; //El estado 200 viene por defecto, no es necesario ponerlo return 
    return res.end('Welcome to my first server and API created with Node.js');
  } else if (path === '/api/courses') {
    //res.statusCode = 200;
    return res.end(JSON.stringify(infoCourses));
  } else if (path === '/api/courses/programing') {
    //res.statusCode = 200;
    return res.end(JSON.stringify(infoCourses.programing));
  } else {
    res.statusCode = 404;
    return res.end('The page you are looking for does not exist');
  }
};

function handlePostRequest(req, res) {
  const path = req.url;
  if (path === '/api/courses/programing') {
    let body = '';
    req.on('data', (chunk) => { //El evento data es predeterminado y se dispara cada vez que se recibe un chunk de datos
      body += chunk.toString();
    });
    req.on('end', () => { //El evento end se dispara cuando se ha recibido todo el cuerpo de la solicitud
      console.log(body);
      console.log(typeof body);
      //Convertir a un objeto de Javascript
      body = JSON.parse(body);
      console.log(typeof body);
      console.log(body.title);
      return res.end('The server has received the POST request in the path /courses/programing');
    });
    //return res.end('The server has received the POST request in the path /courses/programing');
  }
};


const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
