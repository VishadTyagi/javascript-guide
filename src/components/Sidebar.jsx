import React, { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import { CATEGORIES, DIFFICULTY_LEVELS } from '../constants/categories'
import './Sidebar.css'

const Sidebar = React.memo(({ 
    progress, 
    searchQuery,
    setSearchQuery,
    clearSearch,
    bookmarks,
    darkMode,
    toggleTheme,
}) => {
    const { 
        activeCategory, 
        setActiveCategory, 
        sidebarOpen, 
        learningData,
        difficultyFilter,
        setDifficultyFilter,
    } = useApp()

    const bookmarkCount = useMemo(() => bookmarks?.size || 0, [bookmarks])

    const categoryList = useMemo(() => {
        return CATEGORIES.map(cat => ({
            ...cat,
            count: learningData[cat.id]?.cards?.length || 0
        }))
    }, [learningData])

    return (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
            <div className="sidebar-header">
                <div className="header-top">
                    <h1><i className="fas fa-code"></i> JS Mastery</h1>
                    <button 
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                </div>
                <p>Interactive JavaScript Learning Platform</p>
            </div>
            
            <div className="search-section">
                <div className="search-wrapper">
                    <i className="fas fa-search search-icon"></i>
                    <input
                        id="search-input"
                        type="text"
                        className="search-input"
                        placeholder="Search topics... (Ctrl+K)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button 
                            className="search-clear"
                            onClick={clearSearch}
                            title="Clear search"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="filter-section">
                <label className="filter-label">Filter by Difficulty:</label>
                <select 
                    className="difficulty-select"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                >
                    {DIFFICULTY_LEVELS.map(level => (
                        <option key={level.value} value={level.value}>
                            {level.label}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="progress-section">
                <div className="progress-title">Learning Progress</div>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progress-text">{progress}% Complete</div>
                {bookmarkCount > 0 && (
                    <div className="bookmark-count">
                        <i className="fas fa-bookmark"></i> {bookmarkCount} Bookmarked
                    </div>
                )}
            </div>
            
            <div className="nav-menu">
                {categoryList.map(cat => (
                    <div
                        key={cat.id}
                        className={`nav-item ${activeCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.id)}
                    >
                        <i className={`fas ${cat.icon} icon`}></i>
                        {cat.name}
                        <span className="badge">{cat.count}</span>
                    </div>
                ))}
            </div>
        </div>
    )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
