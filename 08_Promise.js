const promiseFulfilled = false;

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (promiseFulfilled) {
      resolve('Promise fulfilled');
    } else {
      reject('Promise rejected');
    }
  }, 3000);
});


// myPromise.then((result) => {
//   console.log(result);
// }).catch((error) => {
//   console.log(error);
// })

//Promise(resolve, reject) son predefinidos
//Resolve: Se asignara a a resolve el valor de respesta exitosa
//Reject: Se asignara a reject el valor de respuesta fallida
//Estos dos funciones Resolve y Reject definiran el valor final de la promesa,
//que se pasaran como argumentos a las funciones then y catch respectivamente
//si la respuesta es exitosa se ejecutara el metodo then, 
//si la respuesta es fallida se ejecutara el metodo catch

//Tambien se pueden crer funciones que maneje para cuandola funcion 
//tiene un valor de respuesta exitosa o fallida

const promiseFaliedHandler = (value) => {
  console.log(value);
};

const promiseSuccessHandler = (reasonReject) => {
  console.log(reasonReject);
}

myPromise.then(promiseSuccessHandler, promiseFaliedHandler);
