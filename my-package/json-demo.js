const curse = require('./curse.json');
console.log(curse);
console.log(typeof curse);

// curse = {
//   title: 'Learning node.js',
//   numViews: 554455,
//   numLikes: 435234,
//   temes: [ 'javascript', 'node,js' ],
//   isPublic: true
// };

//Convertir una objeto de js en json:
let infoCurseJSON = JSON.stringify(curse);
console.log(infoCurseJSON);
console.log(typeof infoCurseJSON)

//Convertir de un string a objeto de javascript
let toJsObject = JSON.parse(infoCurseJSON);
console.log(toJsObject);
console.log(typeof toJsObject);
