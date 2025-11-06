import React, { createContext, useContext, useState, useCallback } from 'react'
import { learningData } from '../data/learningData'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('core-js')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [difficultyFilter, setDifficultyFilter] = useState('all')

    const handleCategoryChange = useCallback((categoryId) => {
        setActiveCategory(categoryId)
        // Close sidebar on mobile when category is selected
        if (window.innerWidth <= 768) {
            setSidebarOpen(false)
        }
    }, [])

    const toggleSidebar = useCallback(() => {
        setSidebarOpen(prev => !prev)
    }, [])

    const activeCategoryData = learningData[activeCategory] || learningData['core-js']

    const value = {
        activeCategory,
        setActiveCategory: handleCategoryChange,
        activeCategoryData,
        sidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        difficultyFilter,
        setDifficultyFilter,
        learningData,
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp must be used within AppProvider')
    }
    return context
}

