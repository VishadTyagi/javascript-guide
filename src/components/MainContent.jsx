import React, { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import LearningCard from './LearningCard'

const MainContent = React.memo(({ 
    cards,
    expandedCards,
    toggleCard,
    isExpanded,
    completedCards,
    toggleCompleted,
    isCompleted,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    searchQuery,
    getNote,
    onSaveNote,
    onDeleteNote,
}) => {
    const { activeCategoryData } = useApp()

    const hasResults = useMemo(() => cards && cards.length > 0, [cards])

    if (!activeCategoryData) return null

    return (
        <main className="flex-1 md:ml-72 min-h-screen w-full">
            {/* Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                {searchQuery && (
                    <div className="mb-6 px-4 py-2.5 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg text-sm text-brand-700 dark:text-brand-300 flex items-center gap-2">
                        <i className="fas fa-search"></i>
                        <span>Found {cards.length} result{cards.length !== 1 ? 's' : ''} for "{searchQuery}"</span>
                    </div>
                )}
                {hasResults ? (
                    <div className="space-y-4">
                        {cards.map((card) => (
                            <LearningCard
                                key={card.id}
                                card={card}
                                isExpanded={isExpanded(card.id)}
                                onToggle={() => toggleCard(card.id)}
                                isCompleted={isCompleted(card.id)}
                                toggleCompleted={() => toggleCompleted(card.id)}
                                isBookmarked={isBookmarked(card.id)}
                                toggleBookmark={() => toggleBookmark(card.id)}
                                note={getNote(card.id)}
                                onSaveNote={onSaveNote}
                                onDeleteNote={onDeleteNote}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <i className="fas fa-search text-3xl text-gray-400"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-2">No results found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </main>
    )
})

MainContent.displayName = 'MainContent'

export default MainContent
