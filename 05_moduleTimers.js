function product(a, b) {
  console.log(a * b);
}

setTimeout(product, 2000, 5, 6);
setImmediate(product, 5, 7);//Se ejecuta inmediatamente despues del codigo asicrono
setInterval(product, 1000, 3, 5);
