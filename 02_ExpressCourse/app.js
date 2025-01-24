const express = require('express');
const app = express();

const { infoCourses } = require('./courses');

//Routers
const programingRouter = express.Router(); //crea el router
app.use('/api/courses/programing', programingRouter); //usa el router asignandole una ruta

const mathematicsRouter = express.Router();
app.use('/api/courses/mathematics', mathematicsRouter);

//Routing - Direccionamiento o enrutamiento

app.get('/', (req, res) => {
  res.send('Bienvenido a mi página principal. Cursos💻 ');
});

app.get('/api/courses', (req, res) => {
  res.send(JSON.stringify(infoCourses));
});

programingRouter.get('/', (req, res) => {
  res.send(JSON.stringify(infoCourses.programing));
});

mathematicsRouter.get('/', (req, res) => {
  res.send(JSON.stringify(infoCourses.mathematics));
});

programingRouter.get('/:language', (req, res) => {
  const language = req.params.language;
  const result = infoCourses.programing.filter(course => course.language === language);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con le lenguaje ${language}`); //return hace que no se ejecute el resto del código
  }

  if (req.query.order === 'views') {
    return res.send(JSON.stringify(result.sort((a, b) => b.views - a.views)));//Ordena de mayor a menor y para menor a mayor sería a.views - b.views-
  }

  res.send(JSON.stringify(result));
});

programingRouter.get('/:language/:level', (req, res) => {
  const language = req.params.language;
  const level = req.params.level;
  const result = infoCourses.programing.filter(course => course.language === language && course.level === level);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con el lenguaje ${language} y nivel ${level}`);
  }

  res.send(JSON.stringify(result));
});

mathematicsRouter.get('/:topics', (req, res) => {
  const topics = req.params.topics;
  const result = infoCourses.mathematics.filter(course => course.topics === topics);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con el tema ${topics}`);
  }

  res.send(JSON.stringify(result));
});



//Configuracion de entorno y el puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});



