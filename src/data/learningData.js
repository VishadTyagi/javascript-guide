import { exampleRunners } from '../utils/exampleRunners'

export const learningData = {
    'core-js': {
        id: 'core-js',
        title: 'Core JavaScript',
        description: 'Master the fundamentals of JavaScript programming',
        emoji: '🔧',
        cards: [
            {
                id: 'closures',
                title: '1. Closures',
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
                title: '2. Hoisting',
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
                title: '3. Scope',
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
                title: '4. Event Loop',
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
                title: '5. Promises',
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
            }
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
                title: '6. Async/Await',
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
                title: '7. Arrow Functions',
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
                title: '8. Destructuring & Spread Operator',
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
                title: '9. Array Methods',
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
                title: '10. Type Coercion & Equality',
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
                title: '11. Error Handling',
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
                title: '12. Modern JavaScript Features',
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
                title: '13. Shallow Copy & Deep Copy',
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
    },
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
            }
        ]
    },
    'advanced-js': {
        id: 'advanced-js',
        title: 'Advanced JavaScript',
        description: 'Deep dive into advanced JavaScript concepts',
        emoji: '🚀',
        cards: [
            {
                id: 'prototypes',
                title: '1. Prototype, this, and Object Inheritance',
                icon: 'fa-cogs',
                description: 'Understanding JavaScript\'s prototype-based inheritance and the \`this\` keyword.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Understanding Prototypes and the Prototype Chain',
                        code: `// Every object in JavaScript has a prototype (except Object.prototype)
// Constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Methods on prototype are shared by all instances (memory efficient)
Person.prototype.greet = function() {
    return \`Hello, I'm \${this.name} and I'm \${this.age} years old\`;
};

// Creating instances
const john = new Person("John", 30);
console.log(john.greet()); // "Hello, I'm John and I'm 30 years old"

// Prototype chain lookup
console.log(john.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true`,
                        runFunction: exampleRunners.runPrototypeChainExample
                    },
                    {
                        title: 'The \`this\` Keyword - Context Binding',
                        code: `// \`this\` refers to the object that calls the function, NOT where it's defined

const person = {
    name: "John",
    greet: function() {
        return \`Hello, I'm \${this.name}\`;
    },
    greetArrow: () => {
        // Arrow functions don't have their own \`this\`
        return \`Hello, I'm \${this.name}\`; // \`this\` is undefined or window
    }
};

console.log(person.greet()); // "Hello, I'm John"

// \`this\` can change when function is called differently
const greetFunction = person.greet;
console.log(greetFunction()); // "Hello, I'm undefined" (this is window/global)`,
                        runFunction: exampleRunners.runThisKeywordExample
                    },
                    {
                        title: 'call, apply, and bind Methods',
                        code: `function introduce(greeting, punctuation) {
    return \`\${greeting}, I'm \${this.name}\${punctuation}\`;
}

const person1 = { name: "John" };

// call: Invokes function with explicit \`this\` and comma-separated arguments
console.log(introduce.call(person1, "Hi", "!")); // "Hi, I'm John!"

// apply: Invokes function with explicit \`this\` and array of arguments
console.log(introduce.apply(person1, ["Hello", "."])); // "Hello, I'm John."

// bind: Returns a new function with \`this\` permanently bound
const introduceJohn = introduce.bind(person1);
console.log(introduceJohn("Hey", "!!")); // "Hey, I'm John!!"`,
                        runFunction: exampleRunners.runCallApplyBindExample
                    },
                    {
                        title: 'Prototype-Based Inheritance',
                        code: `// Parent constructor
function Animal(name, species) {
    this.name = name;
    this.species = species;
}

Animal.prototype.eat = function() {
    return \`\${this.name} is eating\`;
};

// Child constructor
function Dog(name, breed) {
    Animal.call(this, name, "Canine");
    this.breed = breed;
}

// Inherit from Animal prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.bark = function() {
    return \`\${this.name} says Woof!\`;
};

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.bark()); // "Buddy says Woof!"
console.log(myDog.eat()); // "Buddy is eating"`,
                        runFunction: exampleRunners.runInheritanceExample
                    },
                    {
                        title: 'ES6 Classes (Syntactic Sugar for Prototypes)',
                        code: `class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    eat() {
        return \`\${this.name} is eating\`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canine");
        this.breed = breed;
    }
    
    bark() {
        return \`\${this.name} says Woof!\`;
    }
}

const myDog = new Dog("Buddy", "Golden Retriever");
console.log(myDog.bark()); // "Buddy says Woof!"
console.log(myDog.eat()); // "Buddy is eating"`,
                        runFunction: exampleRunners.runClassExample
                    },
                    {
                        title: 'Object.create() for Prototype Linking',
                        code: `const animalPrototype = {
    init(name, species) {
        this.name = name;
        this.species = species;
        return this;
    },
    eat() {
        return \`\${this.name} is eating\`;
    }
};

const dogPrototype = Object.create(animalPrototype);
dogPrototype.bark = function() {
    return \`\${this.name} says Woof!\`;
};

function createDog(name, breed) {
    const dog = Object.create(dogPrototype);
    dog.init(name, "Canine");
    dog.breed = breed;
    return dog;
}

const myDog = createDog("Buddy", "Golden Retriever");
console.log(myDog.bark()); // "Buddy says Woof!"
console.log(myDog.eat()); // "Buddy is eating"`,
                        runFunction: exampleRunners.runObjectCreateExample
                    }
                ]
            },
            {
                id: 'generators',
                title: '2. Generators and Iterators',
                icon: 'fa-infinity',
                description: 'Understanding generator functions and iterators for lazy evaluation and async patterns.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Basic Generator Functions',
                        code: `// Generator function
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Using for...of with generators
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5`,
                        runFunction: null,
                        note: 'Generators allow lazy evaluation and can be paused and resumed, making them perfect for infinite sequences.'
                    },
                    {
                        title: 'Async Generators for Data Streaming',
                        code: `// Async generator for fetching paginated data
async function* fetchPages(url) {
    let page = 1;
    while (true) {
        const response = await fetch(\`\${url}?page=\${page}\`);
        const data = await response.json();
        
        if (data.length === 0) {
            break;
        }
        
        yield data;
        page++;
    }
}

// Usage
(async () => {
    const pages = fetchPages('/api/users');
    for await (const page of pages) {
        console.log('Page data:', page);
        // Process each page as it arrives
    }
})();`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'proxy-reflect',
                title: '3. Proxy and Reflect API',
                icon: 'fa-shield-alt',
                description: 'Using Proxy and Reflect for advanced metaprogramming and interception of object operations.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Basic Proxy Usage',
                        code: `// Proxy allows interception of object operations
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        }
        return \`Property \${prop} doesn't exist\`;
    },
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
};

const person = new Proxy({ name: 'John' }, handler);
console.log(person.name); // "John"
console.log(person.age); // "Property age doesn't exist"
person.age = 30;
console.log(person.age); // 30

// person.age = "thirty"; // TypeError: Age must be a number`,
                        runFunction: null
                    },
                    {
                        title: 'Proxy for Validation and Logging',
                        code: `// Validation proxy
const validator = {
    set(target, prop, value) {
        if (prop === 'email' && !value.includes('@')) {
            throw new Error('Invalid email');
        }
        if (prop === 'age' && (value < 0 || value > 150)) {
            throw new Error('Invalid age');
        }
        console.log(\`Setting \${prop} = \${value}\`);
        target[prop] = value;
        return true;
    },
    get(target, prop) {
        console.log(\`Getting \${prop}\`);
        return target[prop];
    }
};

const user = new Proxy({}, validator);
user.name = 'John'; // Setting name = John
user.email = 'john@example.com'; // Setting email = john@example.com
console.log(user.name); // Getting name, then "John"`,
                        runFunction: null,
                        note: 'Proxies are powerful for creating reactive systems, validation layers, and debugging tools.'
                    }
                ]
            },
            {
                id: 'symbols',
                title: '4. Symbols and Unique Identifiers',
                icon: 'fa-key',
                description: 'Understanding Symbols for creating unique property keys and metadata in JavaScript.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Symbol Basics',
                        code: `// Symbols are unique and immutable primitive values
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false - each Symbol is unique

// Using Symbols as property keys
const user = {
    name: 'John',
    [sym1]: 'hidden value'
};

console.log(user[sym1]); // 'hidden value'
console.log(Object.keys(user)); // ['name'] - Symbols are not enumerable

// Well-known Symbols (used by JavaScript internally)
const iterable = {
    data: [1, 2, 3],
    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.data.length) {
                    return { value: this.data[index++], done: false };
                }
                return { done: true };
            }
        };
    }
};

for (const item of iterable) {
    console.log(item); // 1, 2, 3
}`,
                        runFunction: null,
                        note: 'Symbols are perfect for creating unique identifiers and hiding implementation details.'
                    },
                    {
                        title: 'Symbol.for() and Global Symbol Registry',
                        code: `// Symbol.for() creates or retrieves a symbol from global registry
const globalSym1 = Symbol.for('app.id');
const globalSym2 = Symbol.for('app.id');
console.log(globalSym1 === globalSym2); // true - same symbol

// Symbol.keyFor() retrieves the key of a global symbol
console.log(Symbol.keyFor(globalSym1)); // 'app.id'

// Use case: Creating "constants" that are truly unique
const ITEM_ADDED = Symbol('item.added');
const ITEM_REMOVED = Symbol('item.removed');

function handleEvent(eventType, data) {
    switch (eventType) {
        case ITEM_ADDED:
            console.log('Item added:', data);
            break;
        case ITEM_REMOVED:
            console.log('Item removed:', data);
            break;
    }
}

handleEvent(ITEM_ADDED, { id: 1 });`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'weakmap-weakset',
                title: '5. WeakMap and WeakSet',
                icon: 'fa-link',
                description: 'Understanding WeakMap and WeakSet for memory-efficient data structures with automatic garbage collection.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'WeakMap vs Map',
                        code: `// Regular Map holds strong references
const map = new Map();
let obj = { data: 'important' };
map.set(obj, 'metadata');

obj = null; // obj is still in memory because Map references it
// Garbage collector cannot remove obj

// WeakMap holds weak references
const weakMap = new WeakMap();
let obj2 = { data: 'important' };
weakMap.set(obj2, 'metadata');

obj2 = null; // obj2 can be garbage collected
// WeakMap doesn't prevent garbage collection

// Key differences:
// 1. WeakMap keys must be objects (not primitives)
// 2. WeakMap keys are not enumerable
// 3. WeakMap allows garbage collection when key is no longer referenced
// 4. WeakMap has no size property

const privateData = new WeakMap();

class User {
    constructor(name) {
        privateData.set(this, { name }); // Private data
    }
    
    getName() {
        return privateData.get(this).name;
    }
}

const user = new User('John');
console.log(user.getName()); // 'John'
// user.name is not directly accessible - truly private`,
                        runFunction: null,
                        note: 'Use WeakMap for private data, metadata, and caches that should be garbage collected.'
                    },
                    {
                        title: 'WeakSet Usage',
                        code: `// WeakSet holds weak references to objects
const processed = new WeakSet();

function processObject(obj) {
    if (processed.has(obj)) {
        console.log('Already processed');
        return;
    }
    
    // Process object
    console.log('Processing...', obj);
    processed.add(obj);
}

const obj1 = { id: 1 };
const obj2 = { id: 2 };

processObject(obj1); // Processing... { id: 1 }
processObject(obj1); // Already processed
processObject(obj2); // Processing... { id: 2 }

// When obj1 is garbage collected, it's automatically removed from WeakSet
obj1 = null;

// Use cases:
// - Tracking which objects have been processed
// - Preventing memory leaks in event listeners
// - Caching computed values tied to object lifetime`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'memory-management',
                title: '6. Memory Management & Performance',
                icon: 'fa-tachometer-alt',
                description: 'Understanding JavaScript memory management, garbage collection, and performance optimization techniques.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Garbage Collection and Memory Leaks',
                        code: `// Common memory leak patterns to avoid

// 1. Accidental global variables
function leak() {
    leakedVar = 'This creates a global'; // Missing var/let/const
    this.globalVar = 'This is also global'; // 'this' is window in non-strict
}

// 2. Closures holding references
function createLeak() {
    const largeData = new Array(1000000).fill('data');
    
    return function() {
        // Even though we only need one property, the entire array is kept in memory
        return largeData.length;
    };
}

// Fix: Only keep what you need
function createFixed() {
    const largeData = new Array(1000000).fill('data');
    const length = largeData.length;
    
    return function() {
        return length; // Only length is kept, not the entire array
    };
}

// 3. Event listeners not removed
const button = document.createElement('button');
button.addEventListener('click', function handler() {
    console.log('clicked');
});

// Remove when done:
// button.removeEventListener('click', handler);`,
                        runFunction: null,
                        note: 'Understanding garbage collection helps prevent memory leaks and improve application performance.'
                    },
                    {
                        title: 'Performance Optimization Techniques',
                        code: `// 1. Debouncing (limit function calls)
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const handleSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

// 2. Throttling (ensure function called at most once per period)
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const handleScroll = throttle(() => {
    console.log('Scrolled');
}, 100);

// 3. Memoization (cache function results)
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const expensiveFunction = memoize((n) => {
    // Expensive calculation
    return n * n;
});

// 4. Lazy loading
function createLazyArray(arr) {
    return {
        *[Symbol.iterator]() {
            for (const item of arr) {
                yield item; // Process items one at a time
            }
        }
    };
}`,
                        runFunction: null,
                        note: 'These patterns are essential for building performant JavaScript applications.'
                    }
                ]
            }
        ]
    },
    'react': {
        id: 'react',
        title: 'React.js & Frontend',
        description: 'Modern React patterns and best practices',
        emoji: '⚛️',
        cards: [
            {
                id: 'react-hooks',
                title: '1. React Hooks Deep Dive',
                icon: 'fa-react',
                description: 'Advanced React hooks including useMemo, useCallback, useReducer, and useRef.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'useMemo and useCallback Example',
                        code: `import React, { useState, useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
    const filteredItems = useMemo(() => {
        return items.filter(item => item.category === filter);
    }, [items, filter]);
    
    const handleClick = useCallback((id) => {
        console.log('Item clicked:', id);
    }, []);
    
    return (
        <div>
            {filteredItems.map(item => (
                <div key={item.id} onClick={() => handleClick(item.id)}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}`,
                        runFunction: exampleRunners.runReactExample
                    }
                ]
            },
            {
                id: 'context-api',
                title: '2. React Context API',
                icon: 'fa-layer-group',
                description: 'Using Context API for global state management without external libraries.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Context API Basics',
                        code: `// Create Context
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

// Context Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const login = (userData) => {
        setUser(userData);
    };
    
    const logout = () => {
        setUser(null);
    };
    
    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within UserProvider');
    }
    return context;
};

// Usage in App
function App() {
    return (
        <UserProvider>
            <Navbar />
            <Dashboard />
        </UserProvider>
    );
}

// Usage in Components
function Navbar() {
    const { user, logout } = useUser();
    
    return (
        <nav>
            {user ? (
                <div>
                    <span>Hello, {user.name}</span>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                <span>Please login</span>
            )}
        </nav>
    );
}`,
                        runFunction: null,
                        note: 'Context API is built into React and perfect for sharing state across components without prop drilling.'
                    },
                    {
                        title: 'Multiple Contexts Pattern',
                        code: `// Separate contexts for different concerns
const ThemeContext = createContext();
const AuthContext = createContext();

// Theme Provider
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Auth Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // ... auth logic
    
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// App with multiple providers
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Application />
            </AuthProvider>
        </ThemeProvider>
    );
}

// Custom hooks
export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'redux',
                title: '3. Redux State Management',
                icon: 'fa-boxes',
                description: 'Redux toolkit for predictable state management in React applications.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Redux Toolkit Setup',
                        code: `// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create slice
const counterSlice = createSlice({
    name: 'counter',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        }
    }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Configure store
export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer
    }
});

