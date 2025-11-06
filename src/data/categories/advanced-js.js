import { exampleRunners } from '../../utils/exampleRunners'

export const advanced_js = {
        id: 'advanced-js',
        title: 'Advanced JavaScript',
        description: 'Deep dive into advanced JavaScript concepts',
        emoji: '🚀',
        cards: [
            {
                id: 'prototypes',
                title: '1. Prototype, this, and Object Inheritance',
                icon: 'fa-cogs',
                description: 'Master JavaScript\'s prototype-based inheritance system, understand how \`this\` binding works, and learn how objects inherit from other objects. These three concepts work together to enable object-oriented programming in JavaScript.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Prototype, this, and Inheritance - Working Together',
                        code: `// Demonstrating how Prototype, this, and Inheritance work together

// 1. PROTOTYPE: Every object has a prototype for property lookup
function Vehicle(brand) {
    // 2. THIS: Refers to the instance being created
    this.brand = brand;
}

// Methods on prototype are shared (memory efficient)
Vehicle.prototype.start = function() {
    // THIS refers to the instance calling the method
    return \`\${this.brand} is starting...\`;
};

// 3. INHERITANCE: Child inherits from parent via prototype chain
function Car(brand, model) {
    // Call parent constructor with THIS context
    Vehicle.call(this, brand);
    this.model = model;
}

// Link prototypes for inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

// Child-specific method
Car.prototype.drive = function() {
    // THIS still refers to the Car instance
    return \`\${this.brand} \${this.model} is driving!\`;
};

const myCar = new Car("Toyota", "Camry");
console.log(myCar.drive()); // "Toyota Camry is driving!"
console.log(myCar.start()); // "Toyota is starting..." (inherited)

// Prototype chain: myCar -> Car.prototype -> Vehicle.prototype -> Object.prototype
console.log(myCar.__proto__ === Car.prototype); // true
console.log(Car.prototype.__proto__ === Vehicle.prototype); // true`,
                        runFunction: null,
                        note: 'Key relationship: \`this\` determines context, prototypes enable inheritance, and together they support object-oriented patterns in JavaScript.'
                    },
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
}
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
}
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
}
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
}
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
            },
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
            },
        }
    };
}`,
                        runFunction: null,
                        note: 'These patterns are essential for building performant JavaScript applications.'
                    }
                ]
            },
            {
                id: 'currying',
                title: '7. Currying and Partial Application',
                icon: 'fa-layer-group',
                description: 'Advanced function techniques: currying for creating specialized functions and partial application for function reuse.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Currying Basics',
                        code: `// Currying: Transforming a function with multiple arguments into a sequence of functions
// Regular function
function add(a, b, c) {
    return a + b + c;
}

// Curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Arrow function currying
const curriedAddArrow = a => b => c => a + b + c;

// Usage
const add5 = curriedAdd(5);
const add5And10 = add5(10);
console.log(add5And10(3)); // 18

// Or in one call
console.log(curriedAddArrow(5)(10)(3)); // 18

// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    };
}

const curriedMultiply = curry((a, b, c) => a * b * c);
console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24`,
                        runFunction: null,
                        note: 'Currying allows creating specialized functions by fixing some arguments. Great for functional programming.'
                    },
                    {
                        title: 'Partial Application',
                        code: `// Partial application: Fixing some arguments of a function
function multiply(a, b, c) {
    return a * b * c;
}

// Manual partial application
function multiplyBy2(b, c) {
    return multiply(2, b, c);
}

// Generic partial function
function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn.apply(this, fixedArgs.concat(remainingArgs));
    };
}

const multiplyBy5 = partial(multiply, 5);
console.log(multiplyBy5(2, 3)); // 30

// Using bind for partial application
const multiplyBy10 = multiply.bind(null, 10);
console.log(multiplyBy10(2, 3)); // 60

