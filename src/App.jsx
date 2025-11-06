import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import { learningData } from './data/learningData'
import './App.css'

function App() {
  const [activeCategory, setActiveCategory] = useState('core-js')
  const [expandedCards, setExpandedCards] = useState({})
  const [completedCards, setCompletedCards] = useState(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleCard = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }))
  }

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }

  const calculateProgress = () => {
    const allCards = Object.values(learningData).flatMap(cat => cat.cards)
    const totalCards = allCards.length
    const completedCount = completedCards.size
    return totalCards > 0 ? Math.round((completedCount / totalCards) * 100) : 0
  }

  const progress = calculateProgress()

  const activeCategoryData = learningData[activeCategory] || learningData['core-js']

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    // Close sidebar on mobile when category is selected
    if (window.innerWidth <= 768) {
      setSidebarOpen(false)
    }
  }

  return (
    <div className="app-container">
      <button className="mobile-toggle" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </button>
      
      {sidebarOpen && (
        <div className="mobile-overlay" onClick={toggleSidebar}></div>
      )}
      
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={handleCategoryChange}
        progress={progress}
        sidebarOpen={sidebarOpen}
        learningData={learningData}
      />
      
      <MainContent
        category={activeCategoryData}
        expandedCards={expandedCards}
        toggleCard={toggleCard}
        setCompletedCards={setCompletedCards}
      />
    </div>
  )
}

export default App