// In App.jsx
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
    return (
        <Provider store={store}>
            <Counter />
        </Provider>
    );
}

// In Component
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

function Counter() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    
    return (
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}`,
                        runFunction: null,
                        note: 'Redux Toolkit simplifies Redux and is the recommended way to use Redux today.'
                    },
                    {
                        title: 'Async Actions with Redux Thunk',
                        code: `// Async thunk for API calls
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Async thunk
export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const response = await fetch('/api/users');
        return response.json();
    }
);

// Slice with async reducer
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        items: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

// Usage in component
function UsersList() {
    const { items, loading, error } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return <div>{/* Render users */}</div>;
}`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'state-patterns',
                title: '4. State Management Patterns',
                icon: 'fa-sitemap',
                description: 'Best practices and patterns for state management in React applications.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'When to Use What',
                        code: `// Local State (useState) - Component-specific
function Counter() {
    const [count, setCount] = useState(0); // Only this component needs it
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Context API - Shared state across tree
// Use for: Theme, Auth, Language, etc.
const ThemeContext = createContext();
// Good for: Medium-sized apps, simple state

// Redux - Global state management
// Use for: Complex state, multiple reducers, time-travel debugging
// Good for: Large apps, complex state logic, team projects

// Zustand - Lightweight alternative
import create from 'zustand';

const useStore = create((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
}));

