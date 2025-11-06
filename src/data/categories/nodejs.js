import { exampleRunners } from '../../utils/exampleRunners'

export const nodejs = {
        id: 'nodejs',
        title: 'Node.js Backend',
        description: 'Server-side JavaScript with Node.js',
        emoji: '🟢',
        cards: [
            {
                id: 'node-fundamentals',
                title: '1. Node.js Fundamentals',
                icon: 'fa-code',
                description: 'Core Node.js concepts: modules, global objects, and built-in modules.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'CommonJS Modules',
                        code: `// math.js - Export module
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

// Export individual functions
module.exports.add = add;
module.exports.subtract = subtract;

// Or export as object
module.exports = {
    add,
    subtract,
    multiply: (a, b) => a * b
};

// app.js - Import module
const math = require('./math');
console.log(math.add(5, 3)); // 8

// Or destructure
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8

// ES6 Modules (Node.js 14+)
// math.mjs
export function add(a, b) {
    return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(5, 3)); // 8`,
                        runFunction: null,
                        note: 'CommonJS uses require/module.exports. ES6 modules use import/export (requires .mjs extension or "type": "module").'
                    },
                    {
                        title: 'Global Objects and Variables',
                        code: `// Global objects available in Node.js

// process - Process information
console.log(process.env.NODE_ENV); // Environment
console.log(process.argv); // Command line arguments
console.log(process.cwd()); // Current working directory
process.exit(0); // Exit process

// __dirname - Current directory (CommonJS only)
console.log(__dirname); // /path/to/current/directory

// __filename - Current file path (CommonJS only)
console.log(__filename); // /path/to/current/file.js

// global - Global namespace
global.myVariable = 'Hello';
console.log(myVariable); // 'Hello'

// Buffer - Binary data
const buf = Buffer.from('Hello', 'utf8');
console.log(buf.toString()); // 'Hello'

// console - Console methods
console.log('Info');
console.error('Error');
console.warn('Warning');
console.time('timer');
// ... code ...
console.timeEnd('timer');`,
                        runFunction: null,
                        note: 'Node.js provides global objects like process, __dirname, __filename, and global for system interaction.'
                    },
                    {
                        title: 'Built-in Modules',
                        code: `// Core Node.js modules (no installation needed)

// fs - File system
const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

// path - Path manipulation
const path = require('path');
path.join(__dirname, 'public', 'index.html');
path.resolve('../config.json');
path.extname('file.txt'); // '.txt'

// http - HTTP server
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
});
server.listen(3000);

// url - URL parsing
const url = require('url');
const parsed = url.parse('https://example.com/path?query=value', true);
console.log(parsed.query); // { query: 'value' }

// util - Utilities
const util = require('util');
const promisify = util.promisify;
const readFile = promisify(fs.readFile);

// os - Operating system
const os = require('os');
console.log(os.platform()); // 'darwin', 'win32', 'linux'
console.log(os.cpus().length); // CPU count`,
                        runFunction: null,
                        note: 'Node.js includes many built-in modules. No npm install needed - just require them.'
                    }
                ]
            },
            {
                id: 'file-system',
                title: '2. File System Operations',
                icon: 'fa-file',
                description: 'Working with files and directories using the fs module and streams.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Basic File Operations',
                        code: `const fs = require('fs');
const path = require('path');

// Read file (async)
fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log(data);
});

// Read file (sync) - blocks event loop
const data = fs.readFileSync('data.txt', 'utf8');

// Write file
fs.writeFile('output.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log('File written');
});

// Append to file
fs.appendFile('log.txt', 'New log entry\\n', (err) => {
    if (err) throw err;
});

// Check if file exists
fs.access('file.txt', fs.constants.F_OK, (err) => {
    if (err) {
        console.log('File does not exist');
    } else {
        console.log('File exists');
    }
});

// Delete file
fs.unlink('file.txt', (err) => {
    if (err) throw err;
    console.log('File deleted');
});

// Read directory
fs.readdir('./', (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        console.log(file);
    });
});`,
                        runFunction: null,
                        note: 'Use async file operations to avoid blocking the event loop. Use sync versions only when necessary.'
                    },
                    {
                        title: 'Streams',
                        code: `const fs = require('fs');
const { Readable, Writable, Transform } = require('stream');

// Readable stream
const readable = fs.createReadStream('large-file.txt', {
    encoding: 'utf8',
    highWaterMark: 16 * 1024 // 16KB chunks
});

readable.on('data', (chunk) => {
    console.log('Received chunk:', chunk.length);
});

readable.on('end', () => {
    console.log('Finished reading');
});

// Writable stream
const writable = fs.createWriteStream('output.txt');

writable.write('Hello ');
writable.write('World');
writable.end();

// Piping streams
fs.createReadStream('input.txt')
    .pipe(fs.createWriteStream('output.txt'));

// Transform stream
const upperCase = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
});

fs.createReadStream('input.txt')
    .pipe(upperCase)
    .pipe(fs.createWriteStream('output.txt'));

// Error handling
readable.on('error', (err) => {
    console.error('Stream error:', err);
});`,
                        runFunction: null,
                        note: 'Streams handle large files efficiently by processing data in chunks. Use pipes to chain operations.'
                    },
                    {
                        title: 'File Watching',
                        code: `const fs = require('fs');

// Watch file for changes
fs.watch('file.txt', (eventType, filename) => {
    if (filename) {
        console.log(\`\${filename} was \${eventType}\`);
    }
});

// Watch directory
fs.watch('./directory', { recursive: true }, (eventType, filename) => {
    console.log(\`\${eventType}: \${filename}\`);
});

// More reliable watching (fs.watchFile)
fs.watchFile('file.txt', { interval: 1000 }, (curr, prev) => {
    console.log('File changed');
    console.log('Current:', curr.mtime);
    console.log('Previous:', prev.mtime);
});

// Stop watching
fs.unwatchFile('file.txt');`,
                        runFunction: null,
                        note: 'File watching is useful for auto-reload, log monitoring, and file synchronization.'
                    }
                ]
            },
            {
                id: 'http-module',
                title: '3. HTTP Module',
                icon: 'fa-server',
                description: 'Building HTTP servers without Express using Node.js built-in http module.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Basic HTTP Server',
                        code: `const http = require('http');
const url = require('url');

// Create HTTP server
const server = http.createServer((req, res) => {
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;
    
    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Handle routes
    if (path === '/api/users' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ users: ['John', 'Jane'] }));
    } else if (path === '/api/users' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201);
            res.end(JSON.stringify({ message: 'User created', data }));
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});`,
                        runFunction: null,
                        note: 'HTTP module provides low-level server creation. Express builds on top of this for easier routing.'
                    },
                    {
                        title: 'Request and Response Handling',
                        code: `const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    // Request properties
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', req.headers);
    
    // Read request body
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', () => {
        // Parse body based on content type
        let parsedBody;
        const contentType = req.headers['content-type'];
        
        if (contentType === 'application/json') {
            parsedBody = JSON.parse(body);
        } else if (contentType === 'application/x-www-form-urlencoded') {
            parsedBody = querystring.parse(body);
        }
        
        // Response
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Custom-Header': 'value'
        });
        
        res.end(JSON.stringify({
            message: 'Request received',
            body: parsedBody
        }));
    });
    
    // Handle errors
    req.on('error', (err) => {
        console.error('Request error:', err);
        res.writeHead(400);
        res.end('Bad Request');
    });
});

server.listen(3000);`,
                        runFunction: null,
                        note: 'Understanding request/response handling helps when working with Express or building custom frameworks.'
                    }
                ]
            },
            {
                id: 'env-config',
                title: '4. Environment Variables & Configuration',
                icon: 'fa-cog',
                description: 'Managing environment variables and application configuration.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Using dotenv',
                        code: `// Install: npm install dotenv

// .env file
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=myapp
JWT_SECRET=your-secret-key
API_KEY=your-api-key

// app.js
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;
const JWT_SECRET = process.env.JWT_SECRET;

console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', PORT);

// Don't commit .env to git!
// Add to .gitignore:
// .env
// .env.local
// .env.*.local`,
                        runFunction: null,
                        note: 'Use dotenv to load environment variables from .env file. Never commit .env files to version control.'
                    },
                    {
                        title: 'Configuration Management',
                        code: `// config/index.js
require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'myapp',
        url: process.env.DATABASE_URL
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRE || '7d'
    },
    api: {
        key: process.env.API_KEY,
        timeout: parseInt(process.env.API_TIMEOUT) || 5000
    }
};

// Validate required config
const requiredVars = ['JWT_SECRET', 'DB_HOST'];
requiredVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(\`Missing required environment variable: \${varName}\`);
    }
});

module.exports = config;

// Usage
const config = require('./config');
const dbUrl = \`mongodb://\${config.db.host}:\${config.db.port}/\${config.db.name}\`;`,
                        runFunction: null,
                        note: 'Centralize configuration for easier management and validation. Use different configs for dev/staging/prod.'
                    }
                ]
            },
            {
                id: 'streams-buffers',
                title: '5. Streams & Buffers',
                icon: 'fa-stream',
                description: 'Understanding streams, buffers, and efficient data processing.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Buffer Operations',
                        code: `// Buffer - Binary data handling

// Create buffer
const buf1 = Buffer.from('Hello');
const buf2 = Buffer.alloc(10); // 10 bytes
const buf3 = Buffer.allocUnsafe(10); // Faster but may contain old data

// Buffer methods
console.log(buf1.toString()); // 'Hello'
console.log(buf1.toString('base64')); // 'SGVsbG8='
console.log(buf1.length); // 5

// Buffer operations
const buf4 = Buffer.from('Hello');
const buf5 = Buffer.from(' World');
const combined = Buffer.concat([buf4, buf5]);
console.log(combined.toString()); // 'Hello World'

// Compare buffers
console.log(buf1.equals(buf2)); // false
console.log(buf1.compare(buf2)); // -1, 0, or 1

// Slice buffer
const slice = buf1.slice(0, 2);
console.log(slice.toString()); // 'He'`,
                        runFunction: null,
                        note: 'Buffers handle binary data efficiently. Use when working with files, network protocols, or binary formats.'
                    },
                    {
                        title: 'Advanced Stream Patterns',
                        code: `const { Readable, Writable, Transform, pipeline } = require('stream');
const fs = require('fs');

// Custom Readable stream
class Counter extends Readable {
    constructor(max) {
        super();
        this.max = max;
        this.count = 0;
    }
    
    _read() {
        if (this.count < this.max) {
            this.push(String(this.count++));
        } else {
            this.push(null); // End stream
        }
    }
}

const counter = new Counter(5);
counter.on('data', data => console.log(data.toString()));

// Custom Transform stream
class Uppercase extends Transform {
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

// Pipeline (handles errors automatically)
pipeline(
    fs.createReadStream('input.txt'),
    new Uppercase(),
    fs.createWriteStream('output.txt'),
    (err) => {
        if (err) {
            console.error('Pipeline error:', err);
        } else {
            console.log('Pipeline succeeded');
        }
    }
);

// Backpressure handling
const readable = fs.createReadStream('large-file.txt');
const writable = fs.createWriteStream('output.txt');

readable.on('data', (chunk) => {
    const canContinue = writable.write(chunk);
    if (!canContinue) {
        readable.pause(); // Pause reading
    }
});

writable.on('drain', () => {
    readable.resume(); // Resume reading
});`,
                        runFunction: null,
                        note: 'Streams handle backpressure automatically. Use pipeline for error handling. Create custom streams for specific needs.'
                    }
                ]
            },
            {
                id: 'node-event-loop',
                title: '6. Node.js Event Loop',
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
                id: 'database-integration',
                title: '7. Database Integration',
                icon: 'fa-database',
                description: 'Connecting to databases (MongoDB, PostgreSQL) and managing connections.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'MongoDB with Mongoose',
                        code: `// Install: npm install mongoose

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

// Define schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0, max: 150 }
}, { timestamps: true });

// Create model
const User = mongoose.model('User', userSchema);

// CRUD operations
async function createUser() {
    const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        age: 30
    });
    return user;
}

async function getUsers() {
    return await User.find();
}

async function updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUser(id) {
    return await User.findByIdAndDelete(id);
}

// Connection pooling
mongoose.connect(uri, {
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
});`,
                        runFunction: null,
                        note: 'Mongoose provides schema-based modeling for MongoDB. Use connection pooling for better performance.'
                    },
                    {
                        title: 'PostgreSQL with pg',
                        code: `// Install: npm install pg

const { Pool } = require('pg');

// Connection pool
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    max: 20, // Maximum pool size
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

// Query with pool
async function getUsers() {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    } finally {
        client.release();
    }
}

// Using pool.query (simpler)
async function getUserById(id) {
    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0];
}

// Transactions
async function transferFunds(fromId, toId, amount) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        await client.query(
            'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
            [amount, fromId]
        );
        
        await client.query(
            'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
            [amount, toId]
        );
        
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}`,
                        runFunction: null,
                        note: 'Use connection pooling for PostgreSQL. Always use parameterized queries to prevent SQL injection.'
                    }
                ]
            },
            {
                id: 'websockets',
                title: '8. WebSockets & Real-time Communication',
                icon: 'fa-plug',
                description: 'Implementing real-time features with Socket.io and WebSockets.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Socket.io Setup',
                        code: `// Install: npm install socket.io

// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Join room
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('user-joined', socket.id);
    });
    
    // Send message
    socket.on('send-message', (data) => {
        io.to(data.roomId).emit('receive-message', {
            message: data.message,
            userId: socket.id
        });
    });
    
    // Disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000);

// Client-side (browser)
// const socket = io('http://localhost:3000');
// socket.emit('join-room', 'room1');
// socket.on('receive-message', (data) => {
//     console.log('Message:', data.message);
// });`,
                        runFunction: null,
                        note: 'Socket.io enables real-time bidirectional communication. Use rooms for group messaging and namespaces for separation.'
                    }
                ]
            },
            {
                id: 'caching',
                title: '9. Caching Strategies',
                icon: 'fa-memory',
                description: 'Implementing caching with Redis and in-memory stores for performance.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Redis Caching',
                        code: `// Install: npm install redis

const redis = require('redis');
const client = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

client.on('error', (err) => console.error('Redis error:', err));
await client.connect();

// Set cache
await client.set('user:1', JSON.stringify({ id: 1, name: 'John' }));
await client.setEx('user:1', 3600, JSON.stringify({ id: 1, name: 'John' })); // With expiry

// Get cache
const cached = await client.get('user:1');
const user = JSON.parse(cached);

// Cache pattern
async function getUser(id) {
    const cacheKey = \`user:\${id}\`;
    
    // Try cache first
    const cached = await client.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }
    
    // Fetch from database
    const user = await User.findById(id);
    
    // Cache for 1 hour
    await client.setEx(cacheKey, 3600, JSON.stringify(user));
    
    return user;
}

// Cache invalidation
async function updateUser(id, data) {
    const user = await User.findByIdAndUpdate(id, data);
    await client.del(\`user:\${id}\`); // Invalidate cache
    return user;
}

// In-memory caching (simple)
const cache = new Map();

function getCached(key) {
    return cache.get(key);
}

function setCache(key, value, ttl = 3600) {
    cache.set(key, value);
    setTimeout(() => cache.delete(key), ttl * 1000);
}`,
                        runFunction: null,
                        note: 'Use Redis for distributed caching. In-memory caching works for single-server apps. Always set TTL for cache expiry.'
                    }
                ]
            },
            {
                id: 'security',
                title: '10. Security Best Practices',
                icon: 'fa-shield-alt',
                description: 'Implementing security measures: CORS, Helmet, rate limiting, and input sanitization.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Security Middleware',
                        code: `// Install: npm install helmet cors express-rate-limit

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

// Helmet - Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5 // Only 5 login attempts per 15 minutes
});

app.use('/api/auth/login', authLimiter);

// Input sanitization
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize()); // Prevent NoSQL injection

// XSS protection
const xss = require('xss-clean');
app.use(xss()); // Sanitize user input

// Parameter pollution protection
const hpp = require('hpp');
app.use(hpp()); // Prevent HTTP parameter pollution`,
                        runFunction: null,
                        note: 'Layer multiple security measures. Helmet sets security headers, CORS controls access, rate limiting prevents abuse.'
                    },
                    {
                        title: 'SQL Injection Prevention',
                        code: `// ❌ VULNERABLE - SQL Injection
app.get('/users', (req, res) => {
    const query = \`SELECT * FROM users WHERE name = '\${req.query.name}'\`;
    // If name = "'; DROP TABLE users; --"
    // Query becomes: SELECT * FROM users WHERE name = ''; DROP TABLE users; --'
    db.query(query);
});

// ✅ SAFE - Parameterized queries
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users WHERE name = $1';
    db.query(query, [req.query.name]);
});

// With Mongoose (MongoDB)
// ❌ VULNERABLE
User.find({ name: req.query.name }); // If name is an object, can be exploited

// ✅ SAFE - Validate and sanitize
const name = String(req.query.name).trim();
User.find({ name: { $eq: name } });`,
                        runFunction: null,
                        note: 'Always use parameterized queries. Never concatenate user input into queries. Validate and sanitize all inputs.'
                    }
                ]
            },
            {
                id: 'logging',
                title: '11. Logging & Monitoring',
                icon: 'fa-file-alt',
                description: 'Setting up logging with Winston and Morgan, and application monitoring.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Winston Logger',
                        code: `// Install: npm install winston

const winston = require('winston');

// Create logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// Console logging in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

// Usage
logger.info('User logged in', { userId: 123 });
logger.error('Database error', { error: err.message, stack: err.stack });
logger.warn('Rate limit exceeded', { ip: req.ip });

// Morgan HTTP logger
const morgan = require('morgan');

// Log format
app.use(morgan('combined')); // Apache combined log format
app.use(morgan('dev')); // Concise colored output
app.use(morgan(':method :url :status :response-time ms')); // Custom format

// Log to file
const fs = require('fs');
const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));`,
                        runFunction: null,
                        note: 'Use Winston for application logging and Morgan for HTTP request logging. Log levels: error, warn, info, debug.'
                    }
                ]
            },
            {
                id: 'process-management',
                title: '12. Process Management',
                icon: 'fa-tasks',
                description: 'Managing Node.js processes with PM2, clustering, and graceful shutdown.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'PM2 Process Manager',
                        code: `// Install: npm install -g pm2

// Start application
// pm2 start app.js

// PM2 ecosystem file (ecosystem.config.js)
module.exports = {
    apps: [{
        name: 'myapp',
        script: './app.js',
        instances: 4, // Number of instances
        exec_mode: 'cluster', // Cluster mode
        env: {
            NODE_ENV: 'development',
            PORT: 3000
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        },
        error_file: './logs/err.log',
        out_file: './logs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,
        autorestart: true,
        max_memory_restart: '1G'
    }]
};

// Commands:
// pm2 start ecosystem.config.js
// pm2 stop myapp
// pm2 restart myapp
// pm2 reload myapp (zero-downtime)
// pm2 delete myapp
// pm2 logs
// pm2 monit
// pm2 save
// pm2 startup

// Node.js Clustering
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numWorkers = os.cpus().length;
    console.log(\`Master \${process.pid} starting \${numWorkers} workers\`);
    
    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        console.log(\`Worker \${worker.process.pid} died\`);
        cluster.fork(); // Restart worker
    });
} else {
    // Worker process
    require('./app.js');
}`,
                        runFunction: null,
                        note: 'PM2 manages Node.js processes in production. Clustering uses all CPU cores. Use graceful shutdown for zero-downtime.'
                    },
                    {
                        title: 'Graceful Shutdown',
                        code: `// Graceful shutdown handling
const server = app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});

// Handle shutdown signals
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
    
    // Force close after 10 seconds
    setTimeout(() => {
        console.error('Forced shutdown');
        process.exit(1);
    }, 10000);
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        process.exit(0);
    });
});

// Close database connections
process.on('SIGTERM', async () => {
    await mongoose.connection.close();
    await redis.quit();
    server.close();
    process.exit(0);
});`,
                        runFunction: null,
                        note: 'Handle SIGTERM and SIGINT for graceful shutdown. Close database connections and finish ongoing requests before exiting.'
                    }
                ]
            },
            {
                id: 'child-processes',
                title: '13. Child Processes & Worker Threads',
                icon: 'fa-microchip',
                description: 'Using child processes and worker threads for CPU-intensive tasks.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Child Processes',
                        code: `const { spawn, exec, fork } = require('child_process');

// spawn - Stream-based
const ls = spawn('ls', ['-la']);

ls.stdout.on('data', (data) => {
    console.log(\`stdout: \${data}\`);
});

ls.stderr.on('data', (data) => {
    console.error(\`stderr: \${data}\`);
});

ls.on('close', (code) => {
    console.log(\`Process exited with code \${code}\`);
});

// exec - Buffer-based (for small output)
exec('ls -la', (error, stdout, stderr) => {
    if (error) {
        console.error(\`Error: \${error.message}\`);
        return;
    }
    console.log(stdout);
});

// fork - Spawn new Node.js process
const child = fork('worker.js');

child.send({ message: 'Hello from parent' });

child.on('message', (msg) => {
    console.log('Message from child:', msg);
});

// worker.js
process.on('message', (msg) => {
    console.log('Message from parent:', msg);
    process.send({ message: 'Hello from child' });
});

// Worker Threads (for CPU-intensive tasks)
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    // Main thread
    const worker = new Worker(__filename, {
        workerData: { start: 1, end: 1000000 }
    });
    
    worker.on('message', (result) => {
        console.log('Result:', result);
    });
} else {
    // Worker thread
    let sum = 0;
    for (let i = workerData.start; i < workerData.end; i++) {
        sum += i;
    }
    parentPort.postMessage(sum);
}`,
                        runFunction: null,
                        note: 'Use child processes for external commands. Use worker threads for CPU-intensive JavaScript tasks. Keep main thread responsive.'
                    }
                ]
            },
            {
                id: 'express-basics',
                title: '14. Express.js Fundamentals',
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
                title: '15. Async Patterns in Node.js',
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
                title: '16. Error Handling Best Practices',
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
                title: '17. File Upload and Processing',
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
}
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
                title: '18. Authentication & Authorization',
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
                title: '19. Testing Node.js Applications',
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
                title: '20. RESTful API Design',
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
                title: '21. API Validation & Middleware',
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
                title: '22. Pagination, Filtering & Sorting',
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
}
