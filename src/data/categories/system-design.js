import { exampleRunners } from '../../utils/exampleRunners'

export const system_design = {
        id: 'system-design',
        title: 'System Design',
        description: 'Building scalable and robust systems',
        emoji: '🧱',
        cards: [
            {
                id: 'cap-theorem',
                title: '1. CAP Theorem & Consistency Models',
                icon: 'fa-balance-scale',
                description: 'Understanding CAP theorem trade-offs and consistency models in distributed systems.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'CAP Theorem Explained',
                        code: `// CAP Theorem: You can only guarantee 2 out of 3
// C - Consistency: All nodes see same data simultaneously
// A - Availability: System remains operational
// P - Partition Tolerance: System continues despite network failures

// CP System (Consistency + Partition Tolerance)
// Example: Traditional databases (PostgreSQL, MongoDB with strong consistency)
// - Sacrifices availability during network partition
// - All nodes must agree before responding
// - Good for: Financial systems, critical data

class CPDatabase {
    async write(data) {
        // Wait for all replicas to confirm
        await Promise.all([
            this.replica1.write(data),
            this.replica2.write(data),
            this.replica3.write(data)
        ]);
        // If any replica fails, operation fails (unavailable)
    }
}

// AP System (Availability + Partition Tolerance)
// Example: NoSQL databases (Cassandra, DynamoDB)
// - Sacrifices consistency during partition
// - System remains available but may return stale data
// - Good for: Social media, content delivery

class APDatabase {
    async read(key) {
        // Return data from any available node
        // May return stale data if partition occurred
        return await this.getAnyAvailableNode().read(key);
    }
}

// CA System (Consistency + Availability)
// Example: Single-node systems
// - Only possible without network partitions
// - Not practical for distributed systems`,
                        runFunction: null,
                        note: 'CAP theorem helps choose system design. Most distributed systems choose AP or CP, not CA.'
                    },
                    {
                        title: 'Consistency Models',
                        code: `// Strong Consistency
// All reads receive the most recent write
class StrongConsistency {
    async read(key) {
        // Read from primary, wait for latest write
        return await this.primary.read(key);
    }
    
    async write(key, value) {
        // Write to all replicas before returning
        await Promise.all(this.replicas.map(r => r.write(key, value)));
        return 'success';
    }
}

// Eventual Consistency
// System will become consistent over time
class EventualConsistency {
    async read(key) {
        // Read from any replica (may be stale)
        return await this.getNearestReplica().read(key);
    }
    
    async write(key, value) {
        // Write to primary, replicate asynchronously
        await this.primary.write(key, value);
        this.replicateAsync(key, value); // Background replication
        return 'success';
    }
}

// Weak Consistency
// No guarantee of when consistency will be achieved
// Example: DNS, CDN caching

// Causal Consistency
// Causally related operations are seen in order
// Example: Social media feeds

// Read-Your-Writes Consistency
// User always sees their own writes
class ReadYourWrites {
    constructor(userId) {
        this.userId = userId;
        this.writeCache = new Map();
    }
    
    async write(key, value) {
        this.writeCache.set(key, value);
        await this.db.write(key, value);
    }
    
    async read(key) {
        // Check cache first (user's own writes)
        if (this.writeCache.has(key)) {
            return this.writeCache.get(key);
        }
        return await this.db.read(key);
    }
}`,
                        runFunction: null,
                        note: 'Choose consistency model based on use case. Strong for financial, eventual for social media.'
                    }
                ]
            },
            {
                id: 'database-sharding',
                title: '2. Database Sharding & Partitioning',
                icon: 'fa-layer-group',
                description: 'Horizontal and vertical partitioning strategies for scaling databases.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Horizontal Sharding',
                        code: `// Sharding: Split data across multiple databases

// Range-based sharding
class RangeSharding {
    constructor(shards) {
        this.shards = shards; // Array of database connections
    }
    
    getShard(userId) {
        // Shard based on user ID range
        if (userId < 1000000) return this.shards[0];
        if (userId < 2000000) return this.shards[1];
        return this.shards[2];
    }
    
    async getUser(userId) {
        const shard = this.getShard(userId);
        return await shard.query('SELECT * FROM users WHERE id = ?', [userId]);
    }
}

// Hash-based sharding
class HashSharding {
    constructor(shards) {
        this.shards = shards;
        this.numShards = shards.length;
    }
    
    getShard(key) {
        // Hash the key and modulo number of shards
        const hash = this.hash(key);
        return this.shards[hash % this.numShards];
    }
    
    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = ((hash << 5) - hash) + key.charCodeAt(i);
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }
}

// Directory-based sharding
class DirectorySharding {
    constructor() {
        this.shardMap = new Map(); // Maps key to shard
    }
    
    getShard(key) {
        return this.shardMap.get(key);
    }
    
    addMapping(key, shard) {
        this.shardMap.set(key, shard);
    }
}`,
                        runFunction: null,
                        note: 'Horizontal sharding splits data across servers. Use hash-based for even distribution, range-based for queries.'
                    },
                    {
                        title: 'Consistent Hashing',
                        code: `// Consistent Hashing - Minimizes rehashing when shards added/removed

class ConsistentHash {
    constructor() {
        this.ring = new Map(); // Hash ring
        this.sortedKeys = []; // Sorted hash positions
    }
    
    addNode(node) {
        const hash = this.hash(node);
        this.ring.set(hash, node);
        this.sortedKeys.push(hash);
        this.sortedKeys.sort((a, b) => a - b);
    }
    
    removeNode(node) {
        const hash = this.hash(node);
        this.ring.delete(hash);
        this.sortedKeys = this.sortedKeys.filter(k => k !== hash);
    }
    
    getNode(key) {
        if (this.sortedKeys.length === 0) return null;
        
        const keyHash = this.hash(key);
        
        // Find first node with hash >= keyHash
        for (const nodeHash of this.sortedKeys) {
            if (nodeHash >= keyHash) {
                return this.ring.get(nodeHash);
            }
        }
        
        // Wrap around to first node
        return this.ring.get(this.sortedKeys[0]);
    }
    
    hash(value) {
        // Simple hash function (use better in production)
        let hash = 0;
        for (let i = 0; i < value.length; i++) {
            hash = ((hash << 5) - hash) + value.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
}

// Usage
const hashRing = new ConsistentHash();
hashRing.addNode('server1');
hashRing.addNode('server2');
hashRing.addNode('server3');

const server = hashRing.getNode('user123'); // Returns appropriate server`,
                        runFunction: null,
                        note: 'Consistent hashing minimizes data movement when nodes are added/removed. Essential for distributed systems.'
                    },
                    {
                        title: 'Vertical Partitioning',
                        code: `// Vertical Partitioning: Split by columns/features

// Example: User data split by access pattern
// Hot data (frequently accessed)
const userHotData = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    lastLogin: Date.now()
};

// Cold data (rarely accessed)
const userColdData = {
    id: 1,
    profileHistory: [...],
    oldMessages: [...],
    archivedData: [...]
};

// Partition by feature
// Users service
class UserService {
    async getUser(id) {
        return await this.userDB.query('SELECT * FROM users WHERE id = ?', [id]);
    }
}

// Orders service
class OrderService {
    async getOrders(userId) {
        return await this.orderDB.query('SELECT * FROM orders WHERE userId = ?', [userId]);
    }
}

// Payments service
class PaymentService {
    async getPayments(userId) {
        return await this.paymentDB.query('SELECT * FROM payments WHERE userId = ?', [userId]);
    }
}`,
                        runFunction: null,
                        note: 'Vertical partitioning splits by features/columns. Use when different data has different access patterns.'
                    }
                ]
            },
            {
                id: 'cdn-content-delivery',
                title: '3. CDN and Content Delivery',
                icon: 'fa-globe',
                description: 'Content Delivery Networks for fast global content distribution.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'CDN Architecture',
                        code: `// CDN: Distribute content to edge servers close to users

// CDN Request Flow
class CDN {
    constructor() {
        this.originServer = 'https://api.example.com';
        this.edgeServers = [
            { region: 'us-east', url: 'https://cdn-us.example.com' },
            { region: 'eu-west', url: 'https://cdn-eu.example.com' },
            { region: 'asia-pacific', url: 'https://cdn-ap.example.com' }
        ];
    }
    
    getEdgeServer(userRegion) {
        // Route to nearest edge server
        return this.edgeServers.find(edge => 
            edge.region === this.getClosestRegion(userRegion)
        );
    }
    
    async getContent(path, userRegion) {
        const edgeServer = this.getEdgeServer(userRegion);
        
        // Check edge cache first
        let content = await edgeServer.cache.get(path);
        
        if (!content) {
            // Cache miss - fetch from origin
            content = await fetch(\`\${this.originServer}\${path}\`).then(r => r.json());
            
            // Cache at edge
            await edgeServer.cache.set(path, content, 3600); // TTL: 1 hour
        }
        
        return content;
    }
}

// Cache invalidation
class CDNWithInvalidation {
    async invalidate(path) {
        // Invalidate at all edge servers
        await Promise.all(
            this.edgeServers.map(edge => 
                edge.cache.delete(path)
            )
        );
    }
    
    async updateContent(path, newContent) {
        // Update origin
        await this.originServer.update(path, newContent);
        
        // Invalidate CDN cache
        await this.invalidate(path);
    }
}`,
                        runFunction: null,
                        note: 'CDN reduces latency by serving content from edge servers. Cache static assets, invalidate on updates.'
                    },
                    {
                        title: 'CDN Strategies',
                        code: `// Static asset delivery
// Serve images, CSS, JS from CDN
const imageUrl = 'https://cdn.example.com/images/logo.png';
const cssUrl = 'https://cdn.example.com/css/styles.css';

// Cache headers for CDN
app.get('/api/static/:file', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
    res.setHeader('CDN-Cache-Control', 'public, max-age=31536000');
    res.sendFile(path.join(__dirname, 'static', req.params.file));
});

// Dynamic content caching
app.get('/api/products/:id', async (req, res) => {
    const cacheKey = \`product:\${req.params.id}\`;
    
    // Check CDN cache
    const cached = await cdnCache.get(cacheKey);
    if (cached) {
        res.setHeader('X-Cache', 'HIT');
        return res.json(cached);
    }
    
    // Fetch from origin
    const product = await db.getProduct(req.params.id);
    
    // Cache for 5 minutes
    res.setHeader('Cache-Control', 'public, max-age=300');
    await cdnCache.set(cacheKey, product, 300);
    
    res.setHeader('X-Cache', 'MISS');
    res.json(product);
});

// Geographic routing
function getCDNUrl(userLocation) {
    const regions = {
        'US': 'https://cdn-us.example.com',
        'EU': 'https://cdn-eu.example.com',
        'ASIA': 'https://cdn-ap.example.com'
    };
    
    return regions[userLocation.region] || regions['US'];
}`,
                        runFunction: null,
                        note: 'Use CDN for static assets and cacheable dynamic content. Set appropriate cache headers.'
                    }
                ]
            },
            {
                id: 'api-design-patterns',
                title: '4. API Design Patterns',
                icon: 'fa-code',
                description: 'REST, GraphQL, and gRPC: choosing the right API architecture.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'REST API Design',
                        code: `// RESTful API Principles
// - Stateless
// - Resource-based URLs
// - HTTP methods (GET, POST, PUT, DELETE, PATCH)
// - Standard status codes

// Good REST design
GET    /api/users              // List users
GET    /api/users/123          // Get user
POST   /api/users              // Create user
PUT    /api/users/123          // Update entire user
PATCH  /api/users/123          // Partial update
DELETE /api/users/123          // Delete user

// Nested resources
GET    /api/users/123/orders   // Get user's orders
POST   /api/users/123/orders   // Create order for user

// Query parameters
GET    /api/users?page=1&limit=10&sort=name
GET    /api/users?status=active&age_min=18

// Response format
{
    "data": [...],
    "pagination": {
        "page": 1,
        "limit": 10,
        "total": 100
    },
    "links": {
        "self": "/api/users?page=1",
        "next": "/api/users?page=2"
    }
}`,
                        runFunction: null,
                        note: 'REST uses HTTP methods and resource-based URLs. Stateless, cacheable, and follows HTTP standards.'
                    },
                    {
                        title: 'GraphQL API',
                        code: `// GraphQL: Query language for APIs
// Install: npm install graphql express-graphql

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define schema
const schema = buildSchema(\`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }
    
    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
    }
    
    type Query {
        user(id: ID!): User
        users(limit: Int): [User!]!
        post(id: ID!): Post
    }
    
    type Mutation {
        createUser(name: String!, email: String!): User!
        updateUser(id: ID!, name: String): User!
    }
\`);

// Resolvers
const root = {
    user: async ({ id }) => {
        return await User.findById(id);
    },
    users: async ({ limit = 10 }) => {
        return await User.find().limit(limit);
    },
    createUser: async ({ name, email }) => {
        return await User.create({ name, email });
    }
};

// Express setup
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // GraphQL IDE
}));

// Client query
// query {
//   user(id: "123") {
//     name
//     email
//     posts {
//       title
//     }
//   }
// }`,
                        runFunction: null,
                        note: 'GraphQL allows clients to request exactly the data they need. Single endpoint, flexible queries.'
                    },
                    {
                        title: 'gRPC',
                        code: `// gRPC: High-performance RPC framework
// Uses Protocol Buffers for serialization

// .proto file definition
// user.proto
/*
syntax = "proto3";

service UserService {
    rpc GetUser (GetUserRequest) returns (User);
    rpc CreateUser (CreateUserRequest) returns (User);
    rpc ListUsers (ListUsersRequest) returns (stream User);
}

message GetUserRequest {
    string id = 1;
}

message CreateUserRequest {
    string name = 1;
    string email = 2;
}

message User {
    string id = 1;
    string name = 2;
    string email = 3;
}
*/

// Server implementation
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(userProto.UserService.service, {
    GetUser: async (call, callback) => {
        const user = await User.findById(call.request.id);
        callback(null, user);
    },
    CreateUser: async (call, callback) => {
        const user = await User.create({
            name: call.request.name,
            email: call.request.email
        });
        callback(null, user);
    }
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});

// Client
const client = new userProto.UserService('localhost:50051', 
    grpc.credentials.createInsecure());

client.GetUser({ id: '123' }, (error, user) => {
    if (error) throw error;
    console.log(user);
});`,
                        runFunction: null,
                        note: 'gRPC is faster than REST/GraphQL, uses binary protocol. Good for microservices communication.'
                    }
                ]
            },
            {
                id: 'database-replication',
                title: '5. Database Replication',
                icon: 'fa-copy',
                description: 'Master-slave and master-master replication for high availability.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Master-Slave Replication',
                        code: `// Master-Slave: One master for writes, multiple slaves for reads

class MasterSlaveDB {
    constructor() {
        this.master = new Database('master');
        this.slaves = [
            new Database('slave1'),
            new Database('slave2'),
            new Database('slave3')
        ];
    }
    
    // Write to master only
    async write(query, data) {
        const result = await this.master.execute(query, data);
        
        // Replicate to slaves asynchronously
        this.replicateToSlaves(query, data);
        
        return result;
    }
    
    // Read from slaves (load balancing)
    async read(query) {
        const slave = this.getSlave(); // Round-robin or random
        return await slave.execute(query);
    }
    
    getSlave() {
        // Round-robin selection
        const index = Math.floor(Math.random() * this.slaves.length);
        return this.slaves[index];
    }
    
    async replicateToSlaves(query, data) {
        // Async replication (don't block write)
        Promise.all(
            this.slaves.map(slave => 
                slave.execute(query, data).catch(err => {
                    console.error('Replication error:', err);
                })
            )
        );
    }
}

// MongoDB Replication
// Primary (master) handles writes
// Secondaries (slaves) handle reads

// Read preference
const user = await User.findOne({ email })
    .read('secondary'); // Read from secondary

// Write concern
await User.create(data, {
    writeConcern: { w: 'majority' } // Wait for majority of nodes
});`,
                        runFunction: null,
                        note: 'Master-slave replication: write to master, read from slaves. Improves read performance and availability.'
                    },
                    {
                        title: 'Master-Master Replication',
                        code: `// Master-Master: Multiple masters, all can read and write

class MasterMasterDB {
    constructor() {
        this.masters = [
            new Database('master1'),
            new Database('master2'),
            new Database('master3')
        ];
    }
    
    async write(query, data) {
        // Write to all masters
        const results = await Promise.all(
            this.masters.map(master => 
                master.execute(query, data)
            )
        );
        
        return results[0]; // Return first result
    }
    
    async read(query) {
        // Read from any master
        const master = this.getMaster();
        return await master.execute(query);
    }
    
    getMaster() {
        // Round-robin or based on location
        return this.masters[0];
    }
}

// Conflict resolution
class ConflictResolver {
    async resolveConflict(data1, data2, timestamp1, timestamp2) {
        // Last-write-wins (LWW)
        if (timestamp1 > timestamp2) {
            return data1;
        }
        return data2;
        
        // Or use vector clocks for causal ordering
    }
}

// Use cases:
// - Multi-region deployments
// - High availability
// - Write scaling`,
                        runFunction: null,
                        note: 'Master-master allows writes to any node. Requires conflict resolution. Good for multi-region setups.'
                    },
                    {
                        title: 'Read Replicas and Replication Lag',
                        code: `// Read Replicas: Scale read operations

class ReadReplicaDB {
    constructor() {
        this.primary = new Database('primary');
        this.replicas = [
            new Database('replica1'),
            new Database('replica2')
        ];
    }
    
    async write(query, data) {
        // Write to primary
        return await this.primary.execute(query, data);
        // Replication happens asynchronously
    }
    
    async read(query, { readPreference = 'primary' } = {}) {
        if (readPreference === 'primary') {
            return await this.primary.execute(query);
        }
        
        // Read from replica (may have replication lag)
        const replica = this.getReplica();
        return await replica.execute(query);
    }
    
    // Handle replication lag
    async readAfterWrite(query, writeResult) {
        // Read from primary to ensure consistency
        return await this.primary.execute(query);
    }
    
    // Monitor replication lag
    async getReplicationLag() {
        const primaryTime = await this.primary.getTime();
        const replicaTime = await this.replicas[0].getTime();
        return primaryTime - replicaTime;
    }
}

// Strategies:
// - Read from primary for critical reads
// - Read from replica for non-critical reads
// - Use read-after-write consistency for user's own data`,
                        runFunction: null,
                        note: 'Read replicas scale reads but may have lag. Read from primary for critical data, replicas for analytics.'
                    }
                ]
            },
            {
                id: 'distributed-systems',
                title: '6. Distributed Systems Fundamentals',
                icon: 'fa-network-wired',
                description: 'Core concepts: network partitions, consensus, and distributed challenges.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Distributed System Challenges',
                        code: `// Challenge 1: Network Partitions
// Network can split, nodes can't communicate
class NetworkPartition {
    async handlePartition() {
        // Option 1: Stop accepting writes (CP - Consistency)
        if (this.isPartitioned()) {
            throw new Error('System unavailable due to partition');
        }
        
        // Option 2: Continue accepting writes (AP - Availability)
        // May cause data inconsistency
        if (this.isPartitioned()) {
            // Accept writes, resolve conflicts later
            return this.acceptWrite();
        }
    }
}

// Challenge 2: Clock Synchronization
// Different nodes have different clocks
class ClockSync {
    // Use logical clocks (Lamport timestamps)
    constructor() {
        this.logicalClock = 0;
    }
    
    getTimestamp() {
        this.logicalClock++;
        return this.logicalClock;
    }
    
    receiveMessage(messageTimestamp) {
        this.logicalClock = Math.max(this.logicalClock, messageTimestamp) + 1;
    }
}

// Challenge 3: Distributed Consensus
// Getting all nodes to agree
class Consensus {
    // Raft algorithm (simplified)
    async electLeader() {
        // Nodes vote for leader
        // Leader coordinates all writes
        // If leader fails, new election
    }
    
    async replicateLog(entry) {
        // Leader sends log entry to followers
        // Wait for majority acknowledgment
        // Commit entry
    }
}`,
                        runFunction: null,
                        note: 'Distributed systems face network partitions, clock sync, and consensus challenges. Design for these failures.'
                    },
                    {
                        title: 'Distributed Consensus Algorithms',
                        code: `// Raft Consensus Algorithm (simplified)

class RaftNode {
    constructor(id, nodes) {
        this.id = id;
        this.nodes = nodes;
        this.state = 'follower'; // follower, candidate, leader
        this.currentTerm = 0;
        this.votedFor = null;
        this.log = [];
    }
    
    // Leader election
    async startElection() {
        this.state = 'candidate';
        this.currentTerm++;
        this.votedFor = this.id;
        
        // Request votes
        const votes = await Promise.all(
            this.nodes.map(node => 
                this.requestVote(node, this.currentTerm)
            )
        );
        
        const voteCount = votes.filter(v => v).length;
        
        if (voteCount > this.nodes.length / 2) {
            this.state = 'leader';
            this.startHeartbeat();
        }
    }
    
    // Log replication
    async appendEntry(entry) {
        if (this.state !== 'leader') {
            throw new Error('Not leader');
        }
        
        // Append to own log
        this.log.push({ term: this.currentTerm, entry });
        
        // Replicate to followers
        const results = await Promise.all(
            this.nodes.map(node => 
                this.replicateLog(node, entry)
            )
        );
        
        // Commit if majority acknowledged
        const ackCount = results.filter(r => r.success).length;
        if (ackCount > this.nodes.length / 2) {
            this.commitEntry(entry);
        }
    }
}

// Paxos (another consensus algorithm)
// More complex but handles Byzantine failures`,
                        runFunction: null,
                        note: 'Consensus algorithms (Raft, Paxos) ensure all nodes agree. Essential for distributed databases.'
                    }
                ]
            },
            {
                id: 'monitoring-observability',
                title: '7. Monitoring and Observability',
                icon: 'fa-chart-line',
                description: 'Logging, metrics, distributed tracing, and health checks for system visibility.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Structured Logging',
                        code: `// Structured logging for better analysis
const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'app.log' })
    ]
});

// Structured log format
logger.info('User login', {
    userId: 123,
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    timestamp: new Date().toISOString(),
    service: 'auth-service',
    traceId: 'abc123'
});

// Log levels
logger.error('Database connection failed', { error: err.message });
logger.warn('High memory usage', { memory: process.memoryUsage() });
logger.info('Request processed', { duration: 150, status: 200 });
logger.debug('Cache hit', { key: 'user:123' });`,
                        runFunction: null,
                        note: 'Structured logs enable better searching and analysis. Include context like userId, traceId, service name.'
                    },
                    {
                        title: 'Metrics and Monitoring',
                        code: `// Application metrics
class Metrics {
    constructor() {
        this.counters = new Map();
        this.gauges = new Map();
        this.histograms = new Map();
    }
    
    // Counter: Incrementing value
    increment(name, value = 1, labels = {}) {
        const key = this.getKey(name, labels);
        this.counters.set(key, (this.counters.get(key) || 0) + value);
    }
    
    // Gauge: Current value
    set(name, value, labels = {}) {
        const key = this.getKey(name, labels);
        this.gauges.set(key, value);
    }
    
    // Histogram: Distribution of values
    observe(name, value, labels = {}) {
        const key = this.getKey(name, labels);
        if (!this.histograms.has(key)) {
            this.histograms.set(key, []);
        }
        this.histograms.get(key).push(value);
    }
    
    getKey(name, labels) {
        return \`\${name}:\${JSON.stringify(labels)}\`;
    }
}

// Usage
const metrics = new Metrics();

// Track request count
app.use((req, res, next) => {
    metrics.increment('http_requests_total', 1, {
        method: req.method,
        path: req.path,
        status: res.statusCode
    });
    next();
});

// Track response time
const startTime = Date.now();
// ... process request
metrics.observe('http_request_duration_ms', Date.now() - startTime);

// Track active connections
metrics.set('active_connections', connectionCount);`,
                        runFunction: null,
                        note: 'Metrics track system health. Use counters for events, gauges for current values, histograms for distributions.'
                    },
                    {
                        title: 'Distributed Tracing',
                        code: `// Distributed tracing across services
class Trace {
    constructor(traceId, spanId, parentSpanId = null) {
        this.traceId = traceId;
        this.spanId = spanId;
        this.parentSpanId = parentSpanId;
        this.startTime = Date.now();
        this.tags = {};
    }
    
    addTag(key, value) {
        this.tags[key] = value;
    }
    
    finish() {
        const duration = Date.now() - this.startTime;
        return {
            traceId: this.traceId,
            spanId: this.spanId,
            parentSpanId: this.parentSpanId,
            duration,
            tags: this.tags
        };
    }
}

// Trace propagation
function createSpan(traceId, parentSpanId) {
    const spanId = generateId();
    return new Trace(traceId, spanId, parentSpanId);
}

// Pass trace context in headers
app.use((req, res, next) => {
    const traceId = req.headers['x-trace-id'] || generateId();
    const spanId = generateId();
    
    req.trace = createSpan(traceId, req.headers['x-span-id']);
    
    // Pass to downstream services
    req.headers['x-trace-id'] = traceId;
    req.headers['x-span-id'] = spanId;
    
    next();
});

// Health checks
app.get('/health', (req, res) => {
    const health = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        checks: {
            database: await checkDatabase(),
            cache: await checkCache(),
            disk: checkDiskSpace()
        }
    };
    
    const isHealthy = Object.values(health.checks).every(c => c.status === 'ok');
    res.status(isHealthy ? 200 : 503).json(health);
});`,
                        runFunction: null,
                        note: 'Distributed tracing tracks requests across services. Health checks monitor system status.'
                    }
                ]
            },
            {
                id: 'circuit-breaker',
                title: '8. Circuit Breaker Pattern',
                icon: 'fa-unlink',
                description: 'Implementing circuit breakers for fault tolerance and system resilience.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Circuit Breaker Implementation',
                        code: `// Circuit Breaker: Prevents cascading failures

class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.timeout = options.timeout || 60000; // 1 minute
        this.resetTimeout = options.resetTimeout || 30000; // 30 seconds
        
        this.failures = 0;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            // Try again - move to HALF_OPEN
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
        
        if (this.failures >= this.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.resetTimeout;
        }
    }
}

// Usage
const breaker = new CircuitBreaker({
    failureThreshold: 5,
    resetTimeout: 30000
});

async function callExternalAPI() {
    return await breaker.execute(async () => {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('API error');
        return response.json();
    });
}`,
                        runFunction: null,
                        note: 'Circuit breaker prevents calling failing services. Opens after threshold, closes after timeout.'
                    },
                    {
                        title: 'Fallback Strategies',
                        code: `// Fallback: Alternative when primary fails

class ServiceWithFallback {
    constructor(primaryService, fallbackService) {
        this.primary = primaryService;
        this.fallback = fallbackService;
        this.circuitBreaker = new CircuitBreaker();
    }
    
    async getData(key) {
        try {
            return await this.circuitBreaker.execute(() => 
                this.primary.get(key)
            );
        } catch (error) {
            console.warn('Primary service failed, using fallback');
            
            // Fallback to cache or secondary service
            try {
                return await this.fallback.get(key);
            } catch (fallbackError) {
                // Return default or cached value
                return this.getDefaultValue(key);
            }
        }
    }
    
    getDefaultValue(key) {
        // Return cached or default value
        return { data: 'default', cached: true };
    }
}

// Retry with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            const delay = Math.pow(2, i) * 1000; // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Timeout
async function withTimeout(promise, timeoutMs) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), timeoutMs)
        )
    ]);
}`,
                        runFunction: null,
                        note: 'Use fallbacks, retries, and timeouts for resilience. Circuit breaker prevents cascading failures.'
                    }
                ]
            },
            {
                id: 'idempotency',
                title: '9. Idempotency',
                icon: 'fa-redo',
                description: 'Ensuring operations can be safely retried with idempotency keys.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Idempotent Operations',
                        code: `// Idempotency: Same operation multiple times = same result

// Idempotent GET (safe)
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
    // Can be called multiple times safely
});

// Idempotent PUT (idempotent)
app.put('/api/users/:id', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(user);
    // Same request multiple times = same result
});

// Non-idempotent POST (needs idempotency key)
app.post('/api/orders', async (req, res) => {
    const idempotencyKey = req.headers['idempotency-key'];
    
    if (!idempotencyKey) {
        return res.status(400).json({ error: 'Idempotency key required' });
    }
    
    // Check if request was already processed
    const existing = await IdempotencyStore.get(idempotencyKey);
    if (existing) {
        return res.json(existing.result);
    }
    
    // Process request
    const order = await Order.create(req.body);
    
    // Store result
    await IdempotencyStore.set(idempotencyKey, {
        result: order,
        timestamp: Date.now()
    }, 3600); // TTL: 1 hour
    
    res.json(order);
});

// Idempotency store
class IdempotencyStore {
    constructor() {
        this.store = new Map(); // Use Redis in production
    }
    
    async get(key) {
        return this.store.get(key);
    }
    
    async set(key, value, ttl) {
        this.store.set(key, value);
        setTimeout(() => this.store.delete(key), ttl * 1000);
    }
}`,
                        runFunction: null,
                        note: 'Idempotency ensures safe retries. Use idempotency keys for POST/PATCH/DELETE operations.'
                    },
                    {
                        title: 'Idempotency Patterns',
                        code: `// Pattern 1: Idempotency key in header
const idempotencyKey = generateId(); // UUID

fetch('/api/orders', {
    method: 'POST',
    headers: {
        'Idempotency-Key': idempotencyKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
});

// Pattern 2: Idempotency key in request
const request = {
    idempotencyKey: generateId(),
    orderData: { ... }
};

// Pattern 3: Natural idempotency (using unique constraints)
// If email must be unique, creating user with same email is idempotent
app.post('/api/users', async (req, res) => {
    const { email, name } = req.body;
    
    // Upsert pattern (create or update)
    const user = await User.findOneAndUpdate(
        { email }, // Unique constraint
        { name },
        { upsert: true, new: true }
    );
    
    res.json(user);
});

// Pattern 4: Conditional requests (ETags)
app.put('/api/users/:id', async (req, res) => {
    const etag = req.headers['if-match'];
    const user = await User.findById(req.params.id);
    
    if (user.etag !== etag) {
        return res.status(412).json({ error: 'Precondition failed' });
    }
    
    // Update user
    const updated = await User.findByIdAndUpdate(req.params.id, req.body);
    res.setHeader('ETag', updated.etag);
    res.json(updated);
});`,
                        runFunction: null,
                        note: 'Use idempotency keys for safe retries. Natural idempotency via unique constraints is simpler.'
                    }
                ]
            },
            {
                id: 'distributed-locking',
                title: '10. Distributed Locking',
                icon: 'fa-lock',
                description: 'Implementing distributed locks for coordinating operations across services.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Redis Distributed Lock',
                        code: `// Distributed lock using Redis
const redis = require('redis');
const client = redis.createClient();

class DistributedLock {
    constructor(redisClient, key, ttl = 10000) {
        this.redis = redisClient;
        this.key = \`lock:\${key}\`;
        this.ttl = ttl; // Time to live in ms
        this.identifier = this.generateIdentifier();
    }
    
    generateIdentifier() {
        return \`\${process.pid}-\${Date.now()}-\${Math.random()}\`;
    }
    
    async acquire() {
        // Try to acquire lock
        const result = await this.redis.set(
            this.key,
            this.identifier,
            'PX', // Expire in milliseconds
            this.ttl,
            'NX'  // Only set if not exists
        );
        
        return result === 'OK';
    }
    
    async release() {
        // Lua script for atomic release
        const script = \`
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("del", KEYS[1])
            else
                return 0
            end
        \`;
        
        await this.redis.eval(script, 1, this.key, this.identifier);
    }
    
    async extend(additionalTime) {
        // Extend lock duration
        const script = \`
            if redis.call("get", KEYS[1]) == ARGV[1] then
                return redis.call("pexpire", KEYS[1], ARGV[2])
            else
                return 0
            end
        \`;
        
        return await this.redis.eval(
            script,
            1,
            this.key,
            this.identifier,
            additionalTime
        );
    }
}

// Usage
const lock = new DistributedLock(client, 'resource:123', 5000);

if (await lock.acquire()) {
    try {
        // Critical section
        await processResource('resource:123');
    } finally {
        await lock.release();
    }
} else {
    console.log('Could not acquire lock');
}`,
                        runFunction: null,
                        note: 'Distributed locks coordinate access to shared resources. Use Redis with NX and expiration.'
                    },
                    {
                        title: 'Lock Patterns and Best Practices',
                        code: `// Pattern 1: Lock with retry
async function acquireLockWithRetry(lock, maxRetries = 10, retryDelay = 100) {
    for (let i = 0; i < maxRetries; i++) {
        if (await lock.acquire()) {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
    return false;
}

// Pattern 2: Lock with timeout
async function acquireLockWithTimeout(lock, timeout = 5000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
        if (await lock.acquire()) {
            return true;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return false;
}

// Pattern 3: Read-Write Lock
class ReadWriteLock {
    constructor(redis, key) {
        this.redis = redis;
        this.readKey = \`read:\${key}\`;
        this.writeKey = \`write:\${key}\`;
    }
    
    async acquireRead() {
        // Multiple readers allowed, but no writers
        // Implementation depends on Redis or other store
    }
    
    async acquireWrite() {
        // Exclusive access, no readers or writers
    }
}

// Pattern 4: Deadlock prevention
// - Always acquire locks in same order
// - Use timeouts
// - Release locks in reverse order

async function processWithOrderedLocks(resource1, resource2) {
    // Always lock in same order (e.g., by ID)
    const [first, second] = [resource1, resource2].sort();
    
    const lock1 = new DistributedLock(client, first, 5000);
    const lock2 = new DistributedLock(client, second, 5000);
    
    if (await lock1.acquire()) {
        try {
            if (await lock2.acquire()) {
                try {
                    // Process both resources
                } finally {
                    await lock2.release();
                }
            }
        } finally {
            await lock1.release();
        }
    }
}`,
                        runFunction: null,
                        note: 'Use retries and timeouts for locks. Prevent deadlocks by acquiring locks in consistent order.'
                    }
                ]
            },
            {
                id: 'service-discovery',
                title: '11. Service Discovery',
                icon: 'fa-search',
                description: 'Service registry, health checks, and dynamic service location.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Service Registry Pattern',
                        code: `// Service Registry: Central directory of services

class ServiceRegistry {
    constructor() {
        this.services = new Map(); // serviceName -> [instances]
        this.healthChecks = new Map();
    }
    
    // Register service
    register(serviceName, instance) {
        if (!this.services.has(serviceName)) {
            this.services.set(serviceName, []);
        }
        
        this.services.get(serviceName).push({
            url: instance.url,
            port: instance.port,
            health: 'healthy',
            registeredAt: Date.now()
        });
        
        // Start health check
        this.startHealthCheck(serviceName, instance);
    }
    
    // Discover service
    discover(serviceName) {
        const instances = this.services.get(serviceName) || [];
        const healthy = instances.filter(i => i.health === 'healthy');
        
        if (healthy.length === 0) {
            throw new Error(\`No healthy instances of \${serviceName}\`);
        }
        
        // Load balancing: round-robin or random
        return this.selectInstance(healthy);
    }
    
    selectInstance(instances) {
        // Round-robin
        const index = Math.floor(Math.random() * instances.length);
        return instances[index];
    }
    
    // Health check
    async startHealthCheck(serviceName, instance) {
        setInterval(async () => {
            try {
                const response = await fetch(\`\${instance.url}/health\`);
                if (response.ok) {
                    this.updateHealth(serviceName, instance.url, 'healthy');
                } else {
                    this.updateHealth(serviceName, instance.url, 'unhealthy');
                }
            } catch (error) {
                this.updateHealth(serviceName, instance.url, 'unhealthy');
            }
        }, 5000); // Check every 5 seconds
    }
    
    updateHealth(serviceName, url, health) {
        const instances = this.services.get(serviceName) || [];
        const instance = instances.find(i => i.url === url);
        if (instance) {
            instance.health = health;
        }
    }
    
    // Deregister service
    deregister(serviceName, url) {
        const instances = this.services.get(serviceName) || [];
        const filtered = instances.filter(i => i.url !== url);
        this.services.set(serviceName, filtered);
    }
}

// Service registration
const registry = new ServiceRegistry();

app.listen(3000, () => {
    registry.register('user-service', {
        url: 'http://localhost',
        port: 3000
    });
});

// Service discovery
app.get('/api/users', async (req, res) => {
    const userService = registry.discover('user-service');
    const response = await fetch(\`\${userService.url}:\${userService.port}/users\`);
    res.json(await response.json());
});`,
                        runFunction: null,
                        note: 'Service registry enables dynamic service discovery. Health checks ensure only healthy instances are used.'
                    }
                ]
            },
            {
                id: 'api-gateway-comprehensive',
                title: '12. API Gateway (Comprehensive)',
                icon: 'fa-door-open',
                description: 'Complete API Gateway implementation: routing, auth, rate limiting, and transformation.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'API Gateway Architecture',
                        code: `// API Gateway: Single entry point for all client requests

class APIGateway {
    constructor() {
        this.routes = new Map();
        this.middleware = [];
    }
    
    // Route registration
    registerRoute(path, method, service, endpoint) {
        const key = \`\${method}:\${path}\`;
        this.routes.set(key, { service, endpoint });
    }
    
    // Middleware registration
    use(middleware) {
        this.middleware.push(middleware);
    }
    
    // Request handling
    async handleRequest(req, res) {
        const { path, method } = req;
        const routeKey = \`\${method}:\${path}\`;
        const route = this.routes.get(routeKey);
        
        if (!route) {
            return res.status(404).json({ error: 'Not found' });
        }
        
        // Run middleware
        for (const middleware of this.middleware) {
            const result = await middleware(req, res);
            if (result === false) return; // Middleware blocked request
        }
        
        // Route to service
        const serviceUrl = this.getServiceUrl(route.service);
        const targetUrl = \`\${serviceUrl}\${route.endpoint}\`;
        
        // Proxy request
        const response = await fetch(targetUrl, {
            method: req.method,
            headers: req.headers,
            body: req.body
        });
        
        const data = await response.json();
        res.status(response.status).json(data);
    }
    
    getServiceUrl(serviceName) {
        // Service discovery
        return this.serviceRegistry.discover(serviceName).url;
    }
}

// Authentication middleware
function authMiddleware(req, res) {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ error: 'Unauthorized' });
        return false;
    }
    
    // Validate token
    const user = validateToken(token);
    req.user = user;
    return true;
}

// Rate limiting middleware
function rateLimitMiddleware(req, res) {
    const limiter = new RateLimiter(100, 60); // 100 requests per minute
    
    if (!limiter.allow(req.ip)) {
        res.status(429).json({ error: 'Too many requests' });
        return false;
    }
    
    return true;
}

// Request transformation
function transformRequest(req) {
    // Add user context
    req.headers['x-user-id'] = req.user.id;
    
    // Transform path
    if (req.path.startsWith('/api/v1/')) {
        req.path = req.path.replace('/api/v1/', '/');
    }
    
    return req;
}

// Response transformation
function transformResponse(response) {
    // Add CORS headers
    response.headers['Access-Control-Allow-Origin'] = '*';
    
    // Transform response format
    return {
        data: response.data,
        meta: {
            timestamp: Date.now(),
            version: '1.0'
        }
    };
}`,
                        runFunction: null,
                        note: 'API Gateway centralizes cross-cutting concerns: auth, rate limiting, routing, transformation.'
                    }
                ]
            },
            {
                id: 'system-architecture',
                title: '13. System Breakdown & Architecture',
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
                title: '14. Scalability Patterns',
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
            },
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
                title: '15. Message Queues and Event-Driven Architecture',
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
                id: 'event-sourcing',
                title: '16. Event Sourcing',
                icon: 'fa-history',
                description: 'Storing state changes as a sequence of events for auditability and replay.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Event Sourcing Basics',
                        code: `// Event Sourcing: Store events instead of current state

// Event store
class EventStore {
    constructor() {
        this.events = []; // In production, use database
    }
    
    async append(streamId, event) {
        this.events.push({
            streamId,
            eventType: event.type,
            eventData: event.data,
            timestamp: Date.now(),
            version: this.getNextVersion(streamId)
        });
    }
    
    async getEvents(streamId) {
        return this.events.filter(e => e.streamId === streamId);
    }
    
    getNextVersion(streamId) {
        const events = this.getEvents(streamId);
        return events.length + 1;
    }
}

// Aggregate (current state from events)
class Account {
    constructor(id) {
        this.id = id;
        this.balance = 0;
        this.version = 0;
    }
    
    // Replay events to rebuild state
    replay(events) {
        events.forEach(event => {
            this.apply(event);
            this.version++;
        });
    }
    
    apply(event) {
        switch (event.eventType) {
            case 'AccountOpened':
                this.balance = event.eventData.initialBalance;
                break;
            case 'MoneyDeposited':
                this.balance += event.eventData.amount;
                break;
            case 'MoneyWithdrawn':
                this.balance -= event.eventData.amount;
                break;
        }
    }
    
    // Command: Open account
    openAccount(initialBalance) {
        const event = {
            type: 'AccountOpened',
            data: { initialBalance }
        };
        this.apply(event);
        return event;
    }
    
    // Command: Deposit
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        
        const event = {
            type: 'MoneyDeposited',
            data: { amount }
        };
        this.apply(event);
        return event;
    }
}

// Usage
const eventStore = new EventStore();
const account = new Account('account-123');

// Execute command
const event = account.deposit(100);

// Store event
await eventStore.append('account-123', event);

// Rebuild state from events
const events = await eventStore.getEvents('account-123');
const rebuiltAccount = new Account('account-123');
rebuiltAccount.replay(events);
console.log(rebuiltAccount.balance); // 100`,
                        runFunction: null,
                        note: 'Event sourcing stores events, not state. Replay events to rebuild current state. Great for audit trails.'
                    },
                    {
                        title: 'Event Sourcing with Snapshots',
                        code: `// Snapshots: Periodic state snapshots for faster replay

class SnapshotStore {
    constructor() {
        this.snapshots = new Map();
    }
    
    save(streamId, state, version) {
        this.snapshots.set(streamId, { state, version, timestamp: Date.now() });
    }
    
    get(streamId) {
        return this.snapshots.get(streamId);
    }
}

// Rebuild with snapshot
async function rebuildAggregate(streamId, eventStore, snapshotStore) {
    // Get snapshot
    const snapshot = snapshotStore.get(streamId);
    
    // Get events after snapshot
    const allEvents = await eventStore.getEvents(streamId);
    const eventsAfterSnapshot = snapshot
        ? allEvents.filter(e => e.version > snapshot.version)
        : allEvents;
    
    // Rebuild from snapshot
    const aggregate = snapshot
        ? new Account(streamId).replay(snapshot.state)
        : new Account(streamId);
    
    // Replay events after snapshot
    aggregate.replay(eventsAfterSnapshot);
    
    return aggregate;
}

// Create snapshot periodically
async function createSnapshot(streamId, aggregate, snapshotStore) {
    snapshotStore.save(streamId, {
        balance: aggregate.balance,
        version: aggregate.version
    }, aggregate.version);
}`,
                        runFunction: null,
                        note: 'Snapshots speed up replay by storing periodic state. Replay only events after snapshot.'
                    }
                ]
            },
            {
                id: 'cqrs',
                title: '17. CQRS (Command Query Responsibility Segregation)',
                icon: 'fa-code-branch',
                description: 'Separating read and write models for better scalability and performance.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'CQRS Pattern',
                        code: `// CQRS: Separate read and write models

// Command Side (Write Model)
class CommandHandler {
    constructor(eventStore) {
        this.eventStore = eventStore;
    }
    
    async handleCreateUser(command) {
        // Validate command
        if (!command.name || !command.email) {
            throw new Error('Invalid command');
        }
        
        // Create aggregate
        const user = new User(command.id);
        const event = user.create(command.name, command.email);
        
        // Store event
        await this.eventStore.append(command.id, event);
        
        // Publish event for read model update
        await this.eventBus.publish('UserCreated', event);
    }
    
    async handleUpdateUser(command) {
        // Load aggregate from events
        const events = await this.eventStore.getEvents(command.id);
        const user = new User(command.id);
        user.replay(events);
        
        // Execute command
        const event = user.update(command.name);
        
        // Store event
        await this.eventStore.append(command.id, event);
        
        // Publish event
        await this.eventBus.publish('UserUpdated', event);
    }
}

// Query Side (Read Model)
class QueryHandler {
    constructor(readDatabase) {
        this.db = readDatabase; // Optimized for reads
    }
    
    async getUser(id) {
        // Direct read from optimized read model
        return await this.db.query('SELECT * FROM user_read_model WHERE id = ?', [id]);
    }
    
    async searchUsers(query) {
        // Optimized search query
        return await this.db.query(
            'SELECT * FROM user_read_model WHERE name LIKE ?',
            ['%' + query + '%']
        );
    }
}

// Read Model Updater (listens to events)
class ReadModelUpdater {
    constructor(readDatabase) {
        this.db = readDatabase;
        this.setupEventHandlers();
    }
    
    setupEventHandlers() {
        eventBus.on('UserCreated', this.handleUserCreated.bind(this));
        eventBus.on('UserUpdated', this.handleUserUpdated.bind(this));
    }
    
    async handleUserCreated(event) {
        // Update read model
        await this.db.query(
            'INSERT INTO user_read_model (id, name, email) VALUES (?, ?, ?)',
            [event.streamId, event.data.name, event.data.email]
        );
    }
    
    async handleUserUpdated(event) {
        await this.db.query(
            'UPDATE user_read_model SET name = ? WHERE id = ?',
            [event.data.name, event.streamId]
        );
    }
}`,
                        runFunction: null,
                        note: 'CQRS separates reads and writes. Write model uses events, read model is optimized for queries.'
                    }
                ]
            },
            {
                id: 'design-interviews',
                title: '18. System Design Interview Patterns',
                icon: 'fa-clipboard-list',
                description: 'Common system design interview questions and solutions.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Design a URL Shortener',
                        code: `// URL Shortener (like bit.ly)

// Requirements:
// - Shorten long URLs
// - Redirect short URLs to long URLs
// - Handle high traffic (100M URLs/day)
// - Short URL: 7 characters

// Solution:

// 1. Encoding (Base62: a-z, A-Z, 0-9)
function encodeBase62(num) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    while (num > 0) {
        result = chars[num % 62] + result;
        num = Math.floor(num / 62);
    }
    
    return result.padStart(7, 'a');
}

// 2. Database Schema
// ShortURLs table:
// - id (auto-increment)
// - shortCode (indexed, unique)
// - longURL
// - createdAt
// - expiresAt

// 3. API
app.post('/api/shorten', async (req, res) => {
    const { longUrl } = req.body;
    
    // Check if already exists
    let existing = await db.findOne({ longUrl });
    if (existing) {
        return res.json({ shortUrl: existing.shortCode });
    }
    
    // Generate unique short code
    const id = await db.getNextId();
    const shortCode = encodeBase62(id);
    
    // Store
    await db.insert({
        shortCode,
        longUrl,
        createdAt: Date.now()
    });
    
    res.json({ shortUrl: shortCode });
});

app.get('/:shortCode', async (req, res) => {
    const { shortCode } = req.params;
    
    // Check cache first
    const cached = await cache.get(shortCode);
    if (cached) {
        return res.redirect(cached);
    }
    
    // Get from database
    const record = await db.findOne({ shortCode });
    if (!record) {
        return res.status(404).json({ error: 'Not found' });
    }
    
    // Cache for 1 hour
    await cache.set(shortCode, record.longUrl, 3600);
    
    res.redirect(record.longUrl);
});

// 4. Scaling:
// - Use consistent hashing for sharding
// - Cache frequently accessed URLs
// - Use CDN for redirects
// - Database read replicas`,
                        runFunction: null,
                        note: 'URL shortener: encode IDs to base62, cache redirects, shard database, use CDN.'
                    },
                    {
                        title: 'Design a Chat System',
                        code: `// Real-time Chat System

// Requirements:
// - 1:1 and group chats
// - Real-time messaging
// - Message history
// - Online/offline status
// - 1M concurrent users

// Architecture:

// 1. WebSocket Server (Socket.io)
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    const userId = socket.handshake.auth.userId;
    
    // Join user's room
    socket.join(\`user:\${userId}\`);
    
    // Send message
    socket.on('send-message', async (data) => {
        const { chatId, message } = data;
        
        // Store message
        const msg = await Message.create({
            chatId,
            userId,
            message,
            timestamp: Date.now()
        });
        
        // Get chat participants
        const chat = await Chat.findById(chatId);
        
        // Send to all participants
        chat.participants.forEach(participantId => {
            io.to(\`user:\${participantId}\`).emit('new-message', msg);
        });
    });
    
    // Typing indicator
    socket.on('typing', (data) => {
        socket.to(\`chat:\${data.chatId}\`).emit('user-typing', {
            userId,
            chatId: data.chatId
        });
    });
});

// 2. Database Schema
// Chats: id, type (1:1, group), participants, createdAt
// Messages: id, chatId, userId, message, timestamp
// UserStatus: userId, status, lastSeen

// 3. Message Queue (for offline users)
// If user offline, queue message
// When user comes online, deliver queued messages

// 4. Scaling:
// - Multiple WebSocket servers
// - Redis pub/sub for cross-server communication
// - Database sharding by chatId
// - Message pagination`,
                        runFunction: null,
                        note: 'Chat system: WebSockets for real-time, message queue for offline, Redis pub/sub for scaling.'
                    }
                ]
            },
            {
                id: 'security',
                title: '19. Security & Performance Optimization',
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
