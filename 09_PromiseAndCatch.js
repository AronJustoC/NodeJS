//Ejemplo con pedidos de pizzas

const orderStatus = () => {
  return Math.random() < 0.8;
};

const myPizzaOrder = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (orderStatus()) {
      resolve('Order successful');
    } else {
      reject('Sorry, your order failed, try again please');
    }
  }, 3000);
});

//######### OPCION 1 #########
// const orderHandler = (confirmationMessage) => {
//   console.log(confirmationMessage);
// };
//
// const errorHandler = (errorMessage) => {
//   console.log(errorMessage);
// };
// myPizzaOrder.then(orderHandler, errorHandler);


//######### OPCION 2 #########
//(Usando solo then y sin uso de funciones de apoyo)
// myPizzaOrder
//   .then((confirmationMessage) => {
//     console.log(confirmationMessage)
//   })
//   .then(null, (errorMessage) => {
//     console.log(errorMessage)
//   });


//######### OPCION 3 #########
// (Usando catch)
myPizzaOrder.then((confirmationMessage) => {
  console.log(confirmationMessage);
}).catch((errorMessage) => {
  console.log(errorMessage);
});
