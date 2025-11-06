// Example runner functions for code execution

export const runClosureExample = () => {
    let output = ''
    function outerFunction(x) {
        return function innerFunction(y) {
            return x + y;
        };
    }
    const addFive = outerFunction(5);
    output += `addFive(3) = ${addFive(3)}\n`;
    output += `addFive(10) = ${addFive(10)}\n`;
    return output;
}

export const runVarHoisting = () => {
    let output = 'Understanding hoisting errors:\n\n';
    output += 'ERROR 1: Variable hoisting\n';
    output += '• console.log(name) before declaration: undefined\n';
    output += '• After declaration: "John"\n\n';
    output += 'ERROR 2: Function scope confusion\n';
    output += '• var is function-scoped, not block-scoped\n\n';
    output += 'ERROR 3: Loop variable hoisting (Classic Closure Bug)\n';
    output += '• Loop variables are shared across iterations\n\n';
    output += 'ERROR 4: Temporal Dead Zone (let/const)\n';
    output += '• let and const are hoisted but not initialized\n\n';
    return output;
}

export const runScopeExample = () => {
    let output = ''
    const globalVar = "I'm global";
    function outerFunction() {
        const outerVar = "I'm in outer scope";
        function innerFunction() {
            const innerVar = "I'm in inner scope";
            output += `Global: ${globalVar}\n`;
            output += `Outer: ${outerVar}\n`;
            output += `Inner: ${innerVar}\n`;
        }
        innerFunction();
    }
    output += 'Scope Chain Demonstration:\n';
    outerFunction();
    return output;
}

export const runEventLoopExample = () => {
    let output = 'Event Loop Execution Order:\n\n';
    output += '1. Synchronous\n';
    setTimeout(() => {}, 0);
    Promise.resolve().then(() => {});
    output += '2. Promise (Microtask)\n';
    output += '3. setTimeout (Macrotask)\n';
    output += '\nKey Points:\n';
    output += '• Synchronous code executes first\n';
    output += '• Microtasks (Promises) execute before Macrotasks\n';
    output += '• Macrotasks (setTimeout) execute last\n';
    return output;
}

export const runPromiseExample = () => {
    let output = ''
    function fetchUser(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (id === 1) {
                    resolve({ id: 1, name: "John Doe", email: "john@example.com" });
                } else {
                    reject(new Error("User not found"));
                }
            }, 100);
        });
    }
    
    fetchUser(1)
        .then(user => {
            output += `User found: ${user.name}\n`;
            output += `Email: ${user.email}\n`;
        })
        .catch(error => {
            output += `Error: ${error.message}\n`;
        });
    
    return output || 'Promise chain executed. Check console for async output.';
}

export const runAsyncAwaitExample = () => {
    let output = 'Async/Await Example:\n\n';
    output += 'Fetching user data...\n';
    output += 'User data received\n';
    output += 'Posts fetched\n';
    return output;
}

export const runPrototypeChainExample = () => {
    let output = ''
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    
    Person.prototype.greet = function() {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old`;
    };
    
    const john = new Person("John", 30);
    output += `${john.greet()}\n`;
    output += `john.__proto__ === Person.prototype: ${john.__proto__ === Person.prototype}\n`;
    output += `john.hasOwnProperty('name'): ${john.hasOwnProperty('name')}\n`;
    return output;
}

export const runThisKeywordExample = () => {
    let output = ''
    const person = {
        name: "John",
        greet: function() {
            return `Hello, I'm ${this.name}`;
        }
    };
    output += `${person.greet()}\n`;
    
    const greetFunction = person.greet;
    const boundGreet = person.greet.bind({ name: "Jane" });
    output += `Bound to different context: ${boundGreet()}\n`;
    return output;
}

export const runCallApplyBindExample = () => {
    let output = ''
    function introduce(greeting, punctuation) {
        return `${greeting}, I'm ${this.name}${punctuation}`;
    }
    
    const person1 = { name: "John" };
    output += `${introduce.call(person1, "Hi", "!")}\n`;
    output += `${introduce.apply(person1, ["Hello", "."])}\n`;
    
    const introduceJohn = introduce.bind(person1);
    output += `${introduceJohn("Hey", "!!")}\n`;
    return output;
}

export const runInheritanceExample = () => {
    let output = ''
    function Animal(name, species) {
        this.name = name;
        this.species = species;
    }
    
    Animal.prototype.eat = function() {
        return `${this.name} is eating`;
    };
    
    function Dog(name, breed) {
        Animal.call(this, name, "Canine");
        this.breed = breed;
    }
    
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;
    Dog.prototype.bark = function() {
        return `${this.name} says Woof!`;
    };
    
    const myDog = new Dog("Buddy", "Golden Retriever");
    output += `${myDog.bark()}\n`;
    output += `${myDog.eat()}\n`;
    output += `myDog instanceof Dog: ${myDog instanceof Dog}\n`;
    return output;
}

