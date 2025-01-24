const express = require('express');
const mathematicsRouter = express.Router();

const { mathematics } = require('../data/courses').infoCourses;

mathematicsRouter.get('/', (req, res) => {
  res.send(JSON.stringify(mathematics));
});

mathematicsRouter.get('/:topics', (req, res) => {
  const topics = req.params.topics;
  const result = mathematics.filter(course => course.topics === topics);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con el tema ${topics}`);
  }

  res.send(JSON.stringify(result));
});

module.exports = mathematicsRouter //exporta el router
