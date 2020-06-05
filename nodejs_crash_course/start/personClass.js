// Module Wrapper Function: everything is wrapped in a function like this
// (function (exports, require, module, __filename, __dirname) {

// });

// We have access to all variables there
console.log(__dirname, __filename);

class Person {
  constructor(name, age) {
    (this.name = name), (this.age = age);
  }

  greeting() {
    console.log(`My name is ${this.name}, and I am ${this.age} years old now.`);
  }
}

export default Person;
