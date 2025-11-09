import React, { lazy, Suspense, useState, useEffect } from 'react'
import { AppProvider } from './contexts/AppContext'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import MobileToggle from './components/MobileToggle'
import AchievementsPanel from './components/achievements/AchievementsPanel'
import Dashboard from './components/dashboard/Dashboard'
import { useProgress, useTheme, useExpandedCards, useSearch, useProgressCalculation, useKeyboardShortcuts, useNotes, useStreak } from './hooks'
import { useApp } from './contexts/AppContext'

// Lazy load components
const Sidebar = lazy(() => import('./components/Sidebar'))
const MainContent = lazy(() => import('./components/MainContent'))

const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
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
  useStreak()

  useKeyboardShortcuts(
    () => document.getElementById('search-input')?.focus(),
    () => sidebarOpen && toggleSidebar()
  )

  // Close sidebar on mobile when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && sidebarOpen) {
        // Keep sidebar open on desktop, but ensure it's visible
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  const handleSaveNote = (cardId, noteText) => {
    saveNote(cardId, noteText)
  }

  const handleDeleteNote = (cardId) => {
    deleteNote(cardId)
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200 ${darkMode ? 'dark' : ''}`}>
      <MobileToggle onClick={toggleSidebar} />
      
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={toggleSidebar}
        ></div>
      )}
      
      <div className="flex">
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
                sidebarOpen={sidebarOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
                onClose={toggleSidebar}
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

        {currentView === 'dashboard' && (
          <div className="flex-1 md:ml-72">
            <Suspense fallback={<LoadingFallback />}>
              <Dashboard />
            </Suspense>
          </div>
        )}

        {currentView === 'achievements' && (
          <div className="flex-1 md:ml-72">
            <AchievementsPanel />
          </div>
        )}
      </div>
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
