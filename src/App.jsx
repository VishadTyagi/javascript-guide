import React, { lazy, Suspense, useState } from 'react'
import { AppProvider } from './contexts/AppContext'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import MobileToggle from './components/MobileToggle'
import AchievementsPanel from './components/achievements/AchievementsPanel'
import { useProgress, useTheme, useExpandedCards, useSearch, useProgressCalculation, useKeyboardShortcuts, useNotes, useStreak } from './hooks'
import { useApp } from './contexts/AppContext'
import './App.css'

// Lazy load components for code splitting
const Sidebar = lazy(() => import('./components/Sidebar'))
const MainContent = lazy(() => import('./components/MainContent'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh' 
  }}>
    <div>Loading...</div>
  </div>
)

function AppContent() {
  const [currentView, setCurrentView] = useState('learn')
  const { activeCategory, difficultyFilter, sidebarOpen, toggleSidebar } = useApp()
  const { darkMode, toggleTheme } = useTheme()
  const { completedCards, bookmarks, toggleCompleted, toggleBookmark, isCompleted, isBookmarked } = useProgress()
  const { expandedCards, toggleCard, isExpanded } = useExpandedCards()
  const { searchQuery, setSearchQuery, filteredCards, clearSearch } = useSearch(activeCategory, difficultyFilter)
  const { getNote, saveNote, deleteNote } = useNotes()
  const progress = useProgressCalculation(completedCards)
  useStreak() // Track daily streak

  // Keyboard shortcuts
  useKeyboardShortcuts(
    () => document.getElementById('search-input')?.focus(),
    () => sidebarOpen && toggleSidebar()
  )

  const handleSaveNote = (cardId, noteText) => {
    saveNote(cardId, noteText)
  }

  const handleDeleteNote = (cardId) => {
    deleteNote(cardId)
  }

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <MobileToggle onClick={toggleSidebar} />
      
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={toggleSidebar}></div>
      )}
      
      {currentView === 'learn' && (
        <>
          <Suspense fallback={<LoadingFallback />}>
            <Sidebar
              progress={progress}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              clearSearch={clearSearch}
              bookmarks={bookmarks}
              darkMode={darkMode}
              toggleTheme={toggleTheme}
            />
            
            <MainContent
              cards={filteredCards}
              expandedCards={expandedCards}
              toggleCard={toggleCard}
              isExpanded={isExpanded}
              completedCards={completedCards}
              toggleCompleted={toggleCompleted}
              isCompleted={isCompleted}
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmark}
              isBookmarked={isBookmarked}
              searchQuery={searchQuery}
              getNote={getNote}
              onSaveNote={handleSaveNote}
              onDeleteNote={handleDeleteNote}
            />
          </Suspense>
        </>
      )}

      {currentView === 'achievements' && (
        <div className="main-content achievements-view">
          <AchievementsPanel />
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
