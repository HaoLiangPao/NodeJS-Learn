// Class module import
const Person = require("./personClass");
const person1 = new Person("Hao Liang", 24);
person1.greeting();

// Function module import
const person = require("./person");
console.log(person);
