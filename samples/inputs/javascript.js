// Comprehensive JavaScript showcase for syntax highlighting
/* Multi-line comment demonstrating
   block comment syntax */

// Variable declarations with different keywords
const PI = 3.14159;
let counter = 0;
var legacy_var = "old style";

// String literals (single, double, template)
const singleQuote = 'Single quoted string';
const doubleQuote = "Double quoted string";
const templateLiteral = `Template with ${PI} and expressions`;

// Numbers (integer and decimal)
const integer = 42;
const decimal = 3.14159;
const scientific = 2.5e10;

// Boolean values
const isActive = true;
const isDisabled = false;

// Functions (multiple styles)
function regularFunction(name) {
    const greeting = `Hello, ${name}!`;
    return greeting;
}

const arrowFunction = (x, y) => x + y;
const asyncFunction = async (url) => {
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error;
    }
};

// Classes and inheritance
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    speak() {
        return `${this.name} barks`;
    }
}

// Control flow structures
if (counter === 0) {
    console.log("Counter is zero");
} else if (counter > 0) {
    console.log("Counter is positive");
} else {
    console.log("Counter is negative");
}

// Loops
for (let i = 0; i < 5; i++) {
    counter++;
}

while (counter > 0) {
    counter--;
    if (counter === 3) continue;
    if (counter === 1) break;
}

// Array and object manipulation
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n * n);
const filtered = numbers.filter(n => n % 2 === 0);

const person = {
    name: "John",
    age: 30,
    city: "New York"
};

// Destructuring
const { name, age } = person;
const [first, second, ...rest] = numbers;

// Modern JavaScript features
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Success"), 1000);
});

// Switch statement
switch (typeof PI) {
    case 'number':
        console.log("PI is a number");
        break;
    case 'string':
        console.log("PI is a string");
        break;
    default:
        console.log("PI is something else");
}

// Export statements
export { regularFunction, arrowFunction };
export const utilities = { PI, counter };
export default class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// Import (would be at top in real code)
// import { useState, useEffect } from 'react';
// import defaultExport, { namedExport } from './module';

console.log("JavaScript showcase complete");