// Recoil - Facebook's state management
// Good for: Atomic state, derived state

// Decision Tree:
// 1. Can it be local? → useState
// 2. Shared across siblings? → Lift state up or Context
// 3. Complex logic/async? → Redux/Zustand
// 4. Very large app? → Redux`,
                        runFunction: null,
                        note: 'Choose the right tool for the job - start simple with useState, then Context, then Redux if needed.'
                    },
                    {
                        title: 'State Management Best Practices',
                        code: `// 1. Keep state as close to where it's used as possible
// Bad: Global state for local component state
const [isOpen, setIsOpen] = useGlobalState(); // Don't do this

// Good: Local state
const [isOpen, setIsOpen] = useState(false);

// 2. Normalize complex state
// Bad: Nested arrays/objects
state.users[0].posts[2].comments[1]

// Good: Normalized structure
state.users.byId[userId].posts.map(postId => state.posts.byId[postId])

// 3. Use selectors for derived state
const expensiveValue = useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);

// 4. Separate concerns
// Don't mix UI state with business logic
const [users, setUsers] = useState([]); // Business data
const [isLoading, setIsLoading] = useState(false); // UI state

// 5. Use reducers for complex state
function reducer(state, action) {
    switch (action.type) {
        case 'ADD_USER':
            return { ...state, users: [...state.users, action.payload] };
        case 'DELETE_USER':
            return { ...state, users: state.users.filter(u => u.id !== action.id) };
        default:
            return state;
    }
}`,
                        runFunction: null,
                        note: 'Follow these patterns to keep your state management clean, performant, and maintainable.'
                    }
                ]
            },
            {
                id: 'react-testing',
                title: '5. React Testing with Testing Library',
                icon: 'fa-flask',
                description: 'Testing React components with React Testing Library and best practices.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Component Testing',
                        code: `import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
    test('renders counter', () => {
        render(<Counter />);
        const countElement = screen.getByText(/count/i);
        expect(countElement).toBeInTheDocument();
    });
    
    test('increments count on button click', () => {
        render(<Counter />);
        const button = screen.getByRole('button', { name: /increment/i });
        const count = screen.getByText(/0/);
        
        fireEvent.click(button);
        expect(count).toHaveTextContent('1');
    });
    
    test('handles user input', () => {
        render(<LoginForm />);
        const input = screen.getByLabelText(/email/i);
        
        fireEvent.change(input, { target: { value: 'test@example.com' } });
        expect(input.value).toBe('test@example.com');
    });
});

// Query methods (preferred order):
screen.getByRole('button');           // Most accessible
screen.getByLabelText('Email');       // Form inputs
screen.getByPlaceholderText('Search'); // Placeholders
screen.getByText('Submit');           // Text content
screen.getByTestId('submit-btn');     // Last resort`,
                        runFunction: null,
                        note: 'React Testing Library encourages testing from user perspective, not implementation details.'
                    },
                    {
                        title: 'Testing with Context and Redux',
                        code: `// Testing with Context
import { render } from '@testing-library/react';
import { UserProvider } from './UserContext';

test('renders with context', () => {
    render(
        <UserProvider>
            <Component />
        </UserProvider>
    );
});

// Testing with Redux
import { Provider } from 'react-redux';
import { store } from './store';

test('renders with Redux store', () => {
    render(
        <Provider store={store}>
            <Component />
        </Provider>
    );
});

// Custom render helper
function renderWithProviders(ui, { store = createTestStore(), ...options } = {}) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <UserProvider>
                    {children}
                </UserProvider>
            </Provider>
        );
    }
    
    return render(ui, { wrapper: Wrapper, ...options });
}

// Usage
test('component works with providers', () => {
    renderWithProviders(<Component />);
});`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'testing-strategies',
                title: '6. Testing Strategies & Best Practices',
                icon: 'fa-check-double',
                description: 'Testing pyramid, coverage, and best practices for comprehensive React testing.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Testing Pyramid for React',
                        code: `// Testing Pyramid:
// 1. Unit Tests (70%) - Fast, isolated
// 2. Integration Tests (20%) - Component interactions
// 3. E2E Tests (10%) - Full user flows

// Unit Test Example
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
// Test: Pure function, no dependencies

// Integration Test Example
test('user can add item to cart', () => {
    // Tests multiple components working together
    render(<App />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(screen.getByText('Cart (1)')).toBeInTheDocument();
});

// E2E Test (Cypress example)
describe('E-commerce flow', () => {
    it('complete purchase', () => {
        cy.visit('/');
        cy.get('[data-cy=product]').first().click();
        cy.get('[data-cy=add-to-cart]').click();
        cy.get('[data-cy=checkout]').click();
        cy.get('[data-cy=complete-order]').click();
        cy.contains('Order confirmed');
    });
});`,
                        runFunction: null
                    },
                    {
                        title: 'Test Coverage & Best Practices',
                        code: `// Coverage Goals:
// - Aim for 80%+ coverage
// - Focus on critical business logic
// - Don't chase 100% (diminishing returns)

// Test Coverage Commands
// jest --coverage

// Best Practices:

// 1. Write tests first (TDD)
// Write failing test → Make it pass → Refactor

// 2. Test behavior, not implementation
// ❌ Bad: expect(component.state.count).toBe(1)
// ✅ Good: expect(screen.getByText('Count: 1')).toBeInTheDocument()

// 3. Keep tests isolated
// Each test should be independent

// 4. Use descriptive test names
test('should increment counter when increment button is clicked');

// 5. Arrange-Act-Assert pattern
test('user login flow', () => {
    // Arrange
    const email = 'user@example.com';
    const password = 'password123';
    
    // Act
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.click(screen.getByText('Login'));
    
    // Assert
    expect(screen.getByText('Welcome')).toBeInTheDocument();
});

// 6. Mock external dependencies
jest.mock('./api');

// 7. Test edge cases and error scenarios
test('handles API errors gracefully');`,
                        runFunction: null,
                        note: 'Good tests are maintainable, readable, and test user behavior, not implementation details.'
                    }
                ]
            }
        ]
    },
    'nodejs': {
        id: 'nodejs',
        title: 'Node.js Backend',
        description: 'Server-side JavaScript with Node.js',
        emoji: '🟢',
        cards: [
            {
                id: 'node-event-loop',
                title: '1. Node.js Event Loop',
                icon: 'fa-node-js',
                description: 'Understanding Node.js event loop and asynchronous operations.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Node.js Event Loop Execution Order',
                        code: `console.log('1. Start');

setImmediate(() => {
    console.log('2. setImmediate');
});

process.nextTick(() => {
    console.log('3. nextTick');
});

setTimeout(() => {
    console.log('4. setTimeout');
}, 0);

fs.readFile(__filename, () => {
    console.log('5. File read');
});

console.log('6. End');`,
                        runFunction: exampleRunners.runNodeExample
                    }
                ]
            },
            {
                id: 'express-basics',
                title: '2. Express.js Fundamentals',
                icon: 'fa-server',
                description: 'Building RESTful APIs with Express.js framework.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Basic Express Server',
                        code: `const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/users', (req, res) => {
    res.json({ users: ['John', 'Jane'] });
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
    res.status(201).json({ message: 'User created', name });
});

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    res.json({ message: 'User updated', id, name });
});

app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: 'User deleted', id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
                        runFunction: null,
                        note: 'Express is a minimal and flexible Node.js web framework for building APIs and web applications.'
                    },
                    {
                        title: 'Express Middleware',
                        code: `const express = require('express');
const app = express();

// Custom middleware
const logger = (req, res, next) => {
    console.log(\`\${req.method} \${req.path} - \${new Date().toISOString()}\`);
    next();
};

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    // Validate token...
    req.user = { id: 1, name: 'John' };
    next();
};

// Apply middleware
app.use(logger);
app.use(express.json());

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'async-patterns',
                title: '3. Async Patterns in Node.js',
                icon: 'fa-sync',
                description: 'Callback, Promise, and async/await patterns for handling asynchronous operations.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Callback Pattern',
                        code: `const fs = require('fs');

// Callback hell (nested callbacks)
fs.readFile('file1.txt', 'utf8', (err, data1) => {
    if (err) return console.error(err);
    fs.readFile('file2.txt', 'utf8', (err, data2) => {
        if (err) return console.error(err);
        fs.writeFile('output.txt', data1 + data2, (err) => {
            if (err) return console.error(err);
            console.log('Files merged');
        });
    });
});`,
                        runFunction: null
                    },
                    {
                        title: 'Promise Pattern',
                        code: `const fs = require('fs').promises;

// Promise-based approach
fs.readFile('file1.txt', 'utf8')
    .then(data1 => fs.readFile('file2.txt', 'utf8'))
    .then(data2 => fs.writeFile('output.txt', data1 + data2))
    .then(() => console.log('Files merged'))
    .catch(err => console.error(err));

// Or with Promise.all for parallel execution
Promise.all([
    fs.readFile('file1.txt', 'utf8'),
    fs.readFile('file2.txt', 'utf8')
])
.then(([data1, data2]) => fs.writeFile('output.txt', data1 + data2))
.catch(err => console.error(err));`,
                        runFunction: null
                    },
                    {
                        title: 'Async/Await Pattern',
                        code: `const fs = require('fs').promises;

// Modern async/await approach
async function mergeFiles() {
    try {
        const data1 = await fs.readFile('file1.txt', 'utf8');
        const data2 = await fs.readFile('file2.txt', 'utf8');
        await fs.writeFile('output.txt', data1 + data2);
        console.log('Files merged successfully');
    } catch (err) {
        console.error('Error:', err);
    }
}

// Parallel execution with async/await
async function mergeFilesParallel() {
    try {
        const [data1, data2] = await Promise.all([
            fs.readFile('file1.txt', 'utf8'),
            fs.readFile('file2.txt', 'utf8')
        ]);
        await fs.writeFile('output.txt', data1 + data2);
    } catch (err) {
        console.error('Error:', err);
    }
}`,
                        runFunction: null,
                        note: 'Async/await makes asynchronous code look synchronous and is easier to read and maintain.'
                    }
                ]
            },
            {
                id: 'error-handling',
                title: '4. Error Handling Best Practices',
                icon: 'fa-exclamation-triangle',
                description: 'Proper error handling patterns in Node.js applications.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Error Handling in Express',
                        code: `const express = require('express');
const app = express();

// Async route handler with error handling
app.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        next(error); // Pass to error handler
    }
});

