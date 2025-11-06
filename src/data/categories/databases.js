import { exampleRunners } from '../../utils/exampleRunners'

export const databases = {
        id: 'databases',
        title: 'Databases',
        description: 'Database design and optimization',
        emoji: '🗄️',
        cards: [
            {
                id: 'mongodb-crud',
                title: '1. MongoDB CRUD Operations',
                icon: 'fa-database',
                description: 'Complete guide to Create, Read, Update, and Delete operations in MongoDB.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Create Operations',
                        code: `// Insert single document
db.users.insertOne({
    name: "John Doe",
    email: "john@example.com",
    age: 30
});

// Insert multiple documents
db.users.insertMany([
    { name: "Jane Doe", email: "jane@example.com", age: 25 },
    { name: "Bob Smith", email: "bob@example.com", age: 35 }
]);

// Insert with options
db.users.insertOne(
    { name: "Alice", email: "alice@example.com" },
    { writeConcern: { w: "majority", wtimeout: 5000 } }
);

// With Mongoose
const user = await User.create({
    name: "John Doe",
    email: "john@example.com"
});

// Or using save
const user = new User({ name: "John Doe", email: "john@example.com" });
await user.save();`,
                        runFunction: null,
                        note: 'insertOne for single documents, insertMany for multiple. Mongoose create() handles validation automatically.'
                    },
                    {
                        title: 'Read Operations',
                        code: `// Find all documents
db.users.find();

// Find with filter
db.users.find({ age: { $gte: 18 } });

// Find one document
db.users.findOne({ email: "john@example.com" });

// Find by ID
db.users.findById(ObjectId("..."));

// Projection (select specific fields)
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Sort results
db.users.find().sort({ age: -1 }); // Descending
db.users.find().sort({ name: 1, age: -1 }); // Multiple fields

// Limit and skip (pagination)
db.users.find().skip(10).limit(10);

// With Mongoose
const users = await User.find({ age: { $gte: 18 } })
    .select('name email')
    .sort({ name: 1 })
    .limit(10);`,
                        runFunction: null,
                        note: 'Use find() for multiple documents, findOne() for single. Use projection to limit returned fields.'
                    },
                    {
                        title: 'Update Operations',
                        code: `// Update one document
db.users.updateOne(
    { email: "john@example.com" },
    { $set: { age: 31 } }
);

// Update multiple documents
db.users.updateMany(
    { age: { $lt: 18 } },
    { $set: { status: "minor" } }
);

// Replace entire document
db.users.replaceOne(
    { email: "john@example.com" },
    { name: "John Updated", email: "john@example.com", age: 31 }
);

// Update operators
db.users.updateOne(
    { _id: ObjectId("...") },
    {
        $set: { status: "active" },
        $inc: { loginCount: 1 },
        $push: { tags: "premium" },
        $pull: { tags: "trial" }
    }
);

// With Mongoose
await User.findByIdAndUpdate(userId, { age: 31 }, { new: true, runValidators: true });
await User.updateMany({ age: { $lt: 18 } }, { status: "minor" });`,
                        runFunction: null,
                        note: 'updateOne updates first match, updateMany updates all matches. Use $set, $inc, $push, $pull operators.'
                    },
                    {
                        title: 'Delete Operations',
                        code: `// Delete one document
db.users.deleteOne({ email: "john@example.com" });

// Delete multiple documents
db.users.deleteMany({ status: "inactive" });

// Delete all documents (use carefully!)
db.users.deleteMany({});

// With Mongoose
await User.findByIdAndDelete(userId);
await User.deleteMany({ status: "inactive" });`,
                        runFunction: null,
                        note: 'deleteOne removes first match, deleteMany removes all matches. Always use filters to avoid accidental deletion.'
                    }
                ]
            },
            {
                id: 'query-operators',
                title: '2. MongoDB Query Operators',
                icon: 'fa-search',
                description: 'Comprehensive guide to MongoDB query operators for filtering and searching.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Comparison Operators',
                        code: `// $eq - Equal
db.users.find({ age: { $eq: 30 } });
db.users.find({ age: 30 }); // Shorthand

// $ne - Not equal
db.users.find({ status: { $ne: "inactive" } });

// $gt, $gte - Greater than, greater than or equal
db.users.find({ age: { $gt: 18 } });
db.users.find({ age: { $gte: 18 } });

// $lt, $lte - Less than, less than or equal
db.users.find({ age: { $lt: 65 } });
db.users.find({ age: { $lte: 65 } });

// $in - Match any value in array
db.users.find({ status: { $in: ["active", "pending"] } });

// $nin - Not in array
db.users.find({ status: { $nin: ["banned", "deleted"] } });

// Combined
db.users.find({
    age: { $gte: 18, $lte: 65 },
    status: { $in: ["active", "pending"] }
});`,
                        runFunction: null,
                        note: 'Comparison operators allow flexible filtering. Use $in for multiple values, $gte/$lte for ranges.'
                    },
                    {
                        title: 'Logical Operators',
                        code: `// $and - All conditions must match
db.users.find({
    $and: [
        { age: { $gte: 18 } },
        { status: "active" }
    ]
});

// $or - Any condition must match
db.users.find({
    $or: [
        { age: { $lt: 18 } },
        { status: "pending" }
    ]
});

// $not - Negate condition
db.users.find({
    age: { $not: { $lt: 18 } }
});

// $nor - None of the conditions match
db.users.find({
    $nor: [
        { status: "banned" },
        { status: "deleted" }
    ]
});

// Complex queries
db.users.find({
    $and: [
        { $or: [{ age: { $gte: 18 } }, { parentApproved: true }] },
        { status: { $ne: "banned" } }
    ]
});`,
                        runFunction: null,
                        note: 'Logical operators combine conditions. $and is implicit when multiple fields are specified.'
                    },
                    {
                        title: 'Array and Element Operators',
                        code: `// $all - Array contains all specified values
db.products.find({ tags: { $all: ["electronics", "wireless"] } });

// $elemMatch - Match documents with array element matching all conditions
db.orders.find({
    items: {
        $elemMatch: {
            quantity: { $gt: 5 },
            price: { $lt: 100 }
        }
    }
});

// $size - Array size
db.products.find({ tags: { $size: 3 } });

// $exists - Field exists
db.users.find({ email: { $exists: true } });
db.users.find({ middleName: { $exists: false } });

// $type - Field type
db.users.find({ age: { $type: "number" } });
db.users.find({ createdAt: { $type: "date" } });

// Array position
db.users.find({ "addresses.0.city": "New York" }); // First address city`,
                        runFunction: null,
                        note: 'Array operators work with arrays. $elemMatch matches array elements, $size matches array length.'
                    },
                    {
                        title: 'String Operators',
                        code: `// $regex - Regular expression
db.users.find({ name: { $regex: /^John/, $options: "i" } });
db.users.find({ name: { $regex: "john", $options: "i" } });

// Case-insensitive search
db.users.find({ email: { $regex: /gmail/i } });

// $text - Full-text search (requires text index)
db.articles.createIndex({ title: "text", content: "text" });
db.articles.find({ $text: { $search: "javascript tutorial" } });

// Text search with score
db.articles.find(
    { $text: { $search: "javascript" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });

// With Mongoose
const users = await User.find({
    name: { $regex: "john", $options: "i" }
});`,
                        runFunction: null,
                        note: 'Use $regex for pattern matching, $text for full-text search. Create text indexes for better performance.'
                    }
                ]
            },
            {
                id: 'database-relationships',
                title: '3. Database Relationships',
                icon: 'fa-sitemap',
                description: 'Modeling relationships: one-to-one, one-to-many, and many-to-many in MongoDB.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'One-to-One Relationships',
                        code: `// Pattern 1: Embedded document (preferred for 1:1)
const user = {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com",
    profile: {
        bio: "Software developer",
        avatar: "https://...",
        location: "New York"
    }
};

// Pattern 2: Reference (when profile is large or shared)
const user = {
    _id: ObjectId("..."),
    name: "John Doe",
    profileId: ObjectId("...")
};

const profile = {
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    bio: "Software developer",
    avatar: "https://..."
};

// With Mongoose
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    profile: {
        bio: String,
        avatar: String,
        location: String
    }
});

// Or with reference
const userSchema = new mongoose.Schema({
    name: String,
    profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

const user = await User.findById(userId).populate('profileId');`,
                        runFunction: null,
                        note: 'For 1:1 relationships, embed when data is small and always accessed together. Reference when data is large.'
                    },
                    {
                        title: 'One-to-Many Relationships',
                        code: `// Pattern 1: Embedded array (for small, bounded arrays)
const user = {
    _id: ObjectId("..."),
    name: "John Doe",
    addresses: [
        { street: "123 Main St", city: "New York" },
        { street: "456 Oak Ave", city: "Boston" }
    ]
};

// Pattern 2: Reference (preferred for large arrays)
const user = {
    _id: ObjectId("..."),
    name: "John Doe"
};

const order = {
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    items: [...],
    total: 100
};

// With Mongoose
const userSchema = new mongoose.Schema({
    name: String,
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    total: Number
});

// Populate
const user = await User.findById(userId).populate('orders');
const order = await Order.findById(orderId).populate('userId');`,
                        runFunction: null,
                        note: 'For 1:many, embed small arrays, reference large ones. Use populate() to fetch referenced documents.'
                    },
                    {
                        title: 'Many-to-Many Relationships',
                        code: `// Pattern 1: Array of references (when array is bounded)
const course = {
    _id: ObjectId("..."),
    title: "JavaScript 101",
    students: [ObjectId("..."), ObjectId("...")]
};

const student = {
    _id: ObjectId("..."),
    name: "John Doe",
    courses: [ObjectId("..."), ObjectId("...")]
};

// Pattern 2: Junction collection (for unbounded relationships)
const enrollment = {
    _id: ObjectId("..."),
    studentId: ObjectId("..."),
    courseId: ObjectId("..."),
    enrolledAt: Date,
    grade: "A"
};

// With Mongoose
const courseSchema = new mongoose.Schema({
    title: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const studentSchema = new mongoose.Schema({
    name: String,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

// Or with junction
const enrollmentSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    enrolledAt: { type: Date, default: Date.now },
    grade: String
});

// Query with populate
const course = await Course.findById(courseId)
    .populate('students', 'name email');`,
                        runFunction: null,
                        note: 'For many-to-many, use arrays if bounded, junction collection if unbounded or needs additional data.'
                    }
                ]
            },
            {
                id: 'mongodb-transactions',
                title: '4. MongoDB Transactions',
                icon: 'fa-exchange-alt',
                description: 'Implementing ACID transactions in MongoDB for multi-document operations.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Basic Transactions',
                        code: `// Start a session
const session = await mongoose.startSession();

try {
    // Start transaction
    await session.withTransaction(async () => {
        // Operations within transaction
        const user = await User.create([{
            name: "John Doe",
            email: "john@example.com"
        }], { session });
        
        const account = await Account.create([{
            userId: user[0]._id,
            balance: 1000
        }], { session });
        
        // If any operation fails, all are rolled back
    });
} catch (error) {
    console.error('Transaction failed:', error);
} finally {
    await session.endSession();
}

// With callback
await session.withTransaction(async () => {
    await User.updateOne(
        { _id: userId },
        { $inc: { balance: -100 } },
        { session }
    );
    
    await Account.updateOne(
        { _id: accountId },
        { $inc: { balance: 100 } },
        { session }
    );
});`,
                        runFunction: null,
                        note: 'Transactions ensure ACID properties. All operations succeed or all fail. Requires replica set.'
                    },
                    {
                        title: 'Transaction Options',
                        code: `// Transaction options
const session = await mongoose.startSession();

const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
};

await session.withTransaction(async () => {
    // Transaction operations
}, transactionOptions);

// Read concern levels
// - local: Read from primary, may return uncommitted data
// - majority: Read only committed data
// - snapshot: Read from snapshot at transaction start

// Write concern
// - w: 1 (acknowledge write to primary)
// - w: 'majority' (acknowledge write to majority of nodes)
// - wtimeout: Timeout in milliseconds

// Error handling
try {
    await session.withTransaction(async () => {
        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new Error('User not found');
        }
        await User.updateOne(
            { _id: userId },
            { $set: { status: 'active' } },
            { session }
        );
    });
} catch (error) {
    if (error.hasErrorLabel('TransientTransactionError')) {
        // Retry transaction
    } else if (error.hasErrorLabel('UnknownTransactionCommitResult')) {
        // Check transaction status
    }
} finally {
    await session.endSession();
}`,
                        runFunction: null,
                        note: 'Configure read/write concerns for transaction consistency. Handle transient errors with retry logic.'
                    }
                ]
            },
            {
                id: 'database-design',
                title: '5. Database Design Principles',
                icon: 'fa-drafting-compass',
                description: 'Database design patterns, normalization, and when to embed vs reference.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Embedded vs Referenced Documents',
                        code: `// When to EMBED:
// 1. 1:1 or 1:few relationships
// 2. Data is always accessed together
// 3. Data doesn't change frequently
// 4. Document size is bounded

const user = {
    _id: ObjectId("..."),
    name: "John Doe",
    profile: { // Embedded - always accessed with user
        bio: "...",
        avatar: "..."
    },
    preferences: { // Embedded - small, bounded
        theme: "dark",
        language: "en"
    }
};

// When to REFERENCE:
// 1. 1:many or many:many relationships
// 2. Data is accessed independently
// 3. Data changes frequently
// 4. Document size is unbounded

const user = {
    _id: ObjectId("..."),
    name: "John Doe"
};

const order = { // Referenced - many orders per user
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    items: [...]
};

const blogPost = { // Referenced - large, accessed independently
    _id: ObjectId("..."),
    authorId: ObjectId("..."),
    title: "...",
    content: "..." // Large content
};`,
                        runFunction: null,
                        note: 'Embed small, frequently accessed data. Reference large, independently accessed data.'
                    },
                    {
                        title: 'Normalization vs Denormalization',
                        code: `// NORMALIZED (SQL approach)
// Separate collections for each entity
const users = [
    { _id: 1, name: "John", email: "john@example.com" }
];

const orders = [
    { _id: 1, userId: 1, total: 100 },
    { _id: 2, userId: 1, total: 200 }
];

const orderItems = [
    { orderId: 1, productId: 1, quantity: 2 },
    { orderId: 1, productId: 2, quantity: 1 }
];

// DENORMALIZED (NoSQL approach)
// Embed frequently accessed data
const orders = [
    {
        _id: 1,
        userId: 1,
        user: { // Denormalized user data
            name: "John",
            email: "john@example.com"
        },
        items: [ // Embedded items
            { productId: 1, productName: "Widget", quantity: 2, price: 50 },
            { productId: 2, productName: "Gadget", quantity: 1, price: 100 }
        ],
        total: 200
    }
];

// Hybrid approach
const orders = [
    {
        _id: 1,
        userId: 1, // Reference
        userSnapshot: { // Denormalized snapshot
            name: "John",
            email: "john@example.com"
        },
        items: [{ productId: 1, quantity: 2 }] // Reference
    }
];`,
                        runFunction: null,
                        note: 'Normalize for consistency, denormalize for performance. Use hybrid approach for balance.'
                    },
                    {
                        title: 'Schema Design Patterns',
                        code: `// 1. Attribute Pattern - For documents with many optional fields
const product = {
    _id: ObjectId("..."),
    name: "Widget",
    attributes: [
        { k: "color", v: "red" },
        { k: "size", v: "large" },
        { k: "material", v: "plastic" }
    ]
};

// 2. Bucket Pattern - For time-series data
const sensorData = {
    _id: ObjectId("..."),
    sensorId: 1,
    startDate: ISODate("2024-01-01"),
    endDate: ISODate("2024-01-31"),
    readings: [
        { timestamp: ISODate("2024-01-01T00:00:00"), value: 25.5 },
        { timestamp: ISODate("2024-01-01T01:00:00"), value: 26.1 }
        // ... more readings
    ]
};

// 3. Extended Reference Pattern - Store frequently accessed fields
const order = {
    _id: ObjectId("..."),
    userId: ObjectId("..."),
    user: { // Extended reference
        name: "John Doe",
        email: "john@example.com"
    },
    items: [{
        productId: ObjectId("..."),
        productName: "Widget", // Denormalized
        quantity: 2,
        price: 50
    }]
};

// 4. Subset Pattern - Store subset of related data
const blog = {
    _id: ObjectId("..."),
    title: "My Blog",
    recentComments: [ // Subset of all comments
        { author: "John", text: "Great post!" },
        { author: "Jane", text: "Thanks!" }
    ]
};`,
                        runFunction: null,
                        note: 'Design patterns solve common schema design challenges. Choose pattern based on access patterns.'
                    }
                ]
            },
            {
                id: 'advanced-mongoose',
                title: '6. Advanced Mongoose Features',
                icon: 'fa-magic',
                description: 'Virtual properties, middleware, plugins, and advanced Mongoose patterns.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Virtual Properties',
                        code: `const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});

// Virtual property (not stored in database)
userSchema.virtual('fullName').get(function() {
    return \`\${this.firstName} \${this.lastName}\`;
});

// Virtual with setter
userSchema.virtual('fullName')
    .get(function() {
        return \`\${this.firstName} \${this.lastName}\`;
    })
    .set(function(v) {
        const parts = v.split(' ');
        this.firstName = parts[0];
        this.lastName = parts[1];
    });

// Include virtuals in JSON
userSchema.set('toJSON', { virtuals: true });

// Usage
const user = await User.findById(userId);
console.log(user.fullName); // "John Doe"

user.fullName = "Jane Smith";
console.log(user.firstName); // "Jane"`,
                        runFunction: null,
                        note: 'Virtual properties are computed properties not stored in database. Useful for derived values.'
                    },
                    {
                        title: 'Middleware (Hooks)',
                        code: `// Pre-save hook
userSchema.pre('save', async function(next) {
    // Hash password before saving
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Post-save hook
userSchema.post('save', function(doc, next) {
    console.log(\`User \${doc.name} saved\`);
    next();
});

// Pre-remove hook
userSchema.pre('remove', async function(next) {
    // Delete related documents
    await Order.deleteMany({ userId: this._id });
    next();
});

// Pre-find hook
userSchema.pre('find', function() {
    this.where({ deleted: { $ne: true } }); // Soft delete
});

// Post-init hook
userSchema.post('init', function(doc) {
    doc.wasNew = this.isNew;
});

// Query middleware
userSchema.pre(/^find/, function(next) {
    this.start = Date.now();
    next();
});

userSchema.post(/^find/, function(docs) {
    console.log(\`Query took \${Date.now() - this.start}ms\`);
});`,
                        runFunction: null,
                        note: 'Middleware hooks run at specific lifecycle events. Use for validation, hashing, logging, etc.'
                    },
                    {
                        title: 'Plugins and Discriminators',
                        code: `// Plugin - Reusable schema functionality
function timestampPlugin(schema) {
    schema.add({
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    });
    
    schema.pre('save', function(next) {
        this.updatedAt = Date.now();
        next();
    });
}

// Use plugin
userSchema.plugin(timestampPlugin);

// Discriminator - Single collection, multiple schemas
const eventSchema = new mongoose.Schema({
    title: String,
    date: Date
}, { discriminatorKey: 'kind' });

const Event = mongoose.model('Event', eventSchema);

const ClickedLinkEvent = Event.discriminator('ClickedLink', new mongoose.Schema({
    url: String
}));

const PurchasedEvent = Event.discriminator('Purchased', new mongoose.Schema({
    productId: ObjectId,
    amount: Number
}));

// Usage
const clickEvent = new ClickedLinkEvent({
    title: "User clicked link",
    url: "https://example.com"
});

const purchaseEvent = new PurchasedEvent({
    title: "User purchased",
    productId: ObjectId("..."),
    amount: 100
});`,
                        runFunction: null,
                        note: 'Plugins add reusable functionality. Discriminators allow multiple schemas in one collection.'
                    }
                ]
            },
            {
                id: 'indexing-strategies',
                title: '7. MongoDB Indexing Strategies',
                icon: 'fa-chart-bar',
                description: 'Comprehensive guide to MongoDB indexes: types, strategies, and optimization.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Index Types',
                        code: `// Single field index
db.users.createIndex({ email: 1 }); // Ascending
db.users.createIndex({ createdAt: -1 }); // Descending

// Compound index
db.users.createIndex({ name: 1, email: -1 });
// Order matters! Use ESR rule: Equality, Sort, Range

// Multikey index (for arrays)
db.products.createIndex({ tags: 1 });

// Text index (for full-text search)
db.articles.createIndex({ title: "text", content: "text" });

// Geospatial index
db.places.createIndex({ location: "2dsphere" });

// Hashed index (for sharding)
db.users.createIndex({ email: "hashed" });

// Partial index (only index documents matching filter)
db.users.createIndex(
    { email: 1 },
    { partialFilterExpression: { status: "active" } }
);

// Sparse index (only index documents with field)
db.users.createIndex(
    { middleName: 1 },
    { sparse: true }
);

// TTL index (auto-delete after expiration)
db.sessions.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600 }
);`,
                        runFunction: null,
                        note: 'Different index types serve different purposes. Use compound indexes for multi-field queries.'
                    },
                    {
                        title: 'Index Performance and Optimization',
                        code: `// Check index usage
db.users.find({ email: "john@example.com" }).explain("executionStats");

// Analyze query plan
const explain = db.users.find({ name: "John", age: { $gte: 18 } })
    .sort({ createdAt: -1 })
    .explain("executionStats");

console.log(explain.executionStats.executionStages);

// Index hints
db.users.find({ email: "john@example.com" })
    .hint({ email: 1 });

// List indexes
db.users.getIndexes();

// Drop index
db.users.dropIndex({ email: 1 });

// Rebuild indexes
db.users.reIndex();

// Index intersection (MongoDB uses multiple indexes)
db.users.createIndex({ name: 1 });
db.users.createIndex({ age: 1 });
// Query { name: "John", age: 30 } can use both indexes

// Covering index (query uses only index, no documents)
db.users.createIndex({ name: 1, email: 1 });
db.users.find({ name: "John" }, { _id: 0, name: 1, email: 1 });
// Returns data from index only`,
                        runFunction: null,
                        note: 'Use explain() to analyze query performance. Create indexes based on query patterns, not all fields.'
                    }
                ]
            },
            {
                id: 'postgresql-sql',
                title: '8. PostgreSQL & SQL Basics',
                icon: 'fa-database',
                description: 'Introduction to SQL and PostgreSQL: queries, joins, and transactions.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'SQL Queries',
                        code: `// SELECT
SELECT * FROM users;
SELECT name, email FROM users WHERE age >= 18;

// INSERT
INSERT INTO users (name, email, age) VALUES ('John Doe', 'john@example.com', 30);
INSERT INTO users (name, email) VALUES 
    ('Jane Doe', 'jane@example.com'),
    ('Bob Smith', 'bob@example.com');

// UPDATE
UPDATE users SET age = 31 WHERE email = 'john@example.com';
UPDATE users SET status = 'active' WHERE age >= 18;

// DELETE
DELETE FROM users WHERE email = 'john@example.com';
DELETE FROM users WHERE status = 'inactive';

// With Node.js (pg)
const { Pool } = require('pg');
const pool = new Pool();

// Query
const result = await pool.query('SELECT * FROM users WHERE age >= $1', [18]);
console.log(result.rows);

// Insert
await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2)',
    ['John Doe', 'john@example.com']
);`,
                        runFunction: null,
                        note: 'SQL uses structured queries. Always use parameterized queries ($1, $2) to prevent SQL injection.'
                    },
                    {
                        title: 'JOIN Operations',
                        code: `// INNER JOIN
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

// LEFT JOIN (all users, even without orders)
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;

// RIGHT JOIN
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;

// FULL OUTER JOIN
SELECT u.name, o.total
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

// Multiple JOINs
SELECT u.name, o.total, p.name as product_name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id;

// Self JOIN
SELECT e1.name as employee, e2.name as manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;`,
                        runFunction: null,
                        note: 'JOINs combine data from multiple tables. INNER JOIN returns matching rows, LEFT JOIN returns all left rows.'
                    },
                    {
                        title: 'SQL Transactions',
                        code: `// Begin transaction
BEGIN;

// Operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

// Commit or rollback
COMMIT; // Save changes
ROLLBACK; // Undo changes

// With Node.js
const client = await pool.connect();
try {
    await client.query('BEGIN');
    
    await client.query(
        'UPDATE accounts SET balance = balance - $1 WHERE id = $2',
        [100, 1]
    );
    
    await client.query(
        'UPDATE accounts SET balance = balance + $1 WHERE id = $2',
        [100, 2]
    );
    
    await client.query('COMMIT');
} catch (err) {
    await client.query('ROLLBACK');
    throw err;
} finally {
    client.release();
}`,
                        runFunction: null,
                        note: 'Transactions ensure ACID properties. Use BEGIN/COMMIT/ROLLBACK for multi-statement operations.'
                    }
                ]
            },
            {
                id: 'mongodb',
                title: '9. MongoDB Fundamentals',
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
                title: '10. Mongoose ODM',
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
}
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\\S+@\\S+\\.\\S+$/, 'Please provide a valid email']
}
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [150, 'Age cannot exceed 150']
}
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
                title: '11. MongoDB Aggregation Pipeline',
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
}
    
    // Stage 3: Unwind array
    { $unwind: '$items' },
    
    // Stage 4: Group (aggregate)
    {
        $group: {
            _id: '$items.productId',
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
}
    
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
}
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
}
    { $sort: { totalSpent: -1 } },
    { $limit: 10 },
    {
        $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "user"
        }
}
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
                title: '12. Database Optimization & Best Practices',
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
}