export const runClassExample = () => {
    let output = ''
    class Animal {
        constructor(name, species) {
            this.name = name;
            this.species = species;
        }
        eat() {
            return `${this.name} is eating`;
        }
    }
    
    class Dog extends Animal {
        constructor(name, breed) {
            super(name, "Canine");
            this.breed = breed;
        }
        bark() {
            return `${this.name} says Woof!`;
        }
    }
    
    const myDog = new Dog("Buddy", "Golden Retriever");
    output += `${myDog.bark()}\n`;
    output += `${myDog.eat()}\n`;
    return output;
}

export const runObjectCreateExample = () => {
    let output = ''
    const animalPrototype = {
        init(name, species) {
            this.name = name;
            this.species = species;
            return this;
        },
        eat() {
            return `${this.name} is eating`;
        }
    };
    
    const dogPrototype = Object.create(animalPrototype);
    dogPrototype.bark = function() {
        return `${this.name} says Woof!`;
    };
    
    function createDog(name, breed) {
        const dog = Object.create(dogPrototype);
        dog.init(name, "Canine");
        dog.breed = breed;
        return dog;
    }
    
    const myDog = createDog("Buddy", "Golden Retriever");
    output += `${myDog.bark()}\n`;
    output += `${myDog.eat()}\n`;
    return output;
}

export const runReactExample = () => {
    return 'React hooks for performance optimization\nuseMemo and useCallback prevent unnecessary re-renders';
}

export const runNodeExample = () => {
    return 'Node.js event loop execution order:\n1. Start\n2. End\n3. nextTick\n4. setTimeout\n5. setImmediate\n6. File read';
}

export const runMongoExample = () => {
    return 'MongoDB schema design patterns:\n• Embedded documents for 1:1 relationships\n• Referenced documents for 1:many relationships\n• Choose based on query patterns and data size';
}

export const runSystemDesignExample = () => {
    return 'System Design Components:\n• Service Registry for discovery\n• API Gateway for routing\n• Load balancing for scalability\n• Caching for performance';
}

export const runShallowCopyExample = () => {
    let output = 'Shallow Copy Demonstration:\n\n';
    
    // Original object
    const original = {
        name: 'John',
        age: 30,
        address: {
            city: 'NYC',
            zip: '10001'
        }
    };
    
    // Shallow copy using spread operator
    const shallowCopy1 = { ...original };
    
    // Shallow copy using Object.assign
    const shallowCopy2 = Object.assign({}, original);
    
    // Modify top-level property - doesn't affect original
    shallowCopy1.name = 'Jane';
    output += `After modifying shallowCopy1.name:\n`;
    output += `original.name: ${original.name}\n`;
    output += `shallowCopy1.name: ${shallowCopy1.name}\n\n`;
    
    // Modify nested property - AFFECTS original!
    shallowCopy1.address.city = 'LA';
    output += `After modifying shallowCopy1.address.city:\n`;
    output += `original.address.city: ${original.address.city}\n`;
    output += `shallowCopy1.address.city: ${shallowCopy1.address.city}\n`;
    output += `shallowCopy2.address.city: ${shallowCopy2.address.city}\n\n`;
    output += '⚠️ Notice: All copies share the same nested object reference!\n';
    
    return output;
}

export const runDeepCopyExample = () => {
    let output = 'Deep Copy Demonstration:\n\n';
    
    const original = {
        name: 'John',
        age: 30,
        address: {
            city: 'NYC',
            zip: '10001'
        },
        hobbies: ['reading', 'coding']
    };
    
    // Method 1: JSON.parse/JSON.stringify (limited)
    const deepCopy1 = JSON.parse(JSON.stringify(original));
    deepCopy1.address.city = 'LA';
    output += `Method 1 (JSON):\n`;
    output += `original.address.city: ${original.address.city}\n`;
    output += `deepCopy1.address.city: ${deepCopy1.address.city}\n\n`;
    
    // Method 2: structuredClone (modern, recommended)
    try {
        const deepCopy2 = structuredClone(original);
        deepCopy2.address.city = 'SF';
        output += `Method 2 (structuredClone):\n`;
        output += `original.address.city: ${original.address.city}\n`;
        output += `deepCopy2.address.city: ${deepCopy2.address.city}\n\n`;
    } catch (e) {
        output += `Method 2 (structuredClone): Not available in this environment\n\n`;
    }
    
    output += '✅ Deep copies create completely independent objects!\n';
    
    return output;
}

// Map of function names to functions for dynamic lookup
export const exampleRunners = {
    runClosureExample,
    runVarHoisting,
    runScopeExample,
    runEventLoopExample,
    runPromiseExample,
    runAsyncAwaitExample,
    runPrototypeChainExample,
    runThisKeywordExample,
    runCallApplyBindExample,
    runInheritanceExample,
    runClassExample,
    runObjectCreateExample,
    runReactExample,
    runNodeExample,
    runMongoExample,
    runSystemDesignExample,
    runShallowCopyExample,
    runDeepCopyExample,
}