// Custom error class
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Global error handler middleware
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
});`,
                        runFunction: null
                    },
                    {
                        title: 'Error Handling Utilities',
                        code: `// Async handler wrapper to catch errors
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage - no need for try/catch
app.get('/api/users/:id', asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    res.json(user);
}));

// Unhandled promise rejection handler
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Uncaught exception handler
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Shutting down...');
    console.error(err.name, err.message);
    process.exit(1);
});`,
                        runFunction: null,
                        note: 'Always handle errors at the appropriate level and provide meaningful error messages to users.'
                    }
                ]
            },
            {
                id: 'file-upload',
                title: '5. File Upload and Processing',
                icon: 'fa-upload',
                description: 'Handling file uploads with Multer and processing files in Node.js.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'File Upload with Multer',
                        code: `const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: fileFilter
});

// Single file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
    res.json({ 
        message: 'File uploaded successfully',
        file: req.file 
    });
});

// Multiple files
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
    res.json({ 
        message: 'Files uploaded',
        files: req.files 
    });
});`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'authentication',
                title: '6. Authentication & Authorization',
                icon: 'fa-lock',
                description: 'Implementing JWT-based authentication and authorization in Node.js.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'JWT Authentication Setup',
                        code: `const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });
};

// Register user
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await User.create({
        email,
        password: hashedPassword
    });
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
        success: true,
        token,
        user: {
            id: user._id,
            email: user.email
        }
    });
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = generateToken(user._id);
    res.json({ success: true, token });
});`,
                        runFunction: null
                    },
                    {
                        title: 'Protect Routes Middleware',
                        code: `// Protect middleware
