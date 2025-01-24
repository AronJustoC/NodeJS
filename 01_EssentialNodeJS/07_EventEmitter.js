const EventEmitter = require('events'); //se nombra EventEmitter y no events por que el modulo events restorma una clase y tendra el nombre de EventEmitter.

const productsEmissor = new EventEmitter();

productsEmissor.on('compra', (total) => {
  console.log(`Se realizo una compra por ${total}`);
});

productsEmissor.emit('compra', 234);


