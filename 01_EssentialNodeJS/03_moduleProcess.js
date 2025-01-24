//console.log(process);
//console.log(process.env);
console.log(process.argv);
//[ node, app.js, 6, 7 ] //con argv se tomara como un array 
//[  0,    1,    2,  3] //Con estos indices
//console.log(process.argv[2]);
//console.log(process.argv[3]);
for (let i = 2; process.argv.legth; i++) {
  console.log(process.argv[i]);
}

console.log(process.memoryUsage());
