// Uso de async y await en Node.js

function orderProduct(product) {
  return new Promise((resolve, reject) => {
    console.log(`Ordering product: ${product} of Arito Store`);
    setTimeout(() => {
      if (product === 'cup') {
        resolve('Ordering cup with logo of Arito')
      } else {
        reject('Product not currently available ');
      }
    }, 2000);
  });
};

function orderProccess(response) {
  return new Promise((resolve) => {
    console.log('Processing order...');
    console.log(`The response was: ${response}`);
    setTimeout(() => {
      resolve('Order processed successfully, Thanks for your purchase');
    }, 3000);
  })
};

orderProduct('cup')
  .then((response) => {
    console.log('Response received');
    console.log(response);
    return processOrder(response);
  })
  .then((responseProcessed) => {
    console.log(responseProcessed);
  })
  .catch(error => {
    console.log(error);
  });
