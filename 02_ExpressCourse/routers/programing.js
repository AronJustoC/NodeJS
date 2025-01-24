const express = require('express');
const programingRouter = express.Router(); //crea el router

programingRouter.use(express.json()); //middleware para que express pueda entender el body de las peticiones

const { programing } = require('../data/courses').infoCourses;

programingRouter.get('/', (req, res) => {
  res.json(programing);
});

programingRouter.get('/:language', (req, res) => {
  const language = req.params.language;
  const result = programing.filter(course => course.language === language);

  if (result.length === 0) {
    return res.status(404).send(`No se encontró el curso con le lenguaje ${language}`); //return hace que no se ejecute el resto del código
  }

  if (req.query.order === 'views') {
    return res.send(result.sort((a, b) => b.views - a.views));//Ordena de mayor a menor y para menor a mayor sería a.views - b.views-
  }

  res.json(result);
});

programingRouter.get('/:language/:level', (req, res) => {
  const language = req.params.language;
  const level = req.params.level;
  const result = programing.filter(course => course.language === language && course.level === level);

  if (result.length === 0) {
    return res.status(204).send(`No se encontró el curso con el lenguaje ${language} y nivel ${level}`);
    //Otra opcion poedria ser usar el metodo end() que termina la respuesta sin enviar datos
    //return res.status(404).end();
  }

  res.json(result);
});

programingRouter.post('/', (req, res) => {
  const cursoNuevo = req.body;
  programing.push(cursoNuevo);
  res.json(programing);
});

//Request put 
programingRouter.put('/:id', (req, res) => {
  const updatedCourse = req.body; //obtiene el curso actualizado
  const id = req.params.id; //obtiene el id del curso a actualizar
  const index = programing.findIndex(course => course.id == id); //busca el curso a actualizar, solo 2 iguales por que uno es string y el otro es number si no se encuentra devuelve -1
  if (index >= 0) {
    programing[index] = updatedCourse; //actualiza el curso
  } else {
    res.status(404).send(`No se encontró el curso con el id ${id}`);
  }
  res.send((programing));//no es necesario el stringify ya que semd lo hace por nosotros y send podemos cambiarlo por json que es lo mismo pero más claro
});

//Request patch
programingRouter.patch('/:id', (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;
  const index = programing.findIndex(course => course.id == id);

  if (index >= 0) {
    const courseModify = programing[index];
    Object.assign(courseModify, updatedInfo);//El primer parametro es el objeto que se va a modificar y el segundo es el objeto con las propiedades a modificar (clave: valor)
  }
  res.json(programing);
});

//Request delete
programingRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = programing.findIndex(course => course.id == id);

  if (index >= 0) {
    programing.splice(index, 1);
  }
  res.json(praograming);
});



module.exports = programingRouter; //no es neceasrio el nombre de la variable, se puede exportar directamente el router
