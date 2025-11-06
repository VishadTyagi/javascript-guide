# JavaScript Mastery - Interactive Learning Platform

A comprehensive React-based learning application for mastering JavaScript concepts with gamification, progress tracking, and personalized learning features.

## ✨ Features

### 📚 Learning Features
- **Interactive Code Examples** - Run code directly in the browser with syntax highlighting
- **Comprehensive Content** - 40+ learning cards covering Core JS, Advanced JS, React, Node.js, Databases, and System Design
- **Search & Filter** - Find topics quickly with real-time search and difficulty filters
- **Notes & Annotations** - Add personal notes to any learning card
- **Bookmarks** - Save favorite topics for quick access

### 🎮 Gamification
- **XP & Leveling System** - Earn XP for completing cards and bookmarks
- **Achievements** - Unlock badges as you progress
- **Daily Streaks** - Maintain learning streaks for motivation
- **Progress Tracking** - Visual progress bars and statistics

### 👤 User Features
- **User Accounts** - Create profile and track your learning journey
- **Dashboard** - View your stats, recent activity, and progress
- **Dark Mode** - Comfortable learning in any lighting
- **Responsive Design** - Learn on desktop, tablet, or mobile

### 🎯 Learning Tools
- **Learning Paths** - Structured learning journeys
- **Quizzes** - Test your knowledge (coming soon)
- **Study Goals** - Set and track daily/weekly learning goals
- **Analytics** - Detailed progress analytics

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/javascript-guide.git
cd javascript-guide
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # UI components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── quiz/          # Quiz components
│   ├── notes/         # Notes components
│   └── achievements/   # Achievements display
├── contexts/          # React Context providers
│   ├── AppContext.jsx # App state management
│   └── AuthContext.jsx # User authentication
├── hooks/             # Custom React hooks
│   ├── useProgress.js
│   ├── useTheme.js
│   ├── useSearch.js
│   ├── useAchievements.js
│   ├── useNotes.js
│   └── index.js
├── features/          # Feature modules
│   └── achievements/   # Achievement system
├── constants/         # Application constants
├── data/             # Learning content
│   └── categories/   # Category-specific data
├── utils/            # Utility functions
├── App.jsx           # Main app component
└── main.jsx          # Entry point
```

## 🎓 Learning Categories

1. **Core JavaScript** (13 topics)
   - Closures, Hoisting, Scope, Event Loop, Promises, Async/Await, Arrow Functions, Destructuring, Array Methods, Type Coercion, Error Handling, Modern Features, Shallow/Deep Copy

2. **Advanced JavaScript** (6 topics)
   - Prototypes, this, Inheritance, Generators, Proxy/Reflect, Symbols, WeakMap/WeakSet, Memory Management

3. **React.js & Frontend** (6 topics)
   - React Hooks, Context API, Redux, State Management Patterns, Testing

4. **Node.js Backend** (10 topics)
   - Event Loop, Express.js, Async Patterns, Error Handling, File Upload, Authentication, Testing, RESTful APIs, Validation, Pagination

5. **Databases** (4 topics)
   - MongoDB Fundamentals, Mongoose ODM, Aggregation Pipeline, Optimization

6. **System Design** (4 topics)
   - Architecture, Scalability, Message Queues, Security

## 🎮 How to Use

### Getting Started
1. **Create an Account** - Click "Login" in the navbar to create your profile
2. **Start Learning** - Browse categories and click on cards to expand and learn
3. **Track Progress** - Mark cards as completed to earn XP and level up
4. **Take Notes** - Add personal notes to any card for future reference
5. **View Dashboard** - Check your progress, stats, and achievements

### Features Guide

**Search**: Use `Ctrl/Cmd + K` to quickly search across all topics

**Bookmarks**: Click the bookmark icon on any card to save it

**Notes**: Expand a card and click "Add Note" to add personal annotations

**Achievements**: Complete cards to unlock achievements and earn XP

**Dark Mode**: Toggle dark mode from the sidebar theme button

## 🏗️ Architecture

This project follows modern React.js best practices:

- **Custom Hooks** - Business logic extracted into reusable hooks
- **Context API** - Global state management
- **Code Splitting** - Lazy loading for optimal performance
- **Memoization** - React.memo, useMemo, useCallback for performance
- **Error Boundaries** - Graceful error handling
- **Type-Safe Patterns** - Ready for TypeScript migration

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Prism.js** - Syntax highlighting
- **Font Awesome** - Icons
- **LocalStorage** - Data persistence

## 📊 Features Roadmap

- [x] User authentication
- [x] Progress tracking
- [x] XP & leveling system
- [x] Achievements
- [x] Notes & annotations
- [x] Dashboard & analytics
- [x] Daily streaks
- [ ] Interactive quizzes
- [ ] Learning paths
- [ ] Study reminders
- [ ] Social features (sharing progress)
- [ ] Export progress as PDF
- [ ] Offline mode with service workers

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with React and modern web technologies
- Designed for effective JavaScript learning
- Inspired by gamification and learning science principles
