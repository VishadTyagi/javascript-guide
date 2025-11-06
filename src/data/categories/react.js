import { exampleRunners } from '../../utils/exampleRunners'

export const react = {
        id: 'react',
        title: 'React.js & Frontend',
        description: 'Modern React patterns and best practices',
        emoji: '⚛️',
        cards: [
            {
                id: 'react-fundamentals',
                title: '1. React Fundamentals',
                icon: 'fa-atom',
                description: 'Core React concepts: JSX, components, props, and basic state management.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'JSX and Components',
                        code: `// JSX is JavaScript XML - syntax extension for React
// It looks like HTML but is actually JavaScript

// Functional Component
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Arrow Function Component
const Welcome = (props) => {
    return <h1>Hello, {props.name}!</h1>;
};

// JSX Rules:
// 1. Must return single element (or Fragment)
// 2. Use className instead of class
// 3. Self-closing tags must have />
// 4. JavaScript expressions in {}

// Usage
<Welcome name="John" />

// Multiple elements - use Fragment
function App() {
    return (
        <>
            <Welcome name="John" />
            <Welcome name="Jane" />
        </>
    );
}`,
                        runFunction: null,
                        note: 'JSX makes React components look like HTML, but they compile to JavaScript function calls.'
                    },
                    {
                        title: 'Props and Component Composition',
                        code: `// Props are read-only data passed to components
function UserCard({ name, email, age }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>Email: {email}</p>
            <p>Age: {age}</p>
        </div>
    );
}

// Default props
UserCard.defaultProps = {
    age: 0
};

// Or with default parameters
function UserCard({ name, email, age = 0 }) {
    // ...
}

// Component composition
function App() {
    return (
        <div>
            <UserCard name="John" email="john@example.com" age={30} />
            <UserCard name="Jane" email="jane@example.com" />
        </div>
    );
}

// Children prop
function Container({ children, title }) {
    return (
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    );
}

<Container title="Users">
    <UserCard name="John" />
</Container>`,
                        runFunction: null,
                        note: 'Props enable component reusability. Use composition to build complex UIs from simple components.'
                    },
                    {
                        title: 'Basic State with useState',
                        code: `import { useState } from 'react';

function Counter() {
    // useState returns [value, setter]
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}

// Multiple state variables
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    return (
        <form>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
        </form>
    );
}

// Functional updates
function Counter() {
    const [count, setCount] = useState(0);
    
    // Use functional update when new state depends on previous
    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };
    
    return <button onClick={increment}>{count}</button>;
}`,
                        runFunction: null,
                        note: 'useState is the most basic hook. Use functional updates when state depends on previous value.'
                    }
                ]
            },
            {
                id: 'use-effect',
                title: '2. useEffect Hook (Comprehensive)',
                icon: 'fa-sync',
                description: 'Master useEffect for side effects, lifecycle management, and cleanup.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'useEffect Basics',
                        code: `import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Runs after every render
    useEffect(() => {
        fetchUser(userId).then(data => {
            setUser(data);
            setLoading(false);
        });
    }); // No dependency array - runs every render
    
    // Runs only on mount
    useEffect(() => {
        console.log('Component mounted');
    }, []); // Empty array - runs once
    
    // Runs when userId changes
    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]); // Runs when userId changes
    
    if (loading) return <div>Loading...</div>;
    return <div>{user?.name}</div>;
}`,
                        runFunction: null,
                        note: 'useEffect handles side effects. Dependency array controls when it runs.'
                    },
                    {
                        title: 'Cleanup Functions',
                        code: `// Cleanup runs before next effect or unmount
function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);
        
        // Cleanup function
        return () => {
            clearInterval(interval);
        };
    }, []); // Empty deps - cleanup on unmount
    
    return <div>Timer: {seconds}s</div>;
}

// Event listener cleanup
function WindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    return <div>Size: {size.width} x {size.height}</div>;
}

// Subscription cleanup
function ChatRoom({ roomId }) {
    useEffect(() => {
        const subscription = subscribe(roomId, handleMessage);
        
        return () => {
            subscription.unsubscribe();
        };
    }, [roomId]);
}`,
                        runFunction: null,
                        note: 'Always cleanup subscriptions, timers, and event listeners to prevent memory leaks.'
                    },
                    {
                        title: 'Effect Patterns',
                        code: `// Pattern 1: Mount only
useEffect(() => {
    // Runs once on mount
    initializeApp();
}, []);

// Pattern 2: Update on dependency change
useEffect(() => {
    // Runs when userId changes
    fetchData(userId);
}, [userId]);

// Pattern 3: Cleanup on unmount
useEffect(() => {
    const subscription = subscribe();
    return () => subscription.unsubscribe();
}, []);

// Pattern 4: Cleanup before next effect
useEffect(() => {
    const connection = connect(userId);
    return () => {
        connection.disconnect(); // Runs before next effect
    };
}, [userId]);

// Pattern 5: Multiple effects
useEffect(() => {
    // Effect 1: Setup
}, []);

useEffect(() => {
    // Effect 2: Data fetching
}, [deps]);

// Pattern 6: Conditional effect
useEffect(() => {
    if (shouldFetch) {
        fetchData();
    }
}, [shouldFetch]);`,
                        runFunction: null,
                        note: 'Use multiple useEffect hooks to separate concerns. Each effect should handle one side effect.'
                    }
                ]
            },
            {
                id: 'event-handling',
                title: '3. Event Handling in React',
                icon: 'fa-mouse-pointer',
                description: 'Handling user interactions with synthetic events and event handlers.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Synthetic Events',
                        code: `function Button() {
    // React wraps native events in SyntheticEvent
    const handleClick = (e) => {
        e.preventDefault(); // Prevent default behavior
        e.stopPropagation(); // Stop event bubbling
        console.log('Button clicked!');
        console.log(e.target); // DOM element
        console.log(e.type); // 'click'
    };
    
    return <button onClick={handleClick}>Click me</button>;
}

// Event object is pooled (reused) - access it immediately
function Input() {
    const handleChange = (e) => {
        // ✅ Access immediately
        const value = e.target.value;
        
        // ❌ Don't access in async callback
        setTimeout(() => {
            console.log(e.target.value); // null!
        }, 1000);
        
        // ✅ Store value if needed later
        const storedValue = e.target.value;
        setTimeout(() => {
            console.log(storedValue); // Works!
        }, 1000);
    };
    
    return <input onChange={handleChange} />;
}`,
                        runFunction: null,
                        note: 'React events are SyntheticEvents. Access event properties immediately, not in async callbacks.'
                    },
                    {
                        title: 'Event Handler Patterns',
                        code: `// Inline handler
<button onClick={() => console.log('Clicked')}>
    Click
</button>

// Named function
function Button() {
    const handleClick = () => {
        console.log('Clicked');
    };
    
    return <button onClick={handleClick}>Click</button>;
}

// With parameters
function ItemList({ items }) {
    const handleItemClick = (itemId) => {
        console.log('Item clicked:', itemId);
    };
    
    return (
        <ul>
            {items.map(item => (
                <li key={item.id} onClick={() => handleItemClick(item.id)}>
                    {item.name}
                </li>
            ))}
        </ul>
    );
}

// Passing event and data
function Form() {
    const handleSubmit = (e, formData) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };
    
    return (
        <form onSubmit={(e) => handleSubmit(e, { name: 'John' })}>
            <button type="submit">Submit</button>
        </form>
    );
}

// Event delegation
function List({ items }) {
    const handleListClick = (e) => {
        // Event delegation - handle all items
        if (e.target.tagName === 'LI') {
            console.log('Item clicked:', e.target.textContent);
        }
    };
    
    return (
        <ul onClick={handleListClick}>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}`,
                        runFunction: null,
                        note: 'Use named functions for complex logic, inline for simple handlers. Event delegation can improve performance.'
                    }
                ]
            },
            {
                id: 'forms-controlled',
                title: '4. Forms and Controlled Components',
                icon: 'fa-edit',
                description: 'Building forms with controlled components, validation, and submission.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Controlled vs Uncontrolled',
                        code: `// Controlled Component - React controls the value
function ControlledInput() {
    const [value, setValue] = useState('');
    
    return (
        <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

// Uncontrolled Component - DOM controls the value
function UncontrolledInput() {
    const inputRef = useRef(null);
    
    const handleSubmit = () => {
        console.log(inputRef.current.value);
    };
    
    return (
        <input
            ref={inputRef}
            defaultValue="Initial value"
        />
    );
}

// When to use:
// Controlled: Need validation, formatting, or React state
// Uncontrolled: Simple forms, file inputs, third-party libraries`,
                        runFunction: null,
                        note: 'Controlled components give React full control. Uncontrolled components are simpler but less flexible.'
                    },
                    {
                        title: 'Form Handling',
                        code: `function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };
    
    const validate = () => {
        const newErrors = {};
        if (!formData.email.includes('@')) {
            newErrors.email = 'Invalid email';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password too short';
        }
        return newErrors;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        // Submit form
        console.log('Form submitted:', formData);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            {errors.email && <span>{errors.email}</span>}
            
            <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            {errors.password && <span>{errors.password}</span>}
            
            <button type="submit">Login</button>
        </form>
    );
}`,
                        runFunction: null,
                        note: 'Use controlled components for forms. Validate on submit and show errors inline.'
                    },
                    {
                        title: 'Advanced Form Patterns',
                        code: `// Dynamic form fields
function DynamicForm() {
    const [fields, setFields] = useState([{ id: 1, value: '' }]);
    
    const addField = () => {
        setFields([...fields, { id: Date.now(), value: '' }]);
    };
    
    const removeField = (id) => {
        setFields(fields.filter(f => f.id !== id));
    };
    
    const updateField = (id, value) => {
        setFields(fields.map(f =>
            f.id === id ? { ...f, value } : f
        ));
    };
    
    return (
        <form>
            {fields.map(field => (
                <div key={field.id}>
                    <input
                        value={field.value}
                        onChange={(e) => updateField(field.id, e.target.value)}
                    />
                    <button type="button" onClick={() => removeField(field.id)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={addField}>Add Field</button>
        </form>
    );
}

// Form with file upload
function FileUpload() {
    const [file, setFile] = useState(null);
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        
        await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
}`,
                        runFunction: null,
                        note: 'Dynamic forms require careful state management. Use FormData for file uploads.'
                    }
                ]
            },
            {
                id: 'conditional-lists',
                title: '5. Conditional Rendering & Lists',
                icon: 'fa-list',
                description: 'Rendering conditionally and displaying lists with proper keys.',
                difficulty: 'Beginner',
                examples: [
                    {
                        title: 'Conditional Rendering Patterns',
                        code: `function UserGreeting({ user }) {
    // Pattern 1: if/else
    if (user) {
        return <h1>Welcome, {user.name}!</h1>;
    }
    return <h1>Please log in</h1>;
    
    // Pattern 2: Ternary operator
    return user ? (
        <h1>Welcome, {user.name}!</h1>
    ) : (
        <h1>Please log in</h1>
    );
    
    // Pattern 3: Logical && (for single condition)
    return (
        <div>
            {user && <h1>Welcome, {user.name}!</h1>}
            {!user && <h1>Please log in</h1>}
        </div>
    );
    
    // Pattern 4: Early return
    if (!user) return <LoginForm />;
    return <Dashboard user={user} />;
}

// Conditional classes
function Button({ disabled }) {
    return (
        <button className={disabled ? 'btn disabled' : 'btn'}>
            Click
        </button>
    );
}

// Multiple conditions
function Status({ status }) {
    return (
        <div>
            {status === 'loading' && <Spinner />}
            {status === 'error' && <Error />}
            {status === 'success' && <Success />}
        </div>
    );
}`,
                        runFunction: null,
                        note: 'Use ternary for two options, && for single condition, early return for complex logic.'
                    },
                    {
                        title: 'Lists and Keys',
                        code: `function ItemList({ items }) {
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}

// Keys must be unique and stable
// ❌ Bad: Using index as key (unless list is static)
{items.map((item, index) => (
    <Item key={index} item={item} />
))}

// ✅ Good: Using unique ID
{items.map(item => (
    <Item key={item.id} item={item} />
))}

// Keys help React identify which items changed
function TodoList({ todos }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </ul>
    );
}

// Filtering and transforming lists
function ProductList({ products, category }) {
    const filtered = products.filter(p => p.category === category);
    
    return (
        <div>
            {filtered.length === 0 ? (
                <p>No products found</p>
            ) : (
                filtered.map(product => (
                    <Product key={product.id} product={product} />
                ))
            )}
        </div>
    );
}`,
                        runFunction: null,
                        note: 'Keys help React efficiently update lists. Use unique, stable IDs, not array indices.'
                    }
                ]
            },
            {
                id: 'react-router',
                title: '6. React Router',
                icon: 'fa-route',
                description: 'Client-side routing with React Router for single-page applications.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Basic Routing Setup',
                        code: `// Install: npm install react-router-dom
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

// Navigation
import { useNavigate } from 'react-router-dom';

function LoginButton() {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        // Login logic...
        navigate('/dashboard');
    };
    
    return <button onClick={handleLogin}>Login</button>;
}`,
                        runFunction: null,
                        note: 'React Router enables client-side routing. Use Link for navigation, Routes for route definitions.'
                    },
                    {
                        title: 'Route Parameters and Nested Routes',
                        code: `// Route parameters
<Route path="/users/:userId" element={<UserProfile />} />

function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetchUser(userId).then(setUser);
    }, [userId]);
    
    return <div>User: {user?.name}</div>;
}

// Query parameters
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    
    return <div>Searching for: {query}</div>;
}

// Nested routes
function App() {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}>
                <Route path="profile" element={<Profile />} />
                <Route path="settings" element={<Settings />} />
            </Route>
        </Routes>
    );
}

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <Outlet /> {/* Renders nested routes */}
        </div>
    );
}

// Protected routes
function ProtectedRoute({ children }) {
    const { user } = useAuth();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
}

<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>`,
                        runFunction: null,
                        note: 'Use useParams for route params, useSearchParams for query strings. Nest routes for complex layouts.'
                    }
                ]
            },
            {
                id: 'code-splitting',
                title: '7. Code Splitting & Lazy Loading',
                icon: 'fa-code-branch',
                description: 'Optimizing bundle size with React.lazy, Suspense, and dynamic imports.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'React.lazy and Suspense',
                        code: `import { lazy, Suspense } from 'react';

// Lazy load component
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HeavyComponent />
        </Suspense>
    );
}

// Multiple lazy components
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </Suspense>
    );
}

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}`,
                        runFunction: null,
                        note: 'React.lazy splits code at component level. Use Suspense to show loading state during code loading.'
                    },
                    {
                        title: 'Dynamic Imports and Preloading',
                        code: `// Dynamic import with loading state
function LazyImage({ src, alt }) {
    const [ImageComponent, setImageComponent] = useState(null);
    
    useEffect(() => {
        import('./HeavyImage').then(module => {
            setImageComponent(() => module.default);
        });
    }, []);
    
    if (!ImageComponent) return <div>Loading image...</div>;
    return <ImageComponent src={src} alt={alt} />;
}

// Preloading components
function Navigation() {
    const preloadDashboard = () => {
        import('./Dashboard');
    };
    
    return (
        <Link
            to="/dashboard"
            onMouseEnter={preloadDashboard}
        >
            Dashboard
        </Link>
    );
}

// Conditional lazy loading
const AdminPanel = lazy(() =>
    import('./AdminPanel').catch(() => ({
        default: () => <div>Failed to load</div>
    }))
);

// Webpack magic comments for chunk names
const Component = lazy(() =>
    import(/* webpackChunkName: "component" */ './Component')
);`,
                        runFunction: null,
                        note: 'Preload components on hover. Use error boundaries for failed lazy loads. Name chunks for better debugging.'
                    }
                ]
            },
            {
                id: 'error-boundaries',
                title: '8. Error Boundaries',
                icon: 'fa-shield-alt',
                description: 'Catching and handling errors gracefully with error boundaries.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Error Boundary Component',
                        code: `import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
        // Log to error reporting service
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong</h2>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try again
                    </button>
                </div>
            );
        }
        
        return this.props.children;
    }
}

// Usage
function App() {
    return (
        <ErrorBoundary>
            <MyComponent />
        </ErrorBoundary>
    );
}

// Functional component with error boundary library
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, errorInfo) => {
                console.error('Error:', error, errorInfo);
            }}
            onReset={() => {
                // Reset app state
            }}
        >
            <MyComponent />
        </ErrorBoundary>
    );
}`,
                        runFunction: null,
                        note: 'Error boundaries catch errors in component tree. They must be class components (or use a library).'
                    }
                ]
            },
            {
                id: 'refs-dom',
                title: '9. Refs and DOM Manipulation',
                icon: 'fa-link',
                description: 'Using refs to access DOM elements and imperative APIs.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'useRef Hook',
                        code: `import { useRef, useEffect } from 'react';

// Accessing DOM elements
function TextInput() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current?.focus();
    };
    
    useEffect(() => {
        // Auto-focus on mount
        inputRef.current?.focus();
    }, []);
    
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}

// Storing mutable values (doesn't trigger re-render)
function Timer() {
    const [count, setCount] = useState(0);
    const intervalRef = useRef(null);
    
    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);
    };
    
    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}

// Previous value tracking
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}`,
                        runFunction: null,
                        note: 'useRef can store DOM references or mutable values. Changing ref.current does not trigger re-render.'
                    },
                    {
                        title: 'forwardRef and useImperativeHandle',
                        code: `// forwardRef - pass ref to child component
const FancyInput = forwardRef((props, ref) => {
    return <input ref={ref} {...props} />;
});

function Parent() {
    const inputRef = useRef(null);
    
    return (
        <FancyInput
            ref={inputRef}
            onFocus={() => inputRef.current?.focus()}
        />
    );
}

// useImperativeHandle - customize ref value
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        scrollIntoView: () => {
            inputRef.current?.scrollIntoView();
        },
        getValue: () => {
            return inputRef.current?.value;
        }
    }));
    
    return <input ref={inputRef} {...props} />;
});

function Parent() {
    const inputRef = useRef(null);
    
    const handleClick = () => {
        inputRef.current?.focus();
        console.log(inputRef.current?.getValue());
    };
    
    return (
        <div>
            <CustomInput ref={inputRef} />
            <button onClick={handleClick}>Focus & Get Value</button>
        </div>
    );
}`,
                        runFunction: null,
                        note: 'forwardRef passes refs to child components. useImperativeHandle customizes the ref API exposed to parents.'
                    }
                ]
            },
            {
                id: 'custom-hooks',
                title: '10. Custom Hooks',
                icon: 'fa-puzzle-piece',
                description: 'Creating reusable custom hooks to share logic between components.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'Creating Custom Hooks',
                        code: `// Custom hook: useLocalStorage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });
    
    const setValue = (value) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };
    
    return [storedValue, setValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', '');
    
    return (
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
    );
}

// Custom hook: useFetch
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
    const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>{data?.name}</div>;
}`,
                        runFunction: null,
                        note: 'Custom hooks extract and reuse logic. They must start with "use" and can call other hooks.'
                    },
                    {
                        title: 'Advanced Custom Hooks',
                        code: `// useDebounce
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
}

// useWindowSize
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });
    
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return size;
}

// useClickOutside
function useClickOutside(ref, callback) {
    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        };
        
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [ref, callback]);
}

// Usage
function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    useClickOutside(dropdownRef, () => setIsOpen(false));
    
    return (
        <div ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
            {isOpen && <div>Dropdown content</div>}
        </div>
    );
}`,
                        runFunction: null,
                        note: 'Custom hooks encapsulate common patterns. Share them across components or publish as libraries.'
                    }
                ]
            },
            {
                id: 'react-hooks',
                title: '11. React Hooks Deep Dive',
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
                id: 'performance-optimization',
                title: '12. Performance Optimization',
                icon: 'fa-tachometer-alt',
                description: 'Optimizing React applications with memoization, code splitting, and profiling.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'React.memo',
                        code: `// React.memo prevents re-renders if props haven't changed
const ExpensiveComponent = React.memo(({ data }) => {
    // Expensive rendering
    return <div>{/* Complex UI */}</div>;
});

// Custom comparison function
const UserCard = React.memo(({ user }) => {
    return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
    // Return true if props are equal (skip re-render)
    return prevProps.user.id === nextProps.user.id;
});

// When to use:
// - Component renders often with same props
// - Component is expensive to render
// - Parent re-renders frequently`,
                        runFunction: null,
                        note: 'React.memo prevents unnecessary re-renders. Use when component is expensive or renders frequently.'
                    },
                    {
                        title: 'useMemo and useCallback',
                        code: `// useMemo - memoize expensive calculations
function ExpensiveList({ items, filter }) {
    const filteredItems = useMemo(() => {
        return items.filter(item => 
            item.name.toLowerCase().includes(filter.toLowerCase())
        );
    }, [items, filter]); // Recompute when items or filter changes
    
    return (
        <ul>
            {filteredItems.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}

// useCallback - memoize functions
function Parent({ items }) {
    const [count, setCount] = useState(0);
    
    // Without useCallback - new function on every render
    const handleClick = (id) => {
        console.log('Clicked:', id);
    };
    
    // With useCallback - same function reference
    const memoizedHandleClick = useCallback((id) => {
        console.log('Clicked:', id);
    }, []); // Empty deps - function never changes
    
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Count: {count}
            </button>
            <ChildList items={items} onItemClick={memoizedHandleClick} />
        </div>
    );
}

// When to use:
// useMemo: Expensive calculations, derived state
// useCallback: Functions passed to memoized children`,
                        runFunction: null,
                        note: 'useMemo caches values, useCallback caches functions. Use when dependencies are stable.'
                    },
                    {
                        title: 'Profiling and Optimization',
                        code: `// React DevTools Profiler
// 1. Record a session
// 2. Interact with app
// 3. Stop recording
// 4. Analyze render times

// useMemo for expensive operations
function DataVisualization({ data }) {
    const processedData = useMemo(() => {
        // Expensive data processing
        return data.map(item => ({
            ...item,
            computed: expensiveCalculation(item)
        }));
    }, [data]);
    
    return <Chart data={processedData} />;
}

// Virtual scrolling for long lists
import { FixedSizeList } from 'react-window';

function LongList({ items }) {
    return (
        <FixedSizeList
            height={600}
            itemCount={items.length}
            itemSize={50}
        >
            {({ index, style }) => (
                <div style={style}>
                    {items[index].name}
                </div>
            )}
        </FixedSizeList>
    );
}

// Lazy loading images
function LazyImage({ src, alt }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsLoaded(true);
                observer.disconnect();
            }
        });
        
        if (imgRef.current) {
            observer.observe(imgRef.current);
        }
        
        return () => observer.disconnect();
    }, []);
    
    return (
        <img
            ref={imgRef}
            src={isLoaded ? src : 'placeholder.jpg'}
            alt={alt}
        />
    );
}`,
                        runFunction: null,
                        note: 'Profile first, optimize second. Use React DevTools Profiler to identify bottlenecks.'
                    }
                ]
            },
            {
                id: 'hoc-pattern',
                title: '13. Higher-Order Components (HOCs)',
                icon: 'fa-layer-group',
                description: 'Using HOCs to enhance components with additional functionality.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'HOC Pattern',
                        code: `// HOC: Function that takes a component and returns enhanced component
function withLoading(Component) {
    return function WithLoadingComponent({ isLoading, ...props }) {
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return <Component {...props} />;
    };
}

// Usage
const UserProfile = ({ user }) => <div>{user.name}</div>;
const UserProfileWithLoading = withLoading(UserProfile);

// HOC with data fetching
function withDataFetching(url) {
    return function(Component) {
        return function WithDataFetchingComponent(props) {
            const [data, setData] = useState(null);
            const [loading, setLoading] = useState(true);
            
            useEffect(() => {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        setData(data);
                        setLoading(false);
                    });
            }, []);
            
            if (loading) return <div>Loading...</div>;
            return <Component data={data} {...props} />;
        };
    };
}

// Usage
const UsersList = ({ data }) => (
    <ul>
        {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
);
const UsersListWithData = withDataFetching('/api/users')(UsersList);

// HOC for authentication
function withAuth(Component) {
    return function WithAuthComponent(props) {
        const { user } = useAuth();
        
        if (!user) {
            return <Navigate to="/login" />;
        }
        
        return <Component user={user} {...props} />;
    };
}`,
                        runFunction: null,
                        note: 'HOCs enhance components with cross-cutting concerns. Less common now with hooks, but still useful.'
                    }
                ]
            },
            {
                id: 'render-props',
                title: '14. Render Props Pattern',
                icon: 'fa-code',
                description: 'Sharing code between components using render props pattern.',
                difficulty: 'Advanced',
                examples: [
                    {
                        title: 'Render Props Pattern',
                        code: `// Render prop: Component that accepts function as prop
function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return render(position);
}

// Usage
<MouseTracker
    render={({ x, y }) => (
        <div>
            Mouse position: {x}, {y}
        </div>
    )}
/>

// Children as function (common pattern)
function MouseTracker({ children }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // ... mouse tracking logic
    
    return children(position);
}

// Usage
<MouseTracker>
    {({ x, y }) => <div>Mouse: {x}, {y}</div>}
</MouseTracker>

// Data fetching with render props
function DataFetcher({ url, children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    
    return children({ data, loading, error });
}

// Usage
<DataFetcher url="/api/users">
    {({ data, loading, error }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;
        return <UserList users={data} />;
    }}
</DataFetcher>`,
                        runFunction: null,
                        note: 'Render props share logic through function props. Children as function is a common variant.'
                    }
                ]
            },
            {
                id: 'portals',
                title: '15. Portals',
                icon: 'fa-window-maximize',
                description: 'Rendering components outside the DOM hierarchy with portals.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'React Portals',
                        code: `import { createPortal } from 'react-dom';

// Portal renders children into different DOM node
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>,
        document.body // Render into body, not parent
    );
}

// Usage
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <h2>Modal Content</h2>
                <p>This is rendered in a portal!</p>
            </Modal>
        </div>
    );
}

// Tooltip with portal
function Tooltip({ children, text }) {
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);
    
    const handleMouseEnter = (e) => {
        const rect = ref.current.getBoundingClientRect();
        setPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10
        });
        setIsVisible(true);
    };
    
    return (
        <>
            <span
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsVisible(false)}
            >
                {children}
            </span>
            {isVisible && createPortal(
                <div
                    className="tooltip"
                    style={{
                        position: 'fixed',
                        left: position.x,
                        top: position.y,
                        transform: 'translateX(-50%)'
                    }}
                >
                    {text}
                </div>,
                document.body
            )}
        </>
    );
}`,
                        runFunction: null,
                        note: 'Portals render outside component tree. Useful for modals, tooltips, and overlays that need to escape parent styles.'
                    }
                ]
            },
            {
                id: 'styling-react',
                title: '16. Styling in React',
                icon: 'fa-paint-brush',
                description: 'Different approaches to styling React components: CSS Modules, Styled Components, and CSS-in-JS.',
                difficulty: 'Intermediate',
                examples: [
                    {
                        title: 'CSS Modules',
                        code: `// Button.module.css
.button {
    padding: 10px 20px;
    background: blue;
    color: white;
}

.primary {
    background: blue;
}

.secondary {
    background: gray;
}

// Button.jsx
import styles from './Button.module.css';

function Button({ variant = 'primary', children }) {
    return (
        <button className={\`\${styles.button} \${styles[variant]}\`}>
            {children}
        </button>
    );
}

// CSS Modules are scoped - no naming conflicts`,
                        runFunction: null,
                        note: 'CSS Modules provide scoped CSS. Class names are hashed to prevent conflicts.'
                    },
                    {
                        title: 'Styled Components',
                        code: `// Install: npm install styled-components
import styled from 'styled-components';

// Styled component
const Button = styled.button\`
    padding: 10px 20px;
    background: \${props => props.primary ? 'blue' : 'gray'};
    color: white;
    border: none;
    border-radius: 4px;
    
    &:hover {
        opacity: 0.8;
    }
\`;

// Usage
<Button primary>Primary Button</Button>
<Button>Secondary Button</Button>

// Extending styles
const PrimaryButton = styled(Button)\`
    background: blue;
    font-weight: bold;
\`;

// Theming
const ThemeProvider = styled.div\`
    background: \${props => props.theme.bg};
    color: \${props => props.theme.text};
\`;

// CSS-in-JS with emotion
import { css } from '@emotion/react';

const buttonStyle = css\`
    padding: 10px 20px;
    background: blue;
\`;

<button css={buttonStyle}>Click</button>`,
                        runFunction: null,
                        note: 'Styled Components enable CSS-in-JS with scoped styles. Great for component-based styling.'
                    },
                    {
                        title: 'Tailwind CSS',
                        code: `// Utility-first CSS framework
// Install: npm install -D tailwindcss

function Button({ variant, children }) {
    const baseClasses = 'px-4 py-2 rounded font-semibold';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600'
    };
    
    return (
        <button className={\`\${baseClasses} \${variantClasses[variant]}\`}>
            {children}
        </button>
    );
}

// With clsx for conditional classes
import clsx from 'clsx';

function Button({ variant, disabled, children }) {
    return (
        <button
            className={clsx(
                'px-4 py-2 rounded',
                {
                    'bg-blue-500': variant === 'primary',
                    'bg-gray-500': variant === 'secondary',
                    'opacity-50 cursor-not-allowed': disabled
                }
            )}
        >
            {children}
        </button>
    );
}`,
                        runFunction: null,
                        note: 'Tailwind CSS uses utility classes. Fast development, but can lead to long className strings.'
                    }
                ]
            },
            {
                id: 'context-api',
                title: '17. React Context API',
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
                title: '18. Redux State Management',
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
        }
        decrement: (state) => {
            state.value -= 1;
        }
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
}
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
                title: '19. State Management Patterns',
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
                title: '20. React Testing with Testing Library',
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
                title: '21. Testing Strategies & Best Practices',
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
}