const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({ error: 'Not authorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ error: 'User not found' });
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Not authorized' });
    }
};

// Role-based authorization
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Not authorized to access this route' 
            });
        }
        next();
    };
};

// Protected route
app.get('/api/users/me', protect, (req, res) => {
    res.json({ user: req.user });
});

// Admin only route
app.delete('/api/users/:id', protect, authorize('admin'), (req, res) => {
    // Delete user
});`,
                        runFunction: null,
                        note: 'Always hash passwords with bcrypt and use JWT tokens for stateless authentication.'
                    }
                ]
            },
            {
                id: 'testing',
                title: '7. Testing Node.js Applications',
                icon: 'fa-vial',
                description: 'Writing unit and integration tests with Jest and Supertest.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Unit Testing with Jest',
                        code: `// utils/helpers.test.js
const { calculateTotal, formatCurrency } = require('./helpers');

describe('Helper Functions', () => {
    test('calculateTotal should return sum of array', () => {
        expect(calculateTotal([1, 2, 3])).toBe(6);
        expect(calculateTotal([10, 20, 30])).toBe(60);
    });
    
    test('formatCurrency should format number correctly', () => {
        expect(formatCurrency(100)).toBe('$100.00');
        expect(formatCurrency(1234.56)).toBe('$1,234.56');
    });
});`,
                        runFunction: null
                    },
                    {
                        title: 'API Testing with Supertest',
                        code: `const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    test('GET /api/users should return all users', async () => {
        const response = await request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/);
        
        expect(response.body).toHaveProperty('users');
        expect(Array.isArray(response.body.users)).toBe(true);
    });
    
    test('POST /api/users should create new user', async () => {
        const newUser = {
            name: 'John Doe',
            email: 'john@example.com'
        };
        
        const response = await request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201);
        
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe(newUser.email);
    });
});`,
                        runFunction: null,
                        note: 'Write tests for both happy paths and error cases to ensure robust applications.'
                    }
                ]
            },
            {
                id: 'rest-fundamentals',
                title: '8. RESTful API Design',
                icon: 'fa-network-wired',
                description: 'Understanding REST principles, HTTP methods, status codes, and API design patterns.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'REST Principles and HTTP Methods',
                        code: `// RESTful API Design Principles

