// Tehtävä 2.1
console.log("Hello, World!");
const name = "Markus";
let age = 17;
let city = "Järvenpää";
console.log(`My name is ${name}, I am ${age} years old and I live in ${city}.`);


// Tehtävä 2.2
let priceA = 5.99;
let priceB = 10.95;
let priceC = 15.49;
let totalPrice = priceA + priceB + priceC;
console.log(`Total price is ${totalPrice.toFixed(2)}.`);


// Tehtävä 2.3
// const calculator = 3;
// const virhe tulee siitä että const-muuttujaa ei voi muuttaa.
let calculator = 3;
calculator += 1;
console.log(`Calculator value is ${calculator}.`);

calculator += 1;
console.log(`Calculator value is ${calculator}.`);

calculator += 1;
console.log(`Calculator value is ${calculator}.`);


// Tehtävä 2.4
console.log(typeof "Hei");  // string
console.log(typeof 42);     // number
console.log(typeof true);   // boolean

console.log("5" * 2);
console.log("5" + 2); 
console.log(Number(ABC)); // ABC ei ole määritelty muuttuja, joten se palauttaa NaN (Not a Number).
