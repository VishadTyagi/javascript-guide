# JavaScript Mastery - Interactive Learning Platform

A React-based interactive learning platform for mastering JavaScript concepts. Converted from a static HTML file to a modern React application.

## Features

- 📚 Comprehensive JavaScript learning content
- 🎯 Interactive code examples with syntax highlighting
- 💻 Run code examples directly in the browser
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful, modern UI with smooth animations
- 📊 Progress tracking for learning goals

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx          # Navigation sidebar
│   ├── MainContent.jsx      # Main content area
│   ├── LearningCard.jsx     # Individual learning cards
│   ├── CodeBlock.jsx        # Code display with highlighting
│   └── *.css                # Component styles
├── data/
│   └── learningData.js      # Learning content data
├── utils/
│   └── exampleRunners.js    # Code execution functions
├── App.jsx                  # Main app component
├── App.css                  # App styles
├── main.jsx                 # Entry point
└── index.css                # Global styles
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Prism.js** - Syntax highlighting
- **Font Awesome** - Icons

## Learning Categories

1. **Core JavaScript** - Fundamentals (Closures, Hoisting, Scope, Event Loop, Promises, Async/Await)
2. **Advanced JavaScript** - Prototypes, this keyword, Inheritance
3. **React.js & Frontend** - React hooks and patterns
4. **Node.js Backend** - Server-side JavaScript
5. **Databases** - MongoDB and database design
6. **System Design** - Scalable system architecture

## Contributing

Feel free to add more content, fix bugs, or improve the UI. All contributions are welcome!

## License

This project is open source and available for educational purposes.