// GET - Retrieve resources
GET /api/users          // Get all users
GET /api/users/123      // Get user by ID

// POST - Create new resource
POST /api/users
Body: { name: "John", email: "john@example.com" }
Response: 201 Created

// PUT - Update entire resource
PUT /api/users/123
Body: { name: "John Doe", email: "john@example.com" }
Response: 200 OK

// PATCH - Partial update
PATCH /api/users/123
Body: { email: "newemail@example.com" }
Response: 200 OK

// DELETE - Remove resource
DELETE /api/users/123
Response: 204 No Content

// HTTP Status Codes
200 OK              // Success
201 Created         // Resource created
204 No Content      // Success, no body
400 Bad Request     // Client error
401 Unauthorized    // Authentication required
403 Forbidden       // Not authorized
404 Not Found       // Resource not found
500 Internal Server Error`,
                        runFunction: null,
                        note: 'REST APIs should be stateless, use proper HTTP methods, and return appropriate status codes.'
                    },
                    {
                        title: 'RESTful Route Design',
                        code: `// Good RESTful routes
GET    /api/users              // List all users
GET    /api/users/:id          // Get specific user
POST   /api/users              // Create user
PUT    /api/users/:id          // Update entire user
PATCH  /api/users/:id          // Partial update
DELETE /api/users/:id          // Delete user

// Nested resources
GET    /api/users/:userId/posts        // Get user's posts
POST   /api/users/:userId/posts        // Create post for user
GET    /api/users/:userId/posts/:id    // Get specific post

// Query parameters for filtering, sorting, pagination
GET /api/users?page=1&limit=10&sort=name&order=asc
GET /api/users?age=25&city=NYC
GET /api/products?category=electronics&price_min=100

// Response format (consistent structure)
{
    "success": true,
    "data": [...],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 100
    }
}`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'api-validation',
                title: '9. API Validation & Middleware',
                icon: 'fa-shield-alt',
                description: 'Input validation, request validation, and middleware patterns for Express APIs.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Request Validation',
                        code: `// Using express-validator
const { body, param, query, validationResult } = require('express-validator');

// Validation rules
const validateUser = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be 2-50 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email required'),
    body('age')
        .optional()
        .isInt({ min: 0, max: 150 })
        .withMessage('Age must be 0-150')
];

// Validation middleware
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Usage
app.post('/api/users', validateUser, handleValidation, (req, res) => {
    // Process validated request
    res.status(201).json({ success: true, data: req.body });
});`,
                        runFunction: null
                    },
                    {
                        title: 'API Middleware Pattern',
                        code: `// Authentication middleware
const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token required' });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Role-based authorization
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                error: 'Access denied' 
            });
        }
        next();
    };
};

