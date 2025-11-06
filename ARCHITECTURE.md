# React Architecture Documentation

This project follows modern React.js best practices and patterns for maintainability, performance, and scalability.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CodeBlock.jsx
│   ├── ErrorBoundary.jsx
│   ├── LearningCard.jsx
│   ├── MainContent.jsx
│   ├── MobileToggle.jsx
│   └── Sidebar.jsx
├── contexts/           # React Context providers
│   └── AppContext.jsx
├── hooks/              # Custom React hooks
│   ├── useExpandedCards.js
│   ├── useKeyboardShortcuts.js
│   ├── useProgress.js
│   ├── useProgressCalculation.js
│   ├── useSearch.js
│   ├── useTheme.js
│   └── index.js
├── constants/          # Application constants
│   └── categories.js
├── data/               # Static data and content
│   ├── categories/
│   └── learningData.js
├── utils/              # Utility functions
│   ├── exampleRunners.js
│   └── storage.js
├── App.jsx             # Main app component
└── main.jsx            # Entry point
```

## 🏗️ Architecture Patterns

### 1. **Custom Hooks Pattern**
Business logic is extracted into reusable custom hooks:
- `useProgress` - Manages completed cards and bookmarks
- `useTheme` - Handles dark/light mode
- `useSearch` - Search and filtering logic
- `useExpandedCards` - Card expansion state
- `useKeyboardShortcuts` - Keyboard event handling

**Benefits:**
- Separation of concerns
- Reusable logic
- Easier testing
- Cleaner components

### 2. **Context API Pattern**
Global state is managed through React Context:
- `AppContext` - Category selection, sidebar state, filters

**Benefits:**
- Avoids prop drilling
- Centralized state management
- Easy to extend

### 3. **Component Memoization**
Components use `React.memo` with custom comparison functions:
- Prevents unnecessary re-renders
- Improves performance
- Custom comparison for fine-grained control

### 4. **Code Splitting**
Components are lazy-loaded using `React.lazy`:
- Smaller initial bundle
- Faster initial load
- Better performance

### 5. **Error Boundaries**
`ErrorBoundary` component catches and handles errors gracefully:
- Prevents app crashes
- Better user experience
- Error recovery

## 🎯 Best Practices Implemented

### Performance Optimizations
- ✅ `React.memo` for component memoization
- ✅ `useMemo` for expensive calculations
- ✅ `useCallback` for function memoization
- ✅ Code splitting with `React.lazy`
- ✅ Custom comparison functions for `React.memo`

### State Management
- ✅ Context API for global state
- ✅ Custom hooks for local state
- ✅ localStorage persistence
- ✅ Optimized re-renders

### Code Organization
- ✅ Feature-based folder structure
- ✅ Separation of concerns
- ✅ Reusable hooks and components
- ✅ Constants extracted to separate files

### Developer Experience
- ✅ Clean imports with index files
- ✅ Consistent naming conventions
- ✅ Error boundaries for debugging
- ✅ Type-safe patterns (ready for TypeScript)

## 🔄 Data Flow

```
App (Provider)
  ├── AppContext (Global State)
  │   ├── activeCategory
  │   ├── sidebarOpen
  │   └── difficultyFilter
  │
  ├── Custom Hooks (Business Logic)
  │   ├── useProgress (localStorage)
  │   ├── useTheme (localStorage)
  │   ├── useSearch (filtering)
  │   └── useExpandedCards (localStorage)
  │
  └── Components (UI)
      ├── Sidebar (memoized)
      └── MainContent (memoized)
          └── LearningCard (memoized)
              └── CodeBlock (memoized)
```

## 🚀 Future Enhancements

- [ ] Add TypeScript for type safety
- [ ] Implement React Query for data fetching (if API added)
- [ ] Add unit tests with React Testing Library
- [ ] Implement virtual scrolling for large lists
- [ ] Add service workers for offline support
- [ ] Implement React Router for navigation (if needed)

## 📝 Notes

- All components are functional components using hooks
- No class components (except ErrorBoundary)
- Follows React 18+ patterns
- Optimized for performance and maintainability

