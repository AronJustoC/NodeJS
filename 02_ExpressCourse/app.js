const express = require('express');
const app = express();

const { infoCourses } = require('./courses');

//Routing - Direccionamiento o enrutamiento

app.get('/', (req, res) => {
  res.send('Bienvenido a mi página principal. Cursos💻 ');
});

app.get('/api/courses', (req, res) => {
  res.send(JSON.stringify(infoCourses));
});

app.get('/api/courses/programing', (req, res) => {
  res.send(JSON.stringify(infoCourses.programing));
});

app.get('/api/courses/mathematics', (req, res) => {
  res.send(JSON.stringify(infoCourses.mathematics));
});

app.get('/api/courses/programing/:language', (req, res) => {
  const language = req.params.language;
  const result = infoCourses.programing.filter(course => course.language === language);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con le lenguaje ${language}`); //return hace que no se ejecute el resto del código
  }

  if (req.query.order === 'views') {
    return res.send(JSON.stringify(result.sort((a, b) => b.views - a.views)));
  }

  res.send(JSON.stringify(result));
});

app.get('/api/courses/programing/:language/:level', (req, res) => {
  const language = req.params.language;
  const level = req.params.level;
  const result = infoCourses.programing.filter(course => course.language === language && course.level === level);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con el lenguaje ${language} y nivel ${level}`);
  }

  res.send(JSON.stringify(result));
});

app.get('/api/courses/mathematics/:topics', (req, res) => {
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