// Practical example: Event handlers
function logEvent(type, message, timestamp) {
    console.log(\`[\${timestamp}] \${type}: \${message}\`);
}

const logError = partial(logEvent, 'ERROR');
const logInfo = partial(logEvent, 'INFO');

logError('Something went wrong', new Date().toISOString());
logInfo('User logged in', new Date().toISOString());`,
                        runFunction: null,
                        note: 'Partial application fixes some arguments, creating a more specialized function. Different from currying.'
                    },
                    {
                        title: 'Practical Use Cases',
                        code: `// 1. Configuration functions
function createRequest(method, baseURL) {
    return function(endpoint, data) {
        return fetch(\`\${baseURL}\${endpoint}\`, {
            method,
            body: JSON.stringify(data)
        });
    };
}

const apiPost = createRequest('POST', 'https://api.example.com');
const apiGet = createRequest('GET', 'https://api.example.com');

// 2. Validation functions
function validate(type, value) {
    const validators = {
        email: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
        phone: (v) => /^\\+?[1-9]\\d{1,14}$/.test(v),
        required: (v) => v !== null && v !== undefined && v !== ''
    };
    return validators[type] ? validators[type](value) : false;
}

const validateEmail = (value) => validate('email', value);
const validatePhone = (value) => validate('phone', value);

// 3. Event handling
function handleEvent(eventType, handler) {
    return function(event) {
        if (event.type === eventType) {
            handler(event);
        }
    };
}

const handleClick = handleEvent('click', (e) => console.log('Clicked!'));
const handleKeyPress = handleEvent('keypress', (e) => console.log('Key pressed!'));`,
                        runFunction: null,
                        note: 'Currying and partial application enable powerful function composition and code reuse patterns.'
                    }
                ]
            },
            {
                id: 'function-composition',
                title: '8. Function Composition',
                icon: 'fa-project-diagram',
                description: 'Combining multiple functions to create more complex operations through composition.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Basic Function Composition',
                        code: `// Compose: Right to left execution
function compose(...fns) {
    return function(value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

// Pipe: Left to right execution
function pipe(...fns) {
    return function(value) {
        return fns.reduce((acc, fn) => fn(acc), value);
    };
}

// Example functions
const add1 = x => x + 1;
const multiply2 = x => x * 2;
const square = x => x * x;

// Compose: square(multiply2(add1(5)))
const composed = compose(square, multiply2, add1);
console.log(composed(5)); // ((5 + 1) * 2)² = 144

// Pipe: add1(multiply2(square(5)))
const piped = pipe(square, multiply2, add1);
console.log(piped(5)); // ((5²) * 2) + 1 = 51

// With multiple arguments
function composeWith(...fns) {
    return function(...args) {
        return fns.reduceRight((acc, fn) => {
            return Array.isArray(acc) ? fn(...acc) : fn(acc);
        }, args);
    };
}`,
                        runFunction: null,
                        note: 'Composition allows building complex operations from simple functions. Compose is right-to-left, pipe is left-to-right.'
                    },
                    {
                        title: 'Practical Composition Examples',
                        code: `// Data transformation pipeline
const users = [
    { name: 'John', age: 30, active: true },
    { name: 'Jane', age: 25, active: false },
    { name: 'Bob', age: 35, active: true }
];

// Helper functions
const filterActive = users => users.filter(u => u.active);
const getNames = users => users.map(u => u.name);
const toUpperCase = names => names.map(n => n.toUpperCase());
const addPrefix = prefix => names => names.map(n => \`\${prefix} \${n}\`);

// Compose pipeline
const getActiveUserNames = compose(
    addPrefix('User:'),
    toUpperCase,
    getNames,
    filterActive
);

console.log(getActiveUserNames(users)); // ['User: JOHN', 'User: BOB']

// Async composition
async function fetchUser(id) {
    return { id, name: 'John' };
}

async function fetchPosts(userId) {
    return [{ id: 1, title: 'Post 1' }];
}

async function formatData(user, posts) {
    return { user, posts, count: posts.length };
}

// Compose async functions
async function getUserData(id) {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    return formatData(user, posts);
}`,
                        runFunction: null,
                        note: 'Function composition is fundamental to functional programming. It makes code more declarative and reusable.'
                    },
                    {
                        title: 'Higher-Order Function Utilities',
                        code: `// Utility functions for composition

// Identity function
const identity = x => x;

// Constant function
const constant = x => () => x;

// Tap (for side effects in pipeline)
const tap = fn => x => {
    fn(x);
    return x;
};

// Logging in pipeline
const log = tap(console.log);
const processData = pipe(
    filterActive,
    log, // Log intermediate result
    getNames,
    log, // Log names
    toUpperCase
);

// Conditional composition
const when = (predicate, fn) => x => predicate(x) ? fn(x) : x;

const processWithCondition = pipe(
    filterActive,
    when(users => users.length > 0, getNames),
    toUpperCase
);

// Compose with error handling
const safeCompose = (...fns) => value => {
    try {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    } catch (error) {
        console.error('Composition error:', error);
        return null;
    }
};`,
                        runFunction: null,
                        note: 'Higher-order functions enable powerful composition patterns. Use utilities like tap and when for advanced scenarios.'
                    }
                ]
            },
            {
                id: 'decorators',
                title: '9. Decorators (ES2022)',
                icon: 'fa-magic',
                description: 'Using decorators to modify classes, methods, and properties with metadata and behavior.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Class and Method Decorators',
                        code: `// Decorator: Function that modifies class/method/property
// Note: Requires experimental decorators or TypeScript/Babel

// Method decorator
function log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        console.log(\`Calling \${propertyKey} with args:\`, args);
        const result = originalMethod.apply(this, args);
        console.log(\`\${propertyKey} returned:\`, result);
        return result;
    };
    
    return descriptor;
}

// Class decorator
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

// Usage
@sealed
class Calculator {
    @log
    add(a, b) {
        return a + b;
    }
    
    @log
    multiply(a, b) {
        return a * b;
    }
}

const calc = new Calculator();
calc.add(5, 3); // Logs: Calling add with args: [5, 3], add returned: 8

// Property decorator
function readonly(target, propertyKey, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

class User {
    @readonly
    id = 1;
    
    name = 'John';
}

const user = new User();
// user.id = 2; // ❌ Error: Cannot assign to read only property`,
                        runFunction: null,
                        note: 'Decorators provide a declarative way to add behavior to classes and methods. Currently experimental in JavaScript.'
                    },
                    {
                        title: 'Decorator Factories',
                        code: `// Decorator factory: Returns a decorator function
function logWithPrefix(prefix) {
    return function(target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function(...args) {
            console.log(\`[\${prefix}] Calling \${propertyKey}\`);
            return originalMethod.apply(this, args);
        };
        
        return descriptor;
    };
}

function debounce(delay) {
    return function(target, propertyKey, descriptor) {
        let timeoutId;
        const originalMethod = descriptor.value;
        
        descriptor.value = function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                originalMethod.apply(this, args);
            }, delay);
        };
        
        return descriptor;
    };
}

function memoize(target, propertyKey, descriptor) {
    const cache = new Map();
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    };
    
    return descriptor;
}

class DataService {
    @logWithPrefix('API')
    @debounce(300)
    search(query) {
        return \`Searching for \${query}\`;
    }
    
    @memoize
    expensiveCalculation(n) {
        return n * n;
    }
}`,
                        runFunction: null,
                        note: 'Decorator factories allow parameterized decorators. Useful for creating reusable decorator patterns.'
                    }
                ]
            },
            {
                id: 'bigint',
                title: '10. BigInt',
                icon: 'fa-calculator',
                description: 'Working with arbitrarily large integers using BigInt for precision beyond Number.MAX_SAFE_INTEGER.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'BigInt Basics',
                        code: `// Number.MAX_SAFE_INTEGER is 2^53 - 1 (9,007,199,254,740,991)
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// Beyond this, precision is lost
console.log(9007199254740991 + 1); // 9007199254740992 ✅
console.log(9007199254740992 + 1); // 9007199254740992 ❌ (same value!)

// BigInt can handle arbitrarily large integers
const bigInt1 = 9007199254740991n; // n suffix
const bigInt2 = BigInt(9007199254740991); // Constructor
const bigInt3 = BigInt('9007199254740992'); // String

console.log(bigInt1); // 9007199254740991n
console.log(bigInt2 + 1n); // 9007199254740992n ✅

// Operations
const a = 123456789012345678901234567890n;
const b = 987654321098765432109876543210n;

console.log(a + b); // 1111111110111111111011111111100n
console.log(a * b); // 121932631112635269000000000000000000000000000000n
console.log(a / b); // 0n (integer division)

// Cannot mix BigInt and Number
// console.log(1n + 1); // ❌ TypeError
console.log(1n + BigInt(1)); // ✅ 2n
console.log(Number(1n) + 1); // ✅ 2`,
                        runFunction: null,
                        note: 'BigInt is essential for working with large integers. Cannot mix with regular numbers without conversion.'
                    },
                    {
                        title: 'BigInt Use Cases',
                        code: `// 1. Cryptography and hashing
function hashString(str) {
    let hash = 0n;
    for (let i = 0; i < str.length; i++) {
        const char = BigInt(str.charCodeAt(i));
        hash = ((hash << 5n) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
}

// 2. Financial calculations (when precision matters)
function calculateInterest(principal, rate, years) {
    const principalBig = BigInt(Math.round(principal * 100)); // Convert to cents
    const rateBig = BigInt(Math.round(rate * 10000)); // Convert to basis points
    const yearsBig = BigInt(years);
    
    // Compound interest: P(1 + r)^t
    const multiplier = (10000n + rateBig) ** yearsBig;
    const result = (principalBig * multiplier) / (10000n ** yearsBig);
    
    return Number(result) / 100; // Convert back to dollars
}

// 3. ID generation (Twitter Snowflake IDs)
function generateSnowflakeId(timestamp, workerId, sequence) {
    const timestampBig = BigInt(timestamp);
    const workerIdBig = BigInt(workerId);
    const sequenceBig = BigInt(sequence);
    
    // 41 bits timestamp, 10 bits worker, 12 bits sequence
    return (timestampBig << 22n) | (workerIdBig << 12n) | sequenceBig;
}

// 4. Large number calculations
function factorial(n) {
    if (n <= 1n) return 1n;
    return n * factorial(n - 1n);
}

console.log(factorial(100n)); // Very large number`,
                        runFunction: null,
                        note: 'BigInt is crucial for cryptography, financial calculations, ID generation, and any scenario requiring large integer precision.'
                    }
                ]
            },
            {
                id: 'top-level-await',
                title: '11. Top-Level Await',
                icon: 'fa-rocket',
                description: 'Using await at the top level of modules for async module initialization and dynamic imports.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Top-Level Await in Modules',
                        code: `// config.js - Module with top-level await
const config = await fetch('/api/config')
    .then(res => res.json())
    .catch(() => ({ default: 'config' }));

export { config };

// main.js - Import and use
import { config } from './config.js';
console.log(config); // Already resolved!

// Dynamic module loading
const module = await import('./utils.js');
const { helper } = await import('./helper.js');

// Conditional module loading
let utils;
if (condition) {
    utils = await import('./utils.js');
} else {
    utils = await import('./legacy-utils.js');
}

// Sequential module loading
const module1 = await import('./module1.js');
const module2 = await import('./module2.js');
const module3 = await import('./module3.js');

// Parallel module loading
const [mod1, mod2, mod3] = await Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js')
]);`,
                        runFunction: null,
                        note: 'Top-level await allows modules to wait for async operations before exporting. Makes module initialization async.'
                    },
                    {
                        title: 'Use Cases and Patterns',
                        code: `// 1. Async configuration loading
// config.js
export const config = await (async () => {
    try {
        const response = await fetch('/config.json');
        return await response.json();
    } catch {
        return { default: true };
    }
})();

// 2. Database connection in module
// db.js
export const db = await connectToDatabase();

// 3. Feature detection and polyfills
const supportsWebAssembly = 'WebAssembly' in window;
export const wasmModule = supportsWebAssembly 
    ? await import('./wasm-module.js')
    : await import('./js-fallback.js');

// 4. Environment-based module loading
const env = process.env.NODE_ENV;
export const logger = env === 'production'
    ? await import('./production-logger.js')
    : await import('./development-logger.js');

// ⚠️ Important: Top-level await blocks module execution
// Module won't be ready until await resolves
// Use carefully to avoid blocking dependent modules`,
                        runFunction: null,
                        note: 'Top-level await is powerful but blocks module execution. Use for initialization, not for every async operation.'
                    }
                ]
            },
            {
                id: 'reflect-api',
                title: '12. Reflect API (Comprehensive)',
                icon: 'fa-mirror',
                description: 'Complete guide to Reflect API methods for metaprogramming and introspection.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Reflect Methods Overview',
                        code: `// Reflect provides methods that mirror Object operations
// But with better return values and error handling

const obj = { name: 'John', age: 30 };

// Reflect.get() - Get property value
console.log(Reflect.get(obj, 'name')); // 'John'

// Reflect.set() - Set property value
Reflect.set(obj, 'name', 'Jane');
console.log(obj.name); // 'Jane'

// Reflect.has() - Check if property exists
console.log(Reflect.has(obj, 'name')); // true
console.log(Reflect.has(obj, 'email')); // false

// Reflect.ownKeys() - Get all own property keys
console.log(Reflect.ownKeys(obj)); // ['name', 'age']

// Reflect.defineProperty() - Define property
Reflect.defineProperty(obj, 'email', {
    value: 'john@example.com',
    writable: false
});

// Reflect.deleteProperty() - Delete property
Reflect.deleteProperty(obj, 'age');
console.log(obj.age); // undefined

// Reflect.getPrototypeOf() - Get prototype
console.log(Reflect.getPrototypeOf(obj)); // Object.prototype

// Reflect.setPrototypeOf() - Set prototype
const proto = { greet() { return 'Hello!'; } };
Reflect.setPrototypeOf(obj, proto);
console.log(obj.greet()); // 'Hello!'`,
                        runFunction: null,
                        note: 'Reflect methods return boolean/values instead of throwing errors, making them better for metaprogramming.'
                    },
                    {
                        title: 'Reflect vs Direct Operations',
                        code: `// Why use Reflect?

// 1. Better error handling
try {
    Object.defineProperty(obj, 'prop', { value: 1 });
    // Might throw TypeError
} catch (e) {
    // Handle error
}

// Reflect returns boolean
if (Reflect.defineProperty(obj, 'prop', { value: 1 })) {
    // Success
} else {
    // Failed
}

// 2. Works with Proxy
const handler = {
    get(target, prop) {
        // Use Reflect to maintain default behavior
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        // Validate before setting
        if (prop === 'age' && value < 0) {
            return false;
        }
        return Reflect.set(target, prop, value);
    }
};

const proxied = new Proxy({}, handler);

// 3. Function operations
function greet(name) {
    return \`Hello, \${name}\`;
}

// Reflect.apply() - Call function with this and arguments
console.log(Reflect.apply(greet, null, ['John'])); // 'Hello, John'

// Reflect.construct() - Create instance
class Person {
    constructor(name) {
        this.name = name;
    }
}

const person = Reflect.construct(Person, ['John']);
console.log(person.name); // 'John'`,
                        runFunction: null,
                        note: 'Reflect API provides a consistent interface for object operations and works seamlessly with Proxy.'
                    },
                    {
                        title: 'Reflect with Proxy Patterns',
                        code: `// Reflect is essential for Proxy handlers

// Logging proxy
const loggingHandler = {
    get(target, prop, receiver) {
        console.log(\`Getting \${prop}\`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        console.log(\`Setting \${prop} = \${value}\`);
        return Reflect.set(target, prop, value, receiver);
    },
    has(target, prop) {
        console.log(\`Checking \${prop}\`);
        return Reflect.has(target, prop);
    },
    deleteProperty(target, prop) {
        console.log(\`Deleting \${prop}\`);
        return Reflect.deleteProperty(target, prop);
    }
};

const logged = new Proxy({ name: 'John' }, loggingHandler);
logged.age = 30; // Logs: Setting age = 30
console.log(logged.name); // Logs: Getting name, then 'John'

// Validation proxy
const validator = {
    set(target, prop, value) {
        if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
            throw new Error('Invalid age');
        }
        return Reflect.set(target, prop, value);
    }
};

const user = new Proxy({}, validator);
user.age = 30; // ✅ OK
// user.age = -5; // ❌ Error`,
                        runFunction: null,
                        note: 'Reflect methods in Proxy handlers maintain default behavior while allowing interception. Essential for metaprogramming.'
                    }
                ]
            },
            {
                id: 'design-patterns',
                title: '13. Design Patterns in JavaScript',
                icon: 'fa-puzzle-piece',
                description: 'Common design patterns implemented in JavaScript: Observer, Factory, Singleton, Module, and more.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Observer Pattern',
                        code: `// Observer: One-to-many dependency between objects
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

// Usage
const emitter = new EventEmitter();

emitter.on('user:login', (user) => {
    console.log(\`User \${user.name} logged in\`);
});

emitter.on('user:login', (user) => {
    console.log(\`Sending welcome email to \${user.email}\`);
});

emitter.emit('user:login', { name: 'John', email: 'john@example.com' });`,
                        runFunction: null,
                        note: 'Observer pattern enables loose coupling. Objects can subscribe to events without knowing about the publisher.'
                    },
                    {
                        title: 'Factory Pattern',
                        code: `// Factory: Create objects without specifying exact class
class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
}

class Truck {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
}

// Factory function
function createVehicle(type, make, model) {
    switch (type) {
        case 'car':
            return new Car(make, model);
        case 'truck':
            return new Truck(make, model);
        default:
            throw new Error(\`Unknown vehicle type: \${type}\`);
    }
}

const car = createVehicle('car', 'Toyota', 'Camry');
const truck = createVehicle('truck', 'Ford', 'F-150');

// Factory class
class VehicleFactory {
    static create(type, make, model) {
        const vehicles = {
            car: Car,
            truck: Truck
        };
        
        const VehicleClass = vehicles[type];
        if (!VehicleClass) {
            throw new Error(\`Unknown vehicle type: \${type}\`);
        }
        
        return new VehicleClass(make, model);
    }
}`,
                        runFunction: null,
                        note: 'Factory pattern encapsulates object creation logic. Useful when creation is complex or needs to be centralized.'
                    },
                    {
                        title: 'Singleton Pattern',
                        code: `// Singleton: Ensure only one instance exists
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        
        this.connection = 'Connected';
        Database.instance = this;
    }
    
    query(sql) {
        return \`Executing: \${sql}\`;
    }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true (same instance)

// Module pattern singleton
const Config = (function() {
    let instance;
    
    function createInstance() {
        return {
            apiUrl: 'https://api.example.com',
            timeout: 5000
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const config1 = Config.getInstance();
const config2 = Config.getInstance();
console.log(config1 === config2); // true`,
                        runFunction: null,
                        note: 'Singleton ensures only one instance exists. Useful for database connections, configuration, and shared resources.'
                    },
                    {
                        title: 'Module Pattern',
                        code: `// Module Pattern: Encapsulation and private variables
const Counter = (function() {
    // Private variables
    let count = 0;
    
    // Private function
    function validate(value) {
        return typeof value === 'number' && value >= 0;
    }
    
    // Public API
    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            if (validate(count - 1)) {
                count--;
            }
            return count;
        },
        getCount() {
            return count;
        },
        reset() {
            count = 0;
        }
    };
})();

Counter.increment(); // 1
Counter.increment(); // 2
console.log(Counter.getCount()); // 2
// console.log(Counter.count); // undefined (private)

// Revealing Module Pattern
const Calculator = (function() {
    // Private
    function add(a, b) {
        return a + b;
    }
    
    function subtract(a, b) {
        return a - b;
    }
    
    // Public (revealed)
    return {
        add,
        subtract
    };
})();`,
                        runFunction: null,
                        note: 'Module pattern provides encapsulation through closures. Private variables and functions are not accessible from outside.'
                    }
                ]
            },
            {
                id: 'advanced-async',
                title: '14. Advanced Async Patterns',
                icon: 'fa-sync-alt',
                description: 'Advanced Promise methods, async iteration, AbortController, and sophisticated async patterns.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Promise.all, Promise.allSettled, Promise.race',
                        code: `// Promise.all - All must succeed
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
    .then(values => console.log(values)); // [1, 2, 3]

// If any fails, all fails
Promise.all([
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
]).catch(error => console.log(error)); // 'Error'

// Promise.allSettled - Wait for all, regardless of outcome
Promise.allSettled([
    Promise.resolve(1),
    Promise.reject('Error'),
    Promise.resolve(3)
]).then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 1 },
    //   { status: 'rejected', reason: 'Error' },
    //   { status: 'fulfilled', value: 3 }
    // ]
});

// Promise.race - First to settle wins
Promise.race([
    new Promise(resolve => setTimeout(() => resolve('Fast'), 100)),
    new Promise(resolve => setTimeout(() => resolve('Slow'), 1000))
]).then(result => console.log(result)); // 'Fast'

// Promise.any - First to fulfill (ignores rejections)
Promise.any([
    Promise.reject('Error 1'),
    Promise.resolve('Success'),
    Promise.reject('Error 2')
]).then(result => console.log(result)); // 'Success'`,
                        runFunction: null,
                        note: 'Promise.all for parallel execution, allSettled for all results, race for fastest, any for first success.'
                    },
                    {
                        title: 'AbortController for Cancellation',
                        code: `// AbortController - Cancel async operations
const controller = new AbortController();
const signal = controller.signal;

// Cancel fetch request
async function fetchData(url, signal) {
    try {
        const response = await fetch(url, { signal });
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request aborted');
        } else {
            throw error;
        }
    }
}

// Start request
const dataPromise = fetchData('/api/data', signal);

// Cancel after 5 seconds
setTimeout(() => {
    controller.abort();
}, 5000);

// Custom abortable operation
function createAbortableOperation(operation, signal) {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(new Error('Aborted'));
            return;
        }
        
        signal.addEventListener('abort', () => {
            reject(new Error('Aborted'));
        });
        
        operation(resolve, reject);
    });
}

// Usage
const operation = createAbortableOperation((resolve) => {
    setTimeout(() => resolve('Done'), 10000);
}, signal);

controller.abort(); // Cancels operation`,
                        runFunction: null,
                        note: 'AbortController enables cancellation of async operations. Essential for user-initiated cancellations and timeouts.'
                    },
                    {
                        title: 'Async Iteration',
                        code: `// Async iterators for streaming data
async function* asyncGenerator() {
    for (let i = 0; i < 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

// Consume async iterator
(async () => {
    for await (const value of asyncGenerator()) {
        console.log(value); // 0, 1, 2, 3, 4 (with 1s delay)
    }
})();

// Async iteration with fetch
async function* fetchPages(url) {
    let page = 1;
    while (true) {
        const response = await fetch(\`\${url}?page=\${page}\`);
        const data = await response.json();
        
        if (data.length === 0) break;
        
        yield data;
        page++;
    }
}

// Process pages as they arrive
(async () => {
    for await (const page of fetchPages('/api/items')) {
        processPage(page);
    }
})();`,
                        runFunction: null,
                        note: 'Async iteration allows processing data streams asynchronously. Perfect for pagination, file reading, and real-time data.'
                    }
                ]
            },
            {
                id: 'property-descriptors',
                title: '15. Property Descriptors',
                icon: 'fa-sliders-h',
                description: 'Deep dive into property descriptors: getters, setters, and property attributes.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Property Descriptors Basics',
                        code: `// Property descriptor attributes
const obj = {};

// Define property with descriptor
Object.defineProperty(obj, 'name', {
    value: 'John',
    writable: true,      // Can be changed
    enumerable: true,    // Shows in for...in, Object.keys()
    configurable: true  // Can be deleted/redefined
});

// Get property descriptor
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor);
// { value: 'John', writable: true, enumerable: true, configurable: true }

// Non-writable property
Object.defineProperty(obj, 'id', {
    value: 1,
    writable: false
});
// obj.id = 2; // ❌ Error in strict mode

// Non-enumerable property
Object.defineProperty(obj, 'secret', {
    value: 'hidden',
    enumerable: false
});
console.log(Object.keys(obj)); // ['name'] (secret not included)

// Non-configurable property
Object.defineProperty(obj, 'constant', {
    value: 42,
    configurable: false
});
// delete obj.constant; // ❌ Error
// Object.defineProperty(obj, 'constant', { value: 100 }); // ❌ Error`,
                        runFunction: null,
                        note: 'Property descriptors control property behavior. writable, enumerable, and configurable are key attributes.'
                    },
                    {
                        title: 'Getters and Setters',
                        code: `// Getter and Setter properties
const person = {
    _age: 0,
    
    get age() {
        return this._age;
    },
    
    set age(value) {
        if (value < 0) {
            throw new Error('Age cannot be negative');
        }
        this._age = value;
    }
};

person.age = 30;
console.log(person.age); // 30
// person.age = -5; // ❌ Error

// Using Object.defineProperty
const user = {};
let _email = '';

Object.defineProperty(user, 'email', {
    get() {
        return _email;
    },
    set(value) {
        if (!value.includes('@')) {
            throw new Error('Invalid email');
        }
        _email = value;
    },
    enumerable: true,
    configurable: true
});

user.email = 'john@example.com';
console.log(user.email); // 'john@example.com'

// Computed properties with getters
const rectangle = {
    width: 10,
    height: 5,
    get area() {
        return this.width * this.height;
    },
    get perimeter() {
        return 2 * (this.width + this.height);
    }
};

console.log(rectangle.area); // 50 (computed)`,
                        runFunction: null,
                        note: 'Getters and setters enable computed properties and validation. They look like properties but are actually methods.'
                    },
                    {
                        title: 'Property Descriptor Utilities',
                        code: `// Define multiple properties
Object.defineProperties(obj, {
    prop1: {
        value: 1,
        writable: true
    },
    prop2: {
        value: 2,
        writable: false
    }
});

// Get all property descriptors
const descriptors = Object.getOwnPropertyDescriptors(obj);

// Freeze vs Seal vs PreventExtensions
const obj1 = { name: 'John' };
Object.preventExtensions(obj1); // Can't add properties
// obj1.age = 30; // ❌ Error

const obj2 = { name: 'John' };
Object.seal(obj2); // Can't add/delete, can modify
obj2.name = 'Jane'; // ✅ OK
// obj2.age = 30; // ❌ Error

const obj3 = { name: 'John' };
Object.freeze(obj3); // Can't modify at all
// obj3.name = 'Jane'; // ❌ Error

// Check status
console.log(Object.isExtensible(obj1)); // false
console.log(Object.isSealed(obj2)); // true
console.log(Object.isFrozen(obj3)); // true`,
                        runFunction: null,
                        note: 'Property descriptors enable fine-grained control over object properties. Essential for creating robust APIs.'
                    }
                ]
            },
            {
                id: 'tagged-templates',
                title: '16. Tagged Template Literals',
                icon: 'fa-code',
                description: 'Advanced template literal usage with tag functions for DSL creation and string processing.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Tagged Template Basics',
                        code: `// Tagged template: Function that processes template literal
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
        return result + string + value;
    }, '');
}

const name = 'John';
const age = 30;
const html = highlight\`Hello, \${name}! You are \${age} years old.\`;
console.log(html);
// "Hello, <mark>John</mark>! You are <mark>30</mark> years old."

// Raw strings (with escape sequences)
function raw(strings, ...values) {
    return strings.raw[0]; // Gets raw string without processing escapes
}

const path = raw\`C:\\Users\\John\\Documents\`;
console.log(path); // "C:\\Users\\John\\Documents" (backslashes preserved)`,
                        runFunction: null,
                        note: 'Tagged templates allow custom processing of template literals. First argument is strings array, rest are interpolated values.'
                    },
                    {
                        title: 'Practical Tagged Template Examples',
                        code: `// 1. SQL query builder
function sql(strings, ...values) {
    return {
        query: strings.join('?'),
        params: values
    };
}

const userId = 123;
const { query, params } = sql\`SELECT * FROM users WHERE id = \${userId}\`;
// query: "SELECT * FROM users WHERE id = ?"
// params: [123]

// 2. HTML sanitization
function sanitize(strings, ...values) {
    const sanitized = values.map(value => {
        if (typeof value === 'string') {
            return value
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }
        return value;
    });
    
    return strings.reduce((result, str, i) => {
        return result + str + (sanitized[i] || '');
    }, '');
}

const userInput = '<script>alert("XSS")</script>';
const safe = sanitize\`<div>\${userInput}</div>\`;
// "<div>&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>"

// 3. i18n (Internationalization)
const translations = {
    en: { hello: 'Hello', goodbye: 'Goodbye' },
    es: { hello: 'Hola', goodbye: 'Adiós' }
};

function i18n(lang) {
    return function(strings, ...keys) {
        return strings.reduce((result, str, i) => {
            const key = keys[i];
            const translation = translations[lang][key] || key;
            return result + str + translation;
        }, '');
    };
}

const t = i18n('es');
const message = t\`\${'hello'}, \${name}!\`;
// "Hola, John!"`,
                        runFunction: null,
                        note: 'Tagged templates enable DSL creation, sanitization, i18n, and other advanced string processing patterns.'
                    }
                ]
            },
            {
                id: 'computed-properties',
                title: '17. Computed Properties & Method Shorthand',
                icon: 'fa-brackets-curly',
                description: 'ES6 object enhancements: computed property names, method shorthand, and dynamic object creation.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Computed Property Names',
                        code: `// ES5 way
const obj = {};
obj['prop' + 1] = 'value1';
obj['prop' + 2] = 'value2';

// ES6 computed properties
const prefix = 'prop';
const obj2 = {
    [prefix + 1]: 'value1',
    [prefix + 2]: 'value2',
    [\`\${prefix}_dynamic\`]: 'value3'
};

// With expressions
const obj3 = {
    [1 + 2]: 'three',
    ['key' + 'Name']: 'value',
    [Symbol('id')]: 'symbol-key'
};

// Dynamic property names
function createObject(key, value) {
    return {
        [key]: value,
        [\`\${key}_formatted\`]: String(value).toUpperCase()
    };
}

const result = createObject('name', 'John');
// { name: 'John', name_formatted: 'JOHN' }`,
                        runFunction: null,
                        note: 'Computed properties allow dynamic property names using expressions. Essential for creating flexible object structures.'
                    },
                    {
                        title: 'Method Shorthand and Object Enhancements',
                        code: `// ES5 method definition
const obj = {
    name: 'John',
    greet: function() {
        return \`Hello, \${this.name}\`;
    }
};

// ES6 method shorthand
const obj2 = {
    name: 'John',
    greet() {
        return \`Hello, \${this.name}\`;
    },
    // Arrow function (no this binding)
    greetArrow: () => {
        return \`Hello\`; // this.name is undefined
    }
};

// Property value shorthand
const name = 'John';
const age = 30;
const obj3 = {
    name,  // Same as name: name
    age,   // Same as age: age
    greet() {
        return \`Hello, \${this.name}\`;
    }
};

// Combined
function createUser(name, age, role) {
    return {
        name,
        age,
        role,
        [\`is\${role.charAt(0).toUpperCase() + role.slice(1)}\`]: true,
        greet() {
            return \`Hello, I'm \${this.name}, a \${this.role}\`;
        }
    };
}

const user = createUser('John', 30, 'admin');
// { name: 'John', age: 30, role: 'admin', isAdmin: true, greet: [Function] }`,
                        runFunction: null,
                        note: 'ES6 object enhancements make object creation more concise and expressive. Method shorthand and property shorthand are widely used.'
                    }
                ]
            },
            {
                id: 'error-patterns',
                title: '18. Advanced Error Handling Patterns',
                icon: 'fa-bug',
                description: 'Custom error classes, error boundaries, recovery strategies, and sophisticated error handling.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Custom Error Classes',
                        code: `// Custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.timestamp = new Date().toISOString();
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

class BusinessLogicError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'BusinessLogicError';
        this.code = code;
    }
}

// Usage
function validateEmail(email) {
    if (!email.includes('@')) {
        throw new ValidationError('Invalid email format', 'email');
    }
}

try {
    validateEmail('invalid-email');
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(\`Validation failed for \${error.field}: \${error.message}\`);
    }
}`,
                        runFunction: null,
                        note: 'Custom error classes provide structured error information. Use instanceof to handle specific error types.'
                    },
                    {
                        title: 'Error Recovery and Retry Patterns',
                        code: `// Retry pattern with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            const backoffDelay = delay * Math.pow(2, i);
            console.log(\`Retry \${i + 1} after \${backoffDelay}ms\`);
            await new Promise(resolve => setTimeout(resolve, backoffDelay));
        }
    }
}

// Circuit breaker pattern
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.failures = 0;
        this.threshold = threshold;
        this.timeout = timeout;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failures++;
        if (this.failures >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
}`,
                        runFunction: null,
                        note: 'Error recovery patterns like retry and circuit breaker make applications more resilient to transient failures.'
                    },
                    {
                        title: 'Error Boundaries and Fallbacks',
                        code: `// Error boundary pattern
function withErrorBoundary(component, fallback) {
    return function(...args) {
        try {
            return component(...args);
        } catch (error) {
            console.error('Error caught by boundary:', error);
            return fallback(error, ...args);
        }
    };
}

// Safe async wrapper
async function safeAsync(fn, fallback) {
    try {
        return await fn();
    } catch (error) {
        if (fallback) {
            return fallback(error);
        }
        throw error;
    }
}

// Graceful degradation
async function fetchWithFallback(primaryUrl, fallbackUrl) {
    try {
        const response = await fetch(primaryUrl);
        if (!response.ok) throw new Error('Primary failed');
        return await response.json();
    } catch (error) {
        console.warn('Primary failed, using fallback');
        const response = await fetch(fallbackUrl);
        return await response.json();
    }
}

// Error aggregation
async function executeAll(promises) {
    const results = await Promise.allSettled(promises);
    const errors = results
        .filter(r => r.status === 'rejected')
        .map(r => r.reason);
    
    if (errors.length > 0) {
        throw new AggregateError(errors, 'Multiple errors occurred');
    }
    
    return results.map(r => r.value);
}`,
                        runFunction: null,
                        note: 'Error boundaries and fallbacks ensure applications continue functioning even when parts fail. Essential for production apps.'
                    }
                ]
            }
        ]
    }
