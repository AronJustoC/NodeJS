const express = require('express');
const app = express();

const { infoCourses } = require('./data/courses');

//Importando los routers
const programingRouter = require('./routers/programing');
const mathematicsRouter = require('./routers/mathematics');

//Routers
app.use('/api/courses/programing', programingRouter); //usa el router asignandole una ruta
app.use('/api/courses/mathematics', mathematicsRouter);

//Routing - Direccionamiento o enrutamiento

app.get('/', (req, res) => {
  res.send('Bienvenido a mi página principal. Cursos💻 ');
});

app.get('/api/courses', (req, res) => {
  res.send(JSON.stringify(infoCourses));
});

//Configuracion de entorno y el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