// Usage
app.get('/api/admin/users', authenticate, authorize('admin'), (req, res) => {
    // Only admins can access
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};`,
                        runFunction: null,
                        note: 'Middleware provides reusable functionality like authentication, validation, and error handling.'
                    }
                ]
            },
            {
                id: 'api-pagination',
                title: '10. Pagination, Filtering & Sorting',
                icon: 'fa-filter',
                description: 'Implementing pagination, filtering, and sorting in REST APIs.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Pagination Implementation',
                        code: `// Pagination middleware
const paginate = (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const results = {};
        
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }
        
        try {
            results.results = await model.find()
                .limit(limit)
                .skip(startIndex)
                .exec();
            
            results.total = await model.countDocuments();
            results.totalPages = Math.ceil(results.total / limit);
            results.currentPage = page;
            
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

// Usage
app.get('/api/users', paginate(User), (req, res) => {
    res.json(res.paginatedResults);
});`,
                        runFunction: null
                    },
                    {
                        title: 'Filtering and Sorting',
                        code: `// Advanced filtering and sorting
app.get('/api/users', async (req, res) => {
    const { sort, fields, limit = 10, page = 1, ...filters } = req.query;
    
    // Build query
    let query = User.find();
    
    // Filtering
    Object.keys(filters).forEach(key => {
        if (key.includes('_gte')) {
            const field = key.replace('_gte', '');
            query = query.where(field).gte(filters[key]);
        } else if (key.includes('_lte')) {
            const field = key.replace('_lte', '');
            query = query.where(field).lte(filters[key]);
        } else {
            query = query.where(key).equals(filters[key]);
        }
    });
    
    // Sorting
    if (sort) {
        const sortBy = sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt'); // Default sort
    }
    
    // Field selection
    if (fields) {
        const selectedFields = fields.split(',').join(' ');
        query = query.select(selectedFields);
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    
    const users = await query;
    res.json({ success: true, data: users });
});

// Usage examples:
// GET /api/users?age_gte=18&city=NYC&sort=name,-age&fields=name,email&page=1&limit=10`,
                        runFunction: null,
                        note: 'Pagination, filtering, and sorting make APIs more efficient and user-friendly.'
                    }
                ]
            }
        ]
    },
    'databases': {
        id: 'databases',
        title: 'Databases',
        description: 'Database design and optimization',
        emoji: '🗄️',
        cards: [
            {
                id: 'mongodb',
                title: '1. MongoDB Fundamentals',
                icon: 'fa-database',
                description: 'Schema design, indexing, and aggregation pipelines in MongoDB.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'MongoDB Schema Design Patterns',
                        code: `// Embedded documents for 1:1 relationships
const userProfile = {
    _id: ObjectId("..."),
    name: "John Doe",
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

// Referenced documents for 1:many relationships
const order = {
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    items: [...]
};`,
                        runFunction: exampleRunners.runMongoExample
                    },
                    {
                        title: 'MongoDB Indexing and Performance',
                        code: `// Create indexes for better query performance
db.users.createIndex({ email: 1 }); // Single field index
db.users.createIndex({ name: 1, email: -1 }); // Compound index
db.users.createIndex({ "address.city": 1 }); // Index on nested field

// Text index for search
db.articles.createIndex({ title: "text", content: "text" });
db.articles.find({ $text: { $search: "javascript" } });

// Explain query to analyze performance
db.users.find({ email: "john@example.com" }).explain("executionStats");

// Index hints
db.users.find({ email: "john@example.com" }).hint({ email: 1 });`,
                        runFunction: null,
                        note: 'Proper indexing is crucial for query performance. Create indexes on frequently queried fields.'
                    }
                ]
            },
            {
                id: 'mongoose',
                title: '2. Mongoose ODM',
                icon: 'fa-database',
                description: 'Using Mongoose for MongoDB object modeling and schema validation.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Mongoose Schema and Models',
                        code: `const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide a valid email']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Instance methods
userSchema.methods.getFullInfo = function() {
    return \`\${this.name} (\${this.email})\`;
};

// Static methods
userSchema.statics.findByEmail = function(email) {
    return this.findOne({ email });
};

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;`,
                        runFunction: null
                    },
                    {
                        title: 'CRUD Operations with Mongoose',
                        code: `// Create
const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});

// Read
const users = await User.find({ age: { $gte: 18 } });
const user = await User.findById(userId);
const userByEmail = await User.findOne({ email: 'john@example.com' });

// Update
await User.findByIdAndUpdate(userId, { age: 31 }, { new: true, runValidators: true });
await User.updateMany({ age: { $lt: 18 } }, { status: 'minor' });

// Delete
await User.findByIdAndDelete(userId);
await User.deleteMany({ status: 'inactive' });`,
                        runFunction: null
                    }
                ]
            },
            {
                id: 'mongodb-aggregation',
                title: '3. MongoDB Aggregation Pipeline',
                icon: 'fa-chart-line',
                description: 'Powerful data processing and transformation using MongoDB aggregation pipelines.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Basic Aggregation Pipeline',
                        code: `// Aggregation pipeline stages
db.orders.aggregate([
    // Stage 1: Match (filter)
    { $match: { status: 'completed' } },
    
    // Stage 2: Lookup (join)
    {
        $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
        }
    },
    
    // Stage 3: Unwind array
    { $unwind: '$items' },
    
    // Stage 4: Group (aggregate)
    {
        $group: {
            _id: '$items.productId',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
    },
    
    // Stage 5: Sort
    { $sort: { totalRevenue: -1 } },
    
    // Stage 6: Limit
    { $limit: 10 }
]);`,
                        runFunction: null
                    },
                    {
                        title: 'Complex Aggregation Examples',
                        code: `// Calculate average order value by month
db.orders.aggregate([
    {
        $group: {
            _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" }
            },
            avgOrderValue: { $avg: "$total" },
            orderCount: { $sum: 1 }
        }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
]);

// Get top customers
db.orders.aggregate([
    {
        $group: {
            _id: "$userId",
            totalSpent: { $sum: "$total" },
            orderCount: { $sum: 1 }
        }
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 10 },
    {
        $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
        }
    },
    { $unwind: "$user" },
    {
        $project: {
            customerName: "$user.name",
            totalSpent: 1,
            orderCount: 1
        }
    }
]);`,
                        runFunction: null,
                        note: 'Aggregation pipelines are powerful for complex data analysis and reporting.'
                    }
                ]
            },
            {
                id: 'database-optimization',
                title: '4. Database Optimization & Best Practices',
                icon: 'fa-tachometer-alt',
                description: 'Optimizing database queries, connection pooling, and performance tuning.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Query Optimization Techniques',
                        code: `// Use select to fetch only needed fields
const users = await User.find().select('name email');

// Use lean() for read-only operations (faster)
const users = await User.find().lean();

// Use pagination
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;
const users = await User.find().skip(skip).limit(limit);

// Use populate efficiently
const orders = await Order.find()
    .populate({
        path: 'userId',
        select: 'name email' // Only select needed fields
    })
    .populate('items.productId');

// Use cursor for large datasets
const cursor = User.find().cursor();
for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    // Process user
}`,
                        runFunction: null
                    },
                    {
                        title: 'Connection Pooling and Caching',
                        code: `// MongoDB connection with connection pooling
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 5,  // Maintain at least 5 socket connections
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
});

// Redis caching example
const redis = require('redis');
const client = redis.createClient();

async function getCachedUser(userId) {
    const cached = await client.get(\`user:\${userId}\`);
    if (cached) {
        return JSON.parse(cached);
    }
    
    const user = await User.findById(userId);
    await client.setEx(\`user:\${userId}\`, 3600, JSON.stringify(user));
    return user;
}`,
                        runFunction: null,
                        note: 'Connection pooling and caching significantly improve application performance.'
                    }
                ]
            }
        ]
    },
    'system-design': {
        id: 'system-design',
        title: 'System Design',
        description: 'Building scalable and robust systems',
        emoji: '🧱',
        cards: [
            {
                id: 'system-architecture',
                title: '1. System Breakdown & Architecture',
                icon: 'fa-sitemap',
                description: 'Breaking down large systems into manageable components and microservices.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Microservices Architecture',
                        code: `// Service Discovery and Communication
class ServiceRegistry {
    constructor() {
        this.services = new Map();
    }
    
    register(name, url) {
        this.services.set(name, url);
    }
    
    getService(name) {
        return this.services.get(name);
    }
}

// API Gateway Pattern
class APIGateway {
    constructor(serviceRegistry) {
        this.services = serviceRegistry;
    }
    
    async routeRequest(path, method, data) {
        const [service, endpoint] = this.parsePath(path);
        const serviceUrl = this.services.getService(service);
        
        return fetch(\`\${serviceUrl}\${endpoint}\`, {
            method,
            body: JSON.stringify(data)
        });
    }
}`,
                        runFunction: exampleRunners.runSystemDesignExample
                    },
                    {
                        title: 'Monolithic vs Microservices',
                        code: `// Monolithic Architecture
// All features in one codebase
class MonolithicApp {
    constructor() {
        this.users = new UserService();
        this.orders = new OrderService();
        this.payments = new PaymentService();
    }
}

// Microservices Architecture
// Each service is independent
class UserService {
    constructor() {
        this.port = 3001;
    }
}

class OrderService {
    constructor() {
        this.port = 3002;
        this.userService = 'http://user-service:3001';
    }
    
    async createOrder(userId, items) {
        // Call user service
        const user = await fetch(\`\${this.userService}/users/\${userId}\`);
        // Process order
    }
}`,
                        runFunction: null,
                        note: 'Microservices offer better scalability and independent deployment but add complexity.'
                    }
                ]
            },
            {
                id: 'scalability',
                title: '2. Scalability Patterns',
                icon: 'fa-expand-arrows-alt',
                description: 'Horizontal and vertical scaling, load balancing, and caching strategies.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Load Balancing Strategies',
                        code: `// Round Robin Load Balancer
class RoundRobinLoadBalancer {
    constructor(servers) {
        this.servers = servers;
        this.currentIndex = 0;
    }
    
    getServer() {
        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server;
    }
}

// Weighted Round Robin
class WeightedLoadBalancer {
    constructor(servers) {
        this.servers = servers; // [{url, weight}, ...]
        this.totalWeight = servers.reduce((sum, s) => sum + s.weight, 0);
    }
    
    getServer() {
        let random = Math.random() * this.totalWeight;
        for (const server of this.servers) {
            random -= server.weight;
            if (random <= 0) return server.url;
        }
    }
}

// Usage
const lb = new RoundRobinLoadBalancer([
    'http://server1:3000',
    'http://server2:3000',
    'http://server3:3000'
]);

const server = lb.getServer();`,
                        runFunction: null
                    },
                    {
                        title: 'Caching Strategies',
                        code: `// Cache-Aside Pattern
class CacheAside {
    constructor(cache, database) {
        this.cache = cache;
        this.db = database;
    }
    
    async get(key) {
        // Check cache first
        let data = await this.cache.get(key);
        
        if (!data) {
            // Cache miss - get from database
            data = await this.db.get(key);
            
            // Store in cache for next time
            if (data) {
                await this.cache.set(key, data, 3600); // TTL: 1 hour
            }
        }
        
        return data;
    }
    
    async set(key, value) {
        // Write to database
        await this.db.set(key, value);
        
        // Invalidate cache
        await this.cache.delete(key);
    }
}

// Write-Through Cache
class WriteThroughCache {
    async set(key, value) {
        // Write to cache and database simultaneously
        await Promise.all([
            this.cache.set(key, value),
            this.db.set(key, value)
        ]);
    }
}`,
                        runFunction: null,
                        note: 'Caching reduces database load and improves response times significantly.'
                    }
                ]
            },
            {
                id: 'messaging',
                title: '3. Message Queues and Event-Driven Architecture',
                icon: 'fa-exchange-alt',
                description: 'Implementing asynchronous communication with message queues and event streaming.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Message Queue Pattern',
                        code: `// Simple message queue implementation
class MessageQueue {
    constructor() {
        this.queue = [];
        this.subscribers = new Map();
    }
    
    publish(topic, message) {
        this.queue.push({ topic, message, timestamp: Date.now() });
        this.notifySubscribers(topic, message);
    }
    
    subscribe(topic, callback) {
        if (!this.subscribers.has(topic)) {
            this.subscribers.set(topic, []);
        }
        this.subscribers.get(topic).push(callback);
    }
    
    notifySubscribers(topic, message) {
        const callbacks = this.subscribers.get(topic) || [];
        callbacks.forEach(callback => callback(message));
    }
}

// Usage - Publisher
const mq = new MessageQueue();
mq.publish('user.created', { userId: 123, email: 'user@example.com' });

// Usage - Subscriber
mq.subscribe('user.created', (message) => {
    console.log('New user created:', message);
    // Send welcome email, create profile, etc.
});`,
                        runFunction: null
                    },
                    {
                        title: 'Event-Driven Architecture',
                        code: `// Event Bus
class EventBus {
    constructor() {
        this.events = new Map();
    }
    
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    }
    
    emit(event, data) {
        const handlers = this.events.get(event) || [];
        handlers.forEach(handler => handler(data));
    }
}

// Order Service
class OrderService {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    
    async createOrder(orderData) {
        const order = await this.saveOrder(orderData);
        
        // Emit event
        this.eventBus.emit('order.created', {
            orderId: order.id,
            userId: order.userId,
            total: order.total
        });
        
        return order;
    }
}

// Payment Service (subscribes to events)
class PaymentService {
    constructor(eventBus) {
        this.eventBus = eventBus;
        this.eventBus.on('order.created', this.processPayment.bind(this));
    }
    
    async processPayment(eventData) {
        // Process payment for the order
        console.log(\`Processing payment for order \${eventData.orderId}\`);
    }
}`,
                        runFunction: null,
                        note: 'Event-driven architecture enables loose coupling and better scalability.'
                    }
                ]
            },
            {
                id: 'security',
                title: '4. Security & Performance Optimization',
                icon: 'fa-shield-alt',
                description: 'Security best practices, rate limiting, and performance optimization techniques.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Rate Limiting',
                        code: `// Token Bucket Rate Limiter
class RateLimiter {
    constructor(capacity, refillRate) {
        this.capacity = capacity; // Max tokens
        this.tokens = capacity; // Current tokens
        this.refillRate = refillRate; // Tokens per second
        this.lastRefill = Date.now();
    }
    
    refill() {
        const now = Date.now();
        const elapsed = (now - this.lastRefill) / 1000;
        const tokensToAdd = elapsed * this.refillRate;
        
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
        this.lastRefill = now;
    }
    
    allow() {
        this.refill();
        
        if (this.tokens >= 1) {
            this.tokens -= 1;
            return true;
        }
        
        return false;
    }
}

// Express middleware
const rateLimitMiddleware = (req, res, next) => {
    const limiter = new RateLimiter(10, 2); // 10 tokens, 2 per second
    
    if (!limiter.allow()) {
        return res.status(429).json({ 
            error: 'Too many requests' 
        });
    }
    
    next();
};`,
                        runFunction: null
                    },
                    {
                        title: 'Security Best Practices',
                        code: `// Input validation and sanitization
const validator = require('validator');
const xss = require('xss');

function sanitizeInput(input) {
    // Remove XSS
    let sanitized = xss(input);
    
    // Validate email
    if (!validator.isEmail(sanitized)) {
        throw new Error('Invalid email');
    }
    
    // Escape SQL injection (when using SQL databases)
    sanitized = sanitized.replace(/'/g, "''");
    
    return sanitized;
}

// HTTPS and Security Headers
const helmet = require('helmet');
app.use(helmet());

// CORS configuration
const cors = require('cors');
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
}));

// Environment variables for secrets
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET; // Never hardcode!

// Password hashing
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);`,
                        runFunction: null,
                        note: 'Always validate input, use HTTPS, implement rate limiting, and never expose secrets.'
                    }
                ]
            }
        ]
    }
}

