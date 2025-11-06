import { exampleRunners } from '../../utils/exampleRunners'

export const core_js = {
        id: 'core-js',
        title: 'Core JavaScript',
        description: 'Master the fundamentals of JavaScript programming',
        emoji: '🔧',
        cards: [
            {
                id: 'variables',
                title: '1. Variables: var, let, const',
                icon: 'fa-code',
                description: 'Understanding the differences between var, let, and const, including scoping, hoisting, and best practices.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'var vs let vs const - Key Differences',
                        code: `// VAR - Function scoped, hoisted, can be redeclared
var x = 1;
var x = 2; // ✅ Allowed (redeclaration)
if (true) {
    var y = 10; // Function scoped, accessible outside block
}
console.log(y); // 10 ✅ Accessible

// LET - Block scoped, hoisted but in TDZ, cannot be redeclared
let a = 1;
// let a = 2; // ❌ Error: Identifier 'a' has already been declared
if (true) {
    let b = 20; // Block scoped
    // console.log(b); // ✅ Accessible here
}
// console.log(b); // ❌ ReferenceError: b is not defined

// CONST - Block scoped, must be initialized, cannot be reassigned
const c = 1;
// c = 2; // ❌ TypeError: Assignment to constant variable
// const d; // ❌ SyntaxError: Missing initializer

// CONST with objects/arrays (reference is constant, content can change)
const obj = { name: 'John' };
obj.name = 'Jane'; // ✅ Allowed (mutating property)
// obj = {}; // ❌ Error (reassigning reference)

const arr = [1, 2, 3];
arr.push(4); // ✅ Allowed
// arr = []; // ❌ Error`,
                        runFunction: null,
                        note: 'Use const by default, let when you need to reassign, and avoid var in modern JavaScript.'
                    },
                    {
                        title: 'Temporal Dead Zone (TDZ)',
                        code: `// VAR - Hoisted and initialized with undefined
console.log(varVar); // undefined ✅ (no error)
var varVar = 'value';

// LET/CONST - Hoisted but in Temporal Dead Zone
// console.log(letVar); // ❌ ReferenceError: Cannot access before initialization
let letVar = 'value';

// TDZ exists from start of block until declaration
function example() {
    // TDZ starts here
    console.log(typeof letVar); // ❌ ReferenceError
    let letVar = 'value'; // TDZ ends here
}

// Practical example
function getValue() {
    return value; // ❌ ReferenceError (TDZ)
    let value = 42;
}`,
                        runFunction: null,
                        note: 'Temporal Dead Zone prevents accessing let/const variables before their declaration, even though they are hoisted.'
                    }
                ]
            },
            {
                id: 'functions',
                title: '2. Functions',
                icon: 'fa-function',
                description: 'Function declarations, expressions, IIFE, parameters, and function methods (call, apply, bind).',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Function Declarations vs Expressions',
                        code: `// Function Declaration - Hoisted
sayHello(); // ✅ Works (hoisted)
function sayHello() {
    console.log('Hello!');
}

// Function Expression - Not hoisted
// sayGoodbye(); // ❌ TypeError: sayGoodbye is not a function
const sayGoodbye = function() {
    console.log('Goodbye!');
};

// Named Function Expression
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // Can reference itself
};

// Arrow Function Expression
const multiply = (a, b) => a * b;

// IIFE - Immediately Invoked Function Expression
(function() {
    console.log('This runs immediately!');
})();

// IIFE with parameters
(function(name) {
    console.log(\`Hello, \${name}!\`);
})('John');`,
                        runFunction: null,
                        note: 'Function declarations are hoisted, expressions are not. IIFE creates isolated scope.'
                    },
                    {
                        title: 'Function Parameters: Default, Rest, Destructured',
                        code: `// Default parameters
function greet(name = 'Guest', greeting = 'Hello') {
    return \`\${greeting}, \${name}!\`;
}
greet(); // "Hello, Guest!"
greet('John', 'Hi'); // "Hi, John!"

// Rest parameters (collects remaining arguments)
function sum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10

// Destructured parameters
function displayUser({ name, age, email }) {
    return \`\${name} (\${age}) - \${email}\`;
}
displayUser({ name: 'John', age: 30, email: 'john@example.com' });

// Combined
function processData(data, options = {}, ...extras) {
    const { format = 'json', validate = true } = options;
    // Process data...
}`,
                        runFunction: null
                    },
                    {
                        title: 'call, apply, and bind',
                        code: `const person = {
    firstName: 'John',
    lastName: 'Doe',
    getFullName: function(city, country) {
        return \`\${this.firstName} \${this.lastName} from \${city}, \${country}\`;
    }
};

const person2 = {
    firstName: 'Jane',
    lastName: 'Smith'
};

// call() - Calls function with specified this and arguments
person.getFullName.call(person2, 'NYC', 'USA');
// "Jane Smith from NYC, USA"

// apply() - Same as call but arguments as array
person.getFullName.apply(person2, ['London', 'UK']);
// "Jane Smith from London, UK"

// bind() - Returns new function with bound this
const boundFunction = person.getFullName.bind(person2);
boundFunction('Paris', 'France');
// "Jane Smith from Paris, France"

// Practical use case
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers); // 7
const min = Math.min.call(null, ...numbers); // 2`,
                        runFunction: null,
                        note: 'call and apply invoke immediately, bind returns a new function. Useful for borrowing methods and setting context.'
                    }
                ]
            },
            {
                id: 'objects',
                title: '3. Objects & Object Methods',
                icon: 'fa-cube',
                description: 'Object creation, manipulation, and built-in Object methods for working with objects.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Object Creation Patterns',
                        code: `// Object literal
const person = {
    name: 'John',
    age: 30,
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
};

// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const john = new Person('John', 30);

// Object.create()
const proto = { greet() { return 'Hello!'; } };
const obj = Object.create(proto);
obj.name = 'John';

// Factory function
function createPerson(name, age) {
    return {
        name,
        age,
        greet() {
            return \`Hello, I'm \${this.name}\`;
        }
    };
}`,
                        runFunction: null
                    },
                    {
                        title: 'Object.keys(), Object.values(), Object.entries()',
                        code: `const person = {
    name: 'John',
    age: 30,
    city: 'NYC'
};

// Object.keys() - Get all keys
const keys = Object.keys(person);
console.log(keys); // ['name', 'age', 'city']

// Object.values() - Get all values
const values = Object.values(person);
console.log(values); // ['John', 30, 'NYC']

// Object.entries() - Get key-value pairs
const entries = Object.entries(person);
console.log(entries); // [['name', 'John'], ['age', 30], ['city', 'NYC']]

// Practical use cases
// Iterate over object
Object.keys(person).forEach(key => {
    console.log(\`\${key}: \${person[key]}\`);
});

// Convert object to map
const map = new Map(Object.entries(person));

// Filter object properties
const filtered = Object.fromEntries(
    Object.entries(person).filter(([key, value]) => typeof value === 'string')
);`,
                        runFunction: null,
                        note: 'These methods are essential for object manipulation and iteration in modern JavaScript.'
                    },
                    {
                        title: 'Object.assign(), Object.freeze(), Object.seal()',
                        code: `// Object.assign() - Copy properties
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

// Shallow copy
const original = { name: 'John', address: { city: 'NYC' } };
const copy = Object.assign({}, original);
copy.address.city = 'LA'; // ⚠️ Also changes original!

// Object.freeze() - Prevents modifications
const frozen = Object.freeze({ name: 'John' });
// frozen.name = 'Jane'; // ❌ Error in strict mode
// frozen.age = 30; // ❌ Error

// Object.seal() - Prevents adding/deleting, allows modifying
const sealed = Object.seal({ name: 'John' });
sealed.name = 'Jane'; // ✅ Allowed
// sealed.age = 30; // ❌ Error

// Object.isFrozen(), Object.isSealed()
console.log(Object.isFrozen(frozen)); // true
console.log(Object.isSealed(sealed)); // true`,
                        runFunction: null,
                        note: 'Object.assign creates shallow copies. freeze() makes objects immutable, seal() prevents property addition/deletion.'
                    }
                ]
            },
            {
                id: 'callbacks',
                title: '4. Callbacks',
                icon: 'fa-phone',
                description: 'Callback functions, callback patterns, and the transition from callbacks to Promises.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Basic Callback Functions',
                        code: `// Simple callback
function greet(name, callback) {
    const message = \`Hello, \${name}!\`;
    callback(message);
}

greet('John', (msg) => {
    console.log(msg); // "Hello, John!"
});

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num, index) => {
    console.log(\`Index \${index}: \${num}\`);
});

// setTimeout callback
setTimeout(() => {
    console.log('This runs after 1 second');
}, 1000);

// Event handlers (callback pattern)
button.addEventListener('click', (event) => {
    console.log('Button clicked!');
});`,
                        runFunction: null,
                        note: 'Callbacks are functions passed as arguments to be executed later. They are fundamental to JavaScript.'
                    },
                    {
                        title: 'Callback Hell and Solutions',
                        code: `// ❌ Callback Hell (Nested callbacks)
getData(function(a) {
    getMoreData(a, function(b) {
        getEvenMoreData(b, function(c) {
            getFinalData(c, function(d) {
                console.log(d); // Deep nesting!
            });
        });
    });
});

// ✅ Solution 1: Named functions
function handleFinalData(d) {
    console.log(d);
}

function handleEvenMoreData(c) {
    getFinalData(c, handleFinalData);
}

function handleMoreData(b) {
    getEvenMoreData(b, handleEvenMoreData);
}

function handleData(a) {
    getMoreData(a, handleMoreData);
}

getData(handleData);

// ✅ Solution 2: Promises (better approach)
getData()
    .then(getMoreData)
    .then(getEvenMoreData)
    .then(getFinalData)
    .then(console.log)
    .catch(console.error);`,
                        runFunction: null,
                        note: 'Callback hell makes code hard to read. Use named functions or better yet, Promises/async-await.'
                    },
                    {
                        title: 'Error-First Callbacks (Node.js Pattern)',
                        code: `// Node.js convention: (error, data) => {}
function readFile(path, callback) {
    // Simulate async operation
    setTimeout(() => {
        if (path === 'valid.txt') {
            callback(null, 'File content'); // Success: error is null
        } else {
            callback(new Error('File not found')); // Error: data is undefined
        }
    }, 1000);
}

// Usage
readFile('valid.txt', (error, data) => {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Data:', data);
});

// Always check error first!
readFile('invalid.txt', (error, data) => {
    if (error) {
        // Handle error
        return;
    }
    // Process data
});`,
                        runFunction: null,
                        note: 'Error-first callback pattern is Node.js convention. Always check for errors before processing data.'
                    }
                ]
            },
            {
                id: 'closures',
                title: '5. Closures',
                icon: 'fa-link',
                description: 'A closure is a function that has access to variables in its outer (enclosing) scope even after the outer function returns.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Basic Closure Example',
                        code: `function outerFunction(x) {
    // This is the outer function's scope
    return function innerFunction(y) {
        // This inner function has access to x from outer scope
        return x + y;
    };
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8
console.log(addFive(10)); // 15`,
                        runFunction: exampleRunners.runClosureExample,
                        note: 'The inner function "closes over" the variables from the outer function, creating a persistent scope that survives even after the outer function completes.'
                    }
                ]
            },
            {
                id: 'hoisting',
                title: '6. Hoisting',
                icon: 'fa-arrow-up',
                description: 'Hoisting is JavaScript\'s behavior of moving variable and function declarations to the top of their scope during compilation.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Variable Hoisting - Common Errors & Pitfalls',
                        code: `// ERROR 1: Using variable before declaration
console.log(name); // undefined (not ReferenceError!)
var name = "John";
console.log(name); // "John"

// ERROR 2: Function scope confusion
if (true) {
    var blockVar = "I'm accessible outside!";
}
console.log(blockVar); // "I'm accessible outside!"

// ERROR 3: Loop variable hoisting (Classic Closure Bug)
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100); // Prints 3, 3, 3
}

// ERROR 4: Temporal Dead Zone (let/const)
console.log(letVar); // ReferenceError!
let letVar = "I'm not hoisted like var";

// ERROR 5: Function expression hoisting
sayHello(); // TypeError: sayHello is not a function
var sayHello = function() {
    console.log("Hello!");
};`,
                        runFunction: exampleRunners.runVarHoisting,
                        note: 'Understanding hoisting errors prevents many JavaScript bugs!'
                    }
                ]
            },
            {
                id: 'scope',
                title: '7. Scope',
                icon: 'fa-eye',
                description: 'Scope determines the accessibility of variables, functions, and objects in different parts of your code.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Scope Chain Example',
                        code: `const globalVar = "I'm global";

function outerFunction() {
    const outerVar = "I'm in outer scope";
    
    function innerFunction() {
        const innerVar = "I'm in inner scope";
        console.log(globalVar); // Accessible
        console.log(outerVar);  // Accessible
        console.log(innerVar); // Accessible
}
    
    innerFunction();
}

outerFunction();`,
                        runFunction: exampleRunners.runScopeExample
                    },
                    {
                        title: 'Block Scope vs Function Scope',
                        code: `// Function Scope (var)
function functionScopeExample() {
    if (true) {
        var functionScoped = "I'm function scoped";
}
    console.log(functionScoped); // Accessible outside block
}

// Block Scope (let/const)
function blockScopeExample() {
    if (true) {
        let blockScoped = "I'm block scoped";
        const alsoBlockScoped = "I'm also block scoped";
}
    // console.log(blockScoped); // ReferenceError!
    // console.log(alsoBlockScoped); // ReferenceError!
}

functionScopeExample();
blockScopeExample();`,
                        runFunction: null
                    },
                    {
                        title: 'Lexical Scope and Closures',
                        code: `function createCounter() {
    let count = 0; // Private variable due to lexical scope
    
    return {
        increment: function() {
            count++; // Access to outer scope
            return count;
        },
        decrement: function() {
            count--; // Access to outer scope
            return count;
        },
        getCount: function() {
            return count; // Access to outer scope
        }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// console.log(count); // ReferenceError! count is not accessible`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'event-loop',
                title: '8. Event Loop',
                icon: 'fa-sync',
                description: 'The event loop is what allows JavaScript to be non-blocking and asynchronous by offloading operations to the system kernel.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Event Loop Phases & Priority',
                        code: `console.log("1. Synchronous");

setTimeout(() => {
    console.log("2. setTimeout (Macrotask)");
}, 0);

Promise.resolve().then(() => {
    console.log("3. Promise (Microtask)");
});

console.log("6. Synchronous");

// Execution Order:
// 1. Synchronous
// 6. Synchronous
// 3. Promise (Microtask)
// 2. setTimeout (Macrotask)`,
                        runFunction: exampleRunners.runEventLoopExample
                    },
                    {
                        title: 'Call Stack, Web APIs, and Task Queue',
                        code: `console.log("Start");

setTimeout(() => {
    console.log("setTimeout 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
});

console.log("End");`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'promises',
                title: '9. Promises',
                icon: 'fa-handshake',
                description: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Promise Chain Example',
                        code: `function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id === 1) {
                resolve({ id: 1, name: "John Doe", email: "john@example.com" });
            } else {
                reject(new Error("User not found"));
            },
        }, 1000);
    });
}

fetchUser(1)
    .then(user => {
        console.log("User found:", user);
        return user.email;
    })
    .then(email => {
        console.log("User email:", email);
    })
    .catch(error => {
        console.error("Error:", error.message);
    });`,
                        runFunction: exampleRunners.runPromiseExample
                    }
                ]
            },
            {
                id: 'async-await',
                title: '10. Async/Await',
                icon: 'fa-clock',
                description: 'Async/await is syntactic sugar over Promises, making asynchronous code look and behave more like synchronous code.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Async/Await Example',
                        code: `async function fetchUserData(id) {
    try {
        console.log("Fetching user data...");
        
        const user = await fetchUser(id);
        console.log("User:", user);
        
        const posts = await fetchUserPosts(user.id);
        console.log("Posts:", posts);
        
        return { user, posts };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
}
}

// Usage
fetchUserData(1)
    .then(data => console.log("Complete data:", data))
    .catch(error => console.error("Failed:", error));`,
                        runFunction: exampleRunners.runAsyncAwaitExample
                    }
                ]
            },
            {
                id: 'arrow-functions',
                title: '11. Arrow Functions',
                icon: 'fa-arrow-right',
                description: 'Arrow functions provide a concise syntax for writing functions and handle `this` binding differently.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Arrow Function Syntax',
                        code: `// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function - single expression (implicit return)
const add = (a, b) => a + b;

// Arrow function - multiple statements
const multiply = (a, b) => {
    const result = a * b;
    return result;
};

// Single parameter (no parentheses needed)
const square = x => x * x;

// No parameters
const greet = () => console.log('Hello!');

// Returning object literal
const createUser = (name, age) => ({ name, age });

// Array methods with arrow functions
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);`,
                        runFunction: null
                    },
                    {
                        title: 'Arrow Functions and this Binding',
                        code: `// Regular function - this is dynamic
const person = {
    name: 'John',
    greet: function() {
        setTimeout(function() {
            console.log(this.name); // undefined (this is window/global)
        }, 100);
}
};

// Arrow function - this is lexical (from enclosing scope)
const person2 = {
    name: 'John',
    greet: function() {
        setTimeout(() => {
            console.log(this.name); // "John" (this is person2)
        }, 100);
}
};

// Cannot use arrow functions as constructors
const Person = (name) => {
    this.name = name; // Error: arrow functions can't be constructors
};

// Regular function works
function Person(name) {
    this.name = name;
}`,
                        runFunction: null,
                        note: 'Arrow functions are great for callbacks but cannot be used as constructors and don\'t have their own this binding.'
                    }
                ]
            },
            {
                id: 'destructuring',
                title: '12. Destructuring & Spread Operator',
                icon: 'fa-brackets-curly',
                description: 'ES6 features for extracting values from arrays/objects and spreading values.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Array Destructuring',
                        code: `// Basic destructuring
const numbers = [1, 2, 3];
const [first, second, third] = numbers;
console.log(first, second, third); // 1 2 3

// Skip elements
const [a, , c] = numbers;
console.log(a, c); // 1 3

// Default values
const [x, y, z = 10] = [1, 2];
console.log(z); // 10

// Rest operator
const [firstNum, ...rest] = [1, 2, 3, 4, 5];
console.log(firstNum); // 1
console.log(rest); // [2, 3, 4, 5]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1`,
                        runFunction: null
                    },
                    {
                        title: 'Object Destructuring',
                        code: `// Basic destructuring
const person = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = person;
console.log(name, age); // John 30

// Renaming variables
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // John 30

// Default values
const { name, age, country = 'USA' } = person;
console.log(country); // USA

// Nested destructuring
const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'NYC'
}
};
const { address: { city } } = user;
console.log(city); // NYC

// Function parameters
function greet({ name, age }) {
    return \`Hello, I'm \${name}, \${age} years old\`;
}
greet(person); // "Hello, I'm John, 30 years old"`,
                        runFunction: null
                    },
                    {
                        title: 'Spread Operator',
                        code: `// Spread in arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1]; // [1, 2, 3]

// Spread in objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Function arguments
function sum(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
sum(...numbers); // 6

// Rest parameters (opposite of spread)
function multiply(multiplier, ...numbers) {
    return numbers.map(n => n * multiplier);
}
multiply(2, 1, 2, 3); // [2, 4, 6]`,
                        runFunction: null,
                        note: 'Spread operator creates shallow copies, so nested objects/arrays are still referenced.'
                    }
                ]
            },
            {
                id: 'array-methods',
                title: '13. Array Methods',
                icon: 'fa-list',
                description: 'Essential array methods: map, filter, reduce, and more for data transformation.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'map, filter, reduce',
                        code: `const numbers = [1, 2, 3, 4, 5];

// map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce - accumulate to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Chaining methods
const result = numbers
    .filter(n => n % 2 === 0)
    .map(n => n * 3)
    .reduce((acc, n) => acc + n, 0);
console.log(result); // 18 (2*3 + 4*3)`,
                        runFunction: null
                    },
                    {
                        title: 'More Array Methods',
                        code: `const users = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

// find - find first matching element
const user = users.find(u => u.age > 30);
console.log(user); // { name: 'Bob', age: 35 }

// findIndex - find index of first match
const index = users.findIndex(u => u.name === 'Jane');
console.log(index); // 1

// some - check if any element passes test
const hasAdult = users.some(u => u.age >= 18);
console.log(hasAdult); // true

// every - check if all elements pass test
const allAdults = users.every(u => u.age >= 18);
console.log(allAdults); // true

// includes - check if array contains value
const arr = [1, 2, 3];
console.log(arr.includes(2)); // true

// forEach - execute for each element (no return value)
users.forEach(user => console.log(user.name));`,
                        runFunction: null,
                        note: 'Array methods are fundamental for functional programming in JavaScript.'
                    }
                ]
            },
            {
                id: 'type-coercion',
                title: '14. Type Coercion & Equality',
                icon: 'fa-equals',
                description: 'Understanding JavaScript\'s type coercion, truthy/falsy values, and equality operators.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: '== vs === (Loose vs Strict Equality)',
                        code: `// == (loose equality) - performs type coercion
console.log(5 == "5");     // true (string converted to number)
console.log(true == 1);    // true (boolean converted to number)
console.log(null == undefined); // true
console.log(0 == false);   // true
console.log("" == false);  // true

// === (strict equality) - no type coercion
console.log(5 === "5");    // false (different types)
console.log(true === 1);   // false
console.log(null === undefined); // false
console.log(0 === false);  // false
console.log("" === false); // false

// Always use === unless you specifically need type coercion
if (age === 18) { } // Good
if (age == 18) { }  // Bad practice`,
                        runFunction: null
                    },
                    {
                        title: 'Truthy and Falsy Values',
                        code: `// Falsy values (evaluated as false)
false
0
-0
0n (BigInt zero)
"" (empty string)
null
undefined
NaN

// Everything else is truthy
if ("0") { console.log("truthy"); }        // truthy
if ([]) { console.log("truthy"); }         // truthy (empty array)
if ({}) { console.log("truthy"); }         // truthy (empty object)
if ("false") { console.log("truthy"); }    // truthy (non-empty string)

// Practical examples
function greet(name) {
    if (!name) {  // Checks for falsy values
        return "Hello, Guest!";
}
    return \`Hello, \${name}!\`;
}

// Short-circuit evaluation
const username = user.name || "Guest";
const count = items && items.length || 0;`,
                        runFunction: null
                    },
                    {
                        title: 'Type Coercion Examples',
                        code: `// String coercion
console.log("5" + 3);      // "53" (number to string)
console.log("5" - 3);      // 2 (string to number)
console.log("5" * "2");    // 10 (both to numbers)

// Boolean coercion
console.log(!!"hello");    // true
console.log(!!"");         // false
console.log(!!0);          // false
console.log(!!1);          // true

// Number coercion
console.log(Number("123"));    // 123
console.log(Number("abc"));    // NaN
console.log(parseInt("123px")); // 123
console.log(parseFloat("12.5")); // 12.5

// Explicit vs Implicit
// Implicit (can be confusing)
console.log("5" + 3);      // "53"
console.log(true + 1);     // 2

// Explicit (clear intent)
console.log(String(5) + String(3)); // "53"
console.log(Number(true) + 1);      // 2`,
                        runFunction: null,
                        note: 'Understanding type coercion prevents bugs. Prefer explicit conversions when needed.'
                    }
                ]
            },
            {
                id: 'error-handling',
                title: '15. Error Handling',
                icon: 'fa-exclamation-circle',
                description: 'Using try/catch/finally blocks and handling errors properly in JavaScript.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'try/catch/finally',
                        code: `// Basic error handling
try {
    // Code that might throw an error
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // Handle the error
    console.error('Error occurred:', error.message);
} finally {
    // Always executes (cleanup code)
    console.log('Cleanup code here');
}

// Throwing custom errors
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero is not allowed');
}
    return a / b;
}

try {
    const result = divide(10, 0);
} catch (error) {
    console.error(error.message); // "Division by zero is not allowed"
}

// Different error types
try {
    throw new TypeError('Type error');
} catch (error) {
    if (error instanceof TypeError) {
        console.log('Type error caught');
    } else if (error instanceof ReferenceError) {
        console.log('Reference error caught');
}
}`,
                        runFunction: null
                    },
                    {
                        title: 'Error Handling Best Practices',
                        code: `// Don't silently swallow errors
try {
    riskyOperation();
} catch (error) {
    // Bad: Silent failure
    // (nothing here)
    
    // Good: Log and handle
    console.error('Operation failed:', error);
    // Handle gracefully
}

// Use specific error types
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
}
}

function validateEmail(email) {
    if (!email.includes('@')) {
        throw new ValidationError('Invalid email format');
}
}

try {
    validateEmail('invalid-email');
} catch (error) {
    if (error instanceof ValidationError) {
        // Handle validation error specifically
        console.log('Please provide a valid email');
    } else {
        // Handle other errors
        throw error;
}
}

// Error handling in async code
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error; // Re-throw if needed
}
}`,
                        runFunction: null,
                        note: 'Always handle errors appropriately - log them, inform users, and prevent crashes.'
                    }
                ]
            },
            {
                id: 'modern-features',
                title: '16. Modern JavaScript Features',
                icon: 'fa-star',
                description: 'Optional chaining, nullish coalescing, and other modern ES6+ features.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Optional Chaining (?.)',
                        code: `// Safely access nested properties
const user = {
    name: 'John',
    address: {
        city: 'NYC'
}
};

// Without optional chaining (verbose)
const city = user && user.address && user.address.city;

// With optional chaining (clean)
const city = user?.address?.city;

// Works with methods
user?.getName?.();

// Works with array access
const firstItem = items?.[0];

// Practical example
function getUserCity(user) {
    return user?.address?.city ?? 'Unknown';
}

// Prevents errors when properties don't exist
const user = null;
console.log(user?.name); // undefined (no error)
console.log(user.name);  // TypeError: Cannot read property 'name' of null`,
                        runFunction: null
                    },
                    {
                        title: 'Nullish Coalescing (??)',
                        code: `// || returns right side for ANY falsy value
const value1 = 0 || 'default';      // 'default' (0 is falsy)
const value2 = '' || 'default';     // 'default' ('' is falsy)
const value3 = null || 'default';   // 'default'
const value4 = undefined || 'default'; // 'default'

// ?? only returns right side for null or undefined
const value1 = 0 ?? 'default';      // 0 (0 is not null/undefined)
const value2 = '' ?? 'default';     // '' (empty string is not null/undefined)
const value3 = null ?? 'default';   // 'default'
const value4 = undefined ?? 'default'; // 'default'

// Practical examples
const pageSize = userSettings.pageSize ?? 10;
const theme = userPreferences.theme ?? 'dark';

// Combined with optional chaining
const city = user?.address?.city ?? 'Unknown';
const count = items?.length ?? 0;`,
                        runFunction: null
                    },
                    {
                        title: 'Template Literals',
                        code: `// String interpolation
const name = 'John';
const age = 30;

// Old way (concatenation)
const message = 'Hello, ' + name + '! You are ' + age + ' years old.';

// Template literals (better)
const message = \`Hello, \${name}! You are \${age} years old.\`;

// Multi-line strings
const html = \`
<div>
    <h1>\${title}</h1>
    <p>\${content}</p>
</div>
\`;

// Expression evaluation
const a = 5, b = 10;
console.log(\`\${a} + \${b} = \${a + b}\`); // "5 + 10 = 15"

// Tagged templates (advanced)
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] ? \`<mark>\${values[i]}</mark>\` : '');
    }, '');
}

const name = 'John';
const result = highlight\`Hello, \${name}!\`;`,
                        runFunction: null,
                        note: 'Template literals make string formatting much cleaner and more readable.'
                    }
                ]
            },
            {
                id: 'shallow-deep-copy',
                title: '17. Shallow Copy & Deep Copy',
                icon: 'fa-copy',
                description: 'Understanding the difference between shallow and deep copying of objects and arrays in JavaScript.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Shallow Copy - The Problem',
                        code: `// Shallow copy methods
const original = {
    name: 'John',
    age: 30,
    address: {
        city: 'NYC',
        zip: '10001'
}
};

// Method 1: Spread operator
const shallowCopy1 = { ...original };

// Method 2: Object.assign()
const shallowCopy2 = Object.assign({}, original);

// Method 3: Array.slice() for arrays
const arr = [1, 2, [3, 4]];
const arrCopy = arr.slice();

// ⚠️ PROBLEM: Top-level properties are copied, but nested objects are REFERENCED
shallowCopy1.name = 'Jane';
console.log(original.name); // 'John' ✅ Independent

shallowCopy1.address.city = 'LA';
console.log(original.address.city); // 'LA' ❌ Shared reference!
console.log(shallowCopy2.address.city); // 'LA' ❌ Also affected!

// Same issue with arrays
arrCopy[0] = 99;
console.log(arr[0]); // 1 ✅ Independent

arrCopy[2][0] = 999;
console.log(arr[2][0]); // 999 ❌ Shared reference!`,
                        runFunction: exampleRunners.runShallowCopyExample,
                        note: 'Shallow copies only copy the first level. Nested objects/arrays still share references with the original.'
                    },
                    {
                        title: 'Deep Copy - Solutions',
                        code: `const original = {
    name: 'John',
    address: {
        city: 'NYC',
        zip: '10001'
}
    hobbies: ['reading', 'coding']
};

// Method 1: JSON.parse/JSON.stringify (Simple, but limited)
const deepCopy1 = JSON.parse(JSON.stringify(original));
deepCopy1.address.city = 'LA';
console.log(original.address.city); // 'NYC' ✅ Independent!

// ⚠️ Limitations of JSON method:
// - Loses functions, undefined, symbols
// - Loses Date objects (becomes strings)
// - Doesn't work with circular references

// Method 2: structuredClone() (Modern, recommended - ES2022)
const deepCopy2 = structuredClone(original);
deepCopy2.address.city = 'SF';
console.log(original.address.city); // 'NYC' ✅ Independent!

// ✅ structuredClone advantages:
// - Handles nested objects/arrays
// - Preserves Date objects, Maps, Sets
// - Handles circular references
// - Not available in older environments

// Method 3: Recursive function (Custom solution)
function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => deepCopy(item));
    if (typeof obj === 'object') {
        const copy = {};
        Object.keys(obj).forEach(key => {
            copy[key] = deepCopy(obj[key]);
        });
        return copy;
}
}

const deepCopy3 = deepCopy(original);
deepCopy3.address.city = 'Boston';
console.log(original.address.city); // 'NYC' ✅ Independent!

// Method 4: Libraries (Lodash)
// const deepCopy4 = _.cloneDeep(original);`,
                        runFunction: exampleRunners.runDeepCopyExample,
                        note: 'Deep copies create completely independent copies at all levels. Choose the method based on your needs and browser support.'
                    },
                    {
                        title: 'When to Use Each',
                        code: `// ✅ Use SHALLOW COPY when:
// - You only need to copy top-level properties
// - Performance matters (shallow is faster)
// - You want to preserve references to nested objects

const user = { name: 'John', preferences: sharedPreferences };
const userCopy = { ...user }; // Shallow copy is fine here

// ✅ Use DEEP COPY when:
// - You need to modify nested properties independently
// - You're creating snapshots/immutable updates
// - Working with complex nested data structures

const config = {
    api: { baseUrl: 'https://api.com', timeout: 5000 },
    features: { darkMode: true, notifications: false }
};

// Need independent copy to modify
const configCopy = structuredClone(config);
configCopy.api.baseUrl = 'https://new-api.com';
// original.config.api.baseUrl is unchanged ✅

// React/Redux pattern (immutability)
const newState = {
    ...state,
    user: {
        ...state.user,
        profile: {
            ...state.user.profile,
            name: 'New Name' // Deep update with shallow copies
        }
}
};`,
                        runFunction: null,
                        note: 'Shallow copy for simple cases, deep copy when you need complete independence. In React, often use shallow copy patterns with spread operator for immutability.'
                    }
                ]
            },
            {
                id: 'classes',
                title: '18. ES6 Classes',
                icon: 'fa-graduation-cap',
                description: 'Modern class syntax for object-oriented programming in JavaScript.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Class Syntax and Constructor',
                        code: `// Class declaration
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}, \${this.age} years old\`;
    }
}

const john = new Person('John', 30);
console.log(john.greet()); // "Hello, I'm John, 30 years old"

// Class expression
const Animal = class {
    constructor(name) {
        this.name = name;
    }
};

// Getters and Setters
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    get area() {
        return this.width * this.height;
    }
    
    set area(value) {
        this.width = Math.sqrt(value);
        this.height = Math.sqrt(value);
    }
}

const rect = new Rectangle(5, 10);
console.log(rect.area); // 50 (getter)
rect.area = 100; // setter`,
                        runFunction: null,
                        note: 'Classes are syntactic sugar over constructor functions. They make OOP more intuitive.'
                    },
                    {
                        title: 'Inheritance with extends and super',
                        code: `class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return \`\${this.name} makes a sound\`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        return \`\${this.name} barks!\`;
    }
    
    getInfo() {
        return \`\${this.name} is a \${this.breed}\`;
    }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak()); // "Buddy barks!"
console.log(dog.getInfo()); // "Buddy is a Golden Retriever"

// Static methods
class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
}

console.log(MathUtils.add(5, 3)); // 8 (called on class, not instance)`,
                        runFunction: null,
                        note: 'extends creates inheritance, super calls parent constructor/methods. Static methods belong to the class, not instances.'
                    },
                    {
                        title: 'Private Fields and Methods',
                        code: `class BankAccount {
    // Private field (ES2022)
    #balance = 0;
    
    // Private method
    #validateAmount(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
    }
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        this.#validateAmount(amount);
        this.#balance += amount;
        return this.#balance;
    }
    
    withdraw(amount) {
        this.#validateAmount(amount);
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        this.#balance -= amount;
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
}

const account = new BankAccount(100);
account.deposit(50);
// account.#balance; // ❌ SyntaxError: Private field
// account.#validateAmount(10); // ❌ SyntaxError`,
                        runFunction: null,
                        note: 'Private fields (#) and methods provide true encapsulation. They cannot be accessed outside the class.'
                    }
                ]
            },
            {
                id: 'modules',
                title: '19. ES6 Modules',
                icon: 'fa-box',
                description: 'Import and export syntax for modular JavaScript code organization.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Export and Import Basics',
                        code: `// math.js - Named exports
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export const PI = 3.14159;

// main.js - Import named exports
import { add, subtract, PI } from './math.js';
console.log(add(5, 3)); // 8
console.log(PI); // 3.14159

// Default export
// utils.js
export default function greet(name) {
    return \`Hello, \${name}!\`;
}

// main.js
import greet from './utils.js';
greet('John'); // "Hello, John!"

// Renaming imports
import { add as sum, subtract as diff } from './math.js';
import greet, { add } from './utils.js'; // default + named`,
                        runFunction: null,
                        note: 'Named exports allow multiple exports, default export is single. Use named for utilities, default for main functionality.'
                    },
                    {
                        title: 'Export Patterns and Re-exports',
                        code: `// Export at declaration
export const name = 'John';
export function sayHello() { }

// Export after declaration
const age = 30;
function sayGoodbye() { }
export { age, sayGoodbye };

// Rename on export
const firstName = 'John';
export { firstName as name };

// Re-export from another module
export { add, subtract } from './math.js';
export { default as Calculator } from './calculator.js';

// Namespace import
import * as math from './math.js';
math.add(5, 3);
math.PI;

// Dynamic import (async)
async function loadModule() {
    const module = await import('./math.js');
    console.log(module.add(5, 3));
}

// Conditional import
if (condition) {
    const utils = await import('./utils.js');
}`,
                        runFunction: null,
                        note: 'Modules create isolated scope. Dynamic imports allow code splitting and lazy loading.'
                    }
                ]
            },
            {
                id: 'set-map',
                title: '20. Set and Map',
                icon: 'fa-database',
                description: 'Modern data structures: Set for unique values, Map for key-value pairs.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Set - Unique Value Collection',
                        code: `// Create Set
const mySet = new Set([1, 2, 3, 3, 4, 4]);
console.log(mySet); // Set { 1, 2, 3, 4 } (duplicates removed)

// Add/delete values
mySet.add(5);
mySet.add(2); // No effect (already exists)
mySet.delete(3);
console.log(mySet.has(2)); // true

// Size and iteration
console.log(mySet.size); // 3
mySet.forEach(value => console.log(value));

// Convert to array
const arr = Array.from(mySet);
const arr2 = [...mySet]; // Spread operator

// Use cases
// Remove duplicates from array
const numbers = [1, 2, 2, 3, 3, 4];
const unique = [...new Set(numbers)]; // [1, 2, 3, 4]

// Track unique items
const visited = new Set();
visited.add('page1');
visited.add('page2');
if (!visited.has('page1')) {
    visited.add('page1');
}`,
                        runFunction: null,
                        note: 'Set stores unique values. Perfect for removing duplicates and tracking unique items.'
                    },
                    {
                        title: 'Map - Key-Value Collection',
                        code: `// Create Map
const myMap = new Map();
myMap.set('name', 'John');
myMap.set('age', 30);
myMap.set(1, 'one'); // Keys can be any type!

// Get values
console.log(myMap.get('name')); // 'John'
console.log(myMap.has('age')); // true
console.log(myMap.size); // 3

// Iteration
myMap.forEach((value, key) => {
    console.log(\`\${key}: \${value}\`);
});

for (const [key, value] of myMap) {
    console.log(key, value);
}

// Convert to array
const entries = [...myMap.entries()];
const keys = [...myMap.keys()];
const values = [...myMap.values()];

// vs Object
const obj = { name: 'John', age: 30 };
// Object keys are always strings
// Map keys can be any type
// Map has size property
// Map maintains insertion order
// Map is iterable`,
                        runFunction: null,
                        note: 'Map is better than Object for key-value pairs when you need any key type, size property, or guaranteed order.'
                    },
                    {
                        title: 'WeakSet and WeakMap',
                        code: `// WeakSet - Only stores objects, no iteration
const weakSet = new WeakSet();
const obj1 = { name: 'John' };
const obj2 = { name: 'Jane' };

weakSet.add(obj1);
weakSet.add(obj2);
console.log(weakSet.has(obj1)); // true

// WeakMap - Keys must be objects
const weakMap = new WeakMap();
weakMap.set(obj1, 'data1');
weakMap.set(obj2, 'data2');
console.log(weakMap.get(obj1)); // 'data1'

// Key differences from Set/Map:
// - Keys must be objects
// - No iteration methods
// - No size property
// - Weak references (garbage collected if no other references)

// Use case: Private data storage
const privateData = new WeakMap();
class Person {
    constructor(name) {
        privateData.set(this, { name });
    }
    getName() {
        return privateData.get(this).name;
    }
}`,
                        runFunction: null,
                        note: 'WeakSet/WeakMap use weak references, allowing garbage collection. Useful for private data and metadata.'
                    }
                ]
            },
            {
                id: 'regex',
                title: '21. Regular Expressions',
                icon: 'fa-search',
                description: 'Pattern matching with regular expressions for string manipulation and validation.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Regex Basics and Patterns',
                        code: `// Create regex
const regex1 = /pattern/;
const regex2 = new RegExp('pattern');

// Test if pattern matches
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log(emailRegex.test('john@example.com')); // true
console.log(emailRegex.test('invalid-email')); // false

// Common patterns
const patterns = {
    digits: /\\d+/,           // One or more digits
    word: /\\w+/,             // Word characters
    whitespace: /\\s+/,       // Whitespace
    email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    phone: /^\\+?[1-9]\\d{1,14}$/,
    url: /^https?:\\/\\/.+/
};

// Flags
const globalRegex = /pattern/g;  // Global (all matches)
const caseInsensitive = /pattern/i; // Case insensitive
const multiline = /pattern/m;    // Multiline`,
                        runFunction: null,
                        note: 'Regular expressions are powerful for pattern matching. Start simple and build complexity.'
                    },
                    {
                        title: 'String Methods with Regex',
                        code: `const text = 'Hello World, hello JavaScript';

// match() - Find matches
const matches = text.match(/hello/gi); // ['Hello', 'hello']
console.log(matches);

// search() - Find index
const index = text.search(/world/i); // 6
console.log(index);

// replace() - Replace matches
const replaced = text.replace(/hello/gi, 'Hi');
console.log(replaced); // "Hi World, Hi JavaScript"

// Replace with function
const result = text.replace(/\\w+/g, (match) => {
    return match.toUpperCase();
});
console.log(result); // "HELLO WORLD, HELLO JAVASCRIPT"

// split() - Split by pattern
const words = text.split(/\\s+/); // Split by whitespace
console.log(words); // ['Hello', 'World,', 'hello', 'JavaScript']

// Practical examples
// Extract email from text
const emailText = 'Contact us at support@example.com or sales@example.com';
const emails = emailText.match(/[^\\s@]+@[^\\s@]+\\.[^\\s@]+/g);
console.log(emails); // ['support@example.com', 'sales@example.com']

// Remove HTML tags
const html = '<p>Hello <strong>World</strong></p>';
const clean = html.replace(/<[^>]+>/g, '');
console.log(clean); // "Hello World"`,
                        runFunction: null,
                        note: 'String methods with regex are essential for text processing, validation, and data extraction.'
                    }
                ]
            },
            {
                id: 'json',
                title: '22. JSON',
                icon: 'fa-file-code',
                description: 'Working with JSON data format: stringify, parse, and common patterns.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'JSON.stringify() and JSON.parse()',
                        code: `const person = {
    name: 'John',
    age: 30,
    city: 'NYC',
    hobbies: ['reading', 'coding'],
    address: {
        street: '123 Main St',
        zip: '10001'
    }
};

// Convert object to JSON string
const jsonString = JSON.stringify(person);
console.log(jsonString);
// '{"name":"John","age":30,"city":"NYC","hobbies":["reading","coding"],"address":{"street":"123 Main St","zip":"10001"}}'

// Parse JSON string to object
const parsed = JSON.parse(jsonString);
console.log(parsed.name); // 'John'

// Pretty print (indented)
const pretty = JSON.stringify(person, null, 2);
console.log(pretty);

// Replacer function (filter properties)
const filtered = JSON.stringify(person, ['name', 'age']);
console.log(filtered); // '{"name":"John","age":30}'

// Replacer function (custom logic)
const custom = JSON.stringify(person, (key, value) => {
    if (key === 'age') return undefined; // Exclude age
    return value;
});`,
                        runFunction: null,
                        note: 'JSON is the standard data format for APIs. stringify converts to string, parse converts back to object.'
                    },
                    {
                        title: 'JSON Limitations and Common Pitfalls',
                        code: `// ❌ JSON doesn't support:
const obj = {
    name: 'John',
    date: new Date(),        // Becomes string
    func: function() {},     // Omitted
    undefined: undefined,    // Omitted
    symbol: Symbol('id'),    // Omitted
    infinity: Infinity,      // Becomes null
    nan: NaN                 // Becomes null
};

const json = JSON.stringify(obj);
console.log(json);
// '{"name":"John","date":"2024-01-01T00:00:00.000Z"}'

// ✅ Custom serialization with toJSON
const customObj = {
    name: 'John',
    date: new Date(),
    toJSON() {
        return {
            name: this.name,
            date: this.date.toISOString()
        };
    }
};

// ✅ Reviver function for parsing
const jsonStr = '{"name":"John","date":"2024-01-01T00:00:00.000Z"}';
const parsed = JSON.parse(jsonStr, (key, value) => {
    if (key === 'date') {
        return new Date(value);
    }
    return value;
});

// Common error: Circular references
const a = { name: 'A' };
const b = { name: 'B' };
a.ref = b;
b.ref = a;
// JSON.stringify(a); // ❌ TypeError: Converting circular structure`,
                        runFunction: null,
                        note: 'JSON has limitations: no functions, undefined, symbols, or circular references. Use custom serialization when needed.'
                    }
                ]
            },
            {
                id: 'iterators',
                title: '23. Iterators and Iterables',
                icon: 'fa-repeat',
                description: 'Understanding iterables, iterators, and the for...of loop.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'for...of Loop and Iterables',
                        code: `// Arrays are iterable
const arr = [1, 2, 3];
for (const value of arr) {
    console.log(value); // 1, 2, 3
}

// Strings are iterable
const str = 'Hello';
for (const char of str) {
    console.log(char); // H, e, l, l, o
}

// Maps and Sets are iterable
const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map) {
    console.log(key, value); // a 1, b 2
}

// vs for...in (iterates over keys)
const obj = { a: 1, b: 2 };
for (const key in obj) {
    console.log(key); // a, b
}

// for...of with entries, keys, values
for (const [index, value] of arr.entries()) {
    console.log(index, value);
}

for (const key of Object.keys(obj)) {
    console.log(key);
}`,
                        runFunction: null,
                        note: 'for...of works with iterables (arrays, strings, Maps, Sets). for...in works with object keys.'
                    },
                    {
                        title: 'Custom Iterators',
                        code: `// Make object iterable
const range = {
    start: 1,
    end: 5,
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Generator function (simpler way)
function* rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

for (const num of rangeGenerator(1, 5)) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Spread operator works with iterables
const numbers = [...rangeGenerator(1, 5)];
console.log(numbers); // [1, 2, 3, 4, 5]`,
                        runFunction: null,
                        note: 'Symbol.iterator makes objects iterable. Generator functions provide a simpler way to create iterators.'
                    }
                ]
            },
            {
                id: 'rest-parameters',
                title: '24. Rest Parameters',
                icon: 'fa-ellipsis-h',
                description: 'Rest parameters for handling variable number of function arguments.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Rest Parameters vs Arguments',
                        code: `// Old way: arguments object
function oldSum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
oldSum(1, 2, 3, 4); // 10

// New way: Rest parameters
function newSum(...numbers) {
    return numbers.reduce((acc, n) => acc + n, 0);
}
newSum(1, 2, 3, 4); // 10

// Rest must be last parameter
function multiply(multiplier, ...numbers) {
    return numbers.map(n => n * multiplier);
}
multiply(2, 1, 2, 3); // [2, 4, 6]

// vs Spread operator (opposite)
const arr = [1, 2, 3];
function sum(a, b, c) {
    return a + b + c;
}
sum(...arr); // 6 (spread: array → arguments)
sum(1, 2, 3); // 6

function collect(...args) {
    return args; // rest: arguments → array
}
collect(1, 2, 3); // [1, 2, 3]`,
                        runFunction: null,
                        note: 'Rest parameters collect arguments into an array. Must be the last parameter. Opposite of spread operator.'
                    },
                    {
                        title: 'Practical Use Cases',
                        code: `// Flexible function parameters
function createUser(name, email, ...tags) {
    return {
        name,
        email,
        tags // All remaining arguments
    };
}
createUser('John', 'john@example.com', 'admin', 'premium', 'verified');

// Combining arrays
function combine(...arrays) {
    return arrays.flat();
}
combine([1, 2], [3, 4], [5, 6]); // [1, 2, 3, 4, 5, 6]

// Logging with variable arguments
function log(...messages) {
    const timestamp = new Date().toISOString();
    console.log(\`[\${timestamp}]\`, ...messages);
}
log('User logged in', 'Session ID: 123');

// Math operations
function max(...numbers) {
    return Math.max(...numbers);
}
max(5, 10, 3, 8); // 10`,
                        runFunction: null,
                        note: 'Rest parameters make functions flexible and allow handling variable numbers of arguments elegantly.'
                    }
                ]
            },
            {
                id: 'strict-mode',
                title: '25. Strict Mode',
                icon: 'fa-shield-alt',
                description: 'Using strict mode for safer JavaScript code and best practices.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Enabling Strict Mode',
                        code: `// File-level strict mode
'use strict';

// Function-level strict mode
function strictFunction() {
    'use strict';
    // Strict mode applies only to this function
}

// In modules and classes, strict mode is automatic
// ES6 modules are always in strict mode

// What strict mode does:
// 1. Prevents accidental global variables
function test() {
    'use strict';
    undeclaredVar = 10; // ❌ ReferenceError
}

// 2. Prevents deleting undeletable properties
'use strict';
delete Object.prototype; // ❌ TypeError

// 3. Requires unique parameter names
function duplicate(a, a) { // ❌ SyntaxError
    'use strict';
}

// 4. this is undefined in functions (not window/global)
function testThis() {
    'use strict';
    console.log(this); // undefined (not window)
}
testThis();`,
                        runFunction: null,
                        note: 'Strict mode catches common errors and prevents unsafe operations. Always use it in modern JavaScript.'
                    },
                    {
                        title: 'Strict Mode Benefits',
                        code: `'use strict';

// ✅ Catches typos
let userName = 'John';
// userNam = 'Jane'; // ❌ ReferenceError (catches typo)

// ✅ Prevents octal literals
// const num = 0123; // ❌ SyntaxError (octal not allowed)

// ✅ Prevents with statement
// with (obj) { } // ❌ SyntaxError

// ✅ eval() doesn't leak variables
eval('var x = 10;');
// console.log(x); // ❌ ReferenceError (in strict mode)

// ✅ Immutable bindings
const obj = {};
Object.defineProperty(obj, 'prop', {
    value: 42,
    writable: false
});
// obj.prop = 100; // ❌ TypeError (in strict mode)

// Best practice: Use strict mode everywhere
// Modern JavaScript (ES6+) uses strict mode by default in:
// - ES6 modules
// - ES6 classes
// - Arrow functions (inherit from enclosing scope)`,
                        runFunction: null,
                        note: 'Strict mode helps write safer code by catching errors early. Modern JavaScript uses it by default in modules and classes.'
                    }
                ]
            }
        ]
    }
