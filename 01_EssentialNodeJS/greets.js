function greet(name) {
  return (`Hi, ${name}!`)
};

function greetHelloWorld() {
  return 'Hello, World';
}



//module.exports.greet = greet; //module.exports = objeto vacio {}, el primer greet se refiere al nombre de como se exportara y el segundo recuere ala funcion.
//module.exports.greetHelloWorld = greetHelloWorld;

module.exports = {
  greet: greet,
  greetHelloWorld: greetHelloWorld
}


