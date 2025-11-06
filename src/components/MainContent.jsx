import React from 'react'
import LearningCard from './LearningCard'
import './MainContent.css'

function MainContent({ category, expandedCards, toggleCard, setCompletedCards }) {
    if (!category) return null

    return (
        <div className="main-content">
            <div className="content-header">
                <h2>{category.title}</h2>
                <p>{category.description}</p>
            </div>
            
            <div className="content">
                <h2 className="category-title">{category.emoji} {category.title}</h2>
                {category.cards.map((card, index) => (
                    <LearningCard
                        key={card.id || index}
                        card={card}
                        isExpanded={expandedCards[card.id] || false}
                        onToggle={() => toggleCard(card.id)}
                        setCompletedCards={setCompletedCards}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainContent

