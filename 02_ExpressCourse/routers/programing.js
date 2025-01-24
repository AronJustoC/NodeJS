const express = require('express');
const programingRouter = express.Router(); //crea el router

const { programing } = require('../data/courses').infoCourses;

programingRouter.get('/', (req, res) => {
  res.send(JSON.stringify(programing));
});

programingRouter.get('/:language', (req, res) => {
  const language = req.params.language;
  const result = programing.filter(course => course.language === language);

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
  const result = programing.filter(course => course.language === language && course.level === level);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con el lenguaje ${language} y nivel ${level}`);
  }

  res.send(JSON.stringify(result));
});

module.exports = programingRouter; //exporta el router
