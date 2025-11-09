import React, { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import { CATEGORIES, DIFFICULTY_LEVELS } from '../constants/categories'

const Sidebar = React.memo(({ 
    progress, 
    searchQuery,
    setSearchQuery,
    clearSearch,
    bookmarks,
    darkMode,
    toggleTheme,
    sidebarOpen,
    currentView,
    setCurrentView,
    onClose,
}) => {
    const { 
        activeCategory, 
        setActiveCategory, 
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
        <aside 
            className={`fixed top-0 left-0 w-full sm:w-80 md:w-72 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 z-40 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
            }`}
        >
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-50">JS Mastery</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            title={darkMode ? 'Light mode' : 'Dark mode'}
                        >
                            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-gray-600 dark:text-gray-400 text-sm`}></i>
                        </button>
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="md:hidden w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                title="Close menu"
                            >
                                <i className="fas fa-times text-gray-600 dark:text-gray-400 text-sm"></i>
                            </button>
                        )}
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 sm:pt-6 space-y-4 sm:space-y-6">
                    <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Categories</h3>

                    {/* Search */}
                    <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                            id="search-input"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search topics..."
                            className="w-full pl-10 pr-10 py-2 sm:py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <i className="fas fa-times text-xs"></i>
                            </button>
                        )}
                    </div>

                    {/* Filter */}
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Difficulty
                        </label>
                        <select
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        >
                            {DIFFICULTY_LEVELS.map(level => (
                                <option key={level.value} value={level.value}>
                                    {level.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Progress */}
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-xl border border-brand-200/50 dark:border-brand-800/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-xs sm:text-sm font-bold text-brand-600 dark:text-brand-400">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        {bookmarkCount > 0 && (
                            <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                <i className="fas fa-bookmark text-yellow-500"></i>
                                <span>{bookmarkCount} bookmarked</span>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="space-y-1">
                        {categoryList.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id)
                                    if (window.innerWidth < 768) {
                                        onClose?.()
                                    }
                                }}
                                className={`w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    activeCategory === cat.id
                                        ? 'bg-brand-500 text-white shadow-soft'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <div className="flex items-center gap-2 sm:gap-3">
                                    <i className={`fas ${cat.icon} w-4 sm:w-5 text-center text-xs sm:text-sm`}></i>
                                    <span className="truncate">{cat.name}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${
                                    activeCategory === cat.id
                                        ? 'bg-white/20 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                }`}>
                                    {cat.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
