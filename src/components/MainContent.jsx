import React, { useMemo } from 'react'
import { useApp } from '../contexts/AppContext'
import LearningCard from './LearningCard'
import './MainContent.css'

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
        <div className="main-content">
            <div className="content-header">
                <h2>{activeCategoryData.title}</h2>
                <p>{activeCategoryData.description}</p>
                {searchQuery && (
                    <div className="search-results-info">
                        <i className="fas fa-search"></i> 
                        Found {cards.length} result{cards.length !== 1 ? 's' : ''} for "{searchQuery}"
                    </div>
                )}
            </div>
            
            <div className="content">
                <h2 className="category-title">{activeCategoryData.emoji} {activeCategoryData.title}</h2>
                {hasResults ? (
                    cards.map((card) => (
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
                    ))
                ) : (
                    <div className="no-results">
                        <i className="fas fa-search"></i>
                        <h3>No results found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>
        </div>
    )
})

MainContent.displayName = 'MainContent'

export default MainContent
