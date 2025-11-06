import React from 'react'
import CodeBlock from './CodeBlock'
import './LearningCard.css'

function LearningCard({ card, isExpanded, onToggle, setCompletedCards }) {
    const difficultyClass = `difficulty-${card.difficulty || 'beginner'}`

    return (
        <div className="learning-card">
            <div 
                className={`card-header ${isExpanded ? 'expanded' : ''}`}
                onClick={onToggle}
            >
                <div className="card-title">
                    <i className={`fas ${card.icon} icon`}></i>
                    {card.title}
                </div>
                <div className="card-description">
                    {card.description}
                </div>
                <div className={`difficulty-badge ${difficultyClass}`}>
                    {card.difficulty || 'Beginner'}
                </div>
            </div>
            <div className={`card-content ${isExpanded ? 'expanded' : ''}`}>
                {card.examples && card.examples.map((example, idx) => (
                    <div key={idx} className="example">
                        <h3>
                            <i className="fas fa-code icon"></i>
                            {example.title}
                        </h3>
                        <CodeBlock 
                            code={example.code} 
                            language={example.language || 'javascript'}
                            runFunction={example.runFunction}
                            outputId={`${card.id}-example-${idx}`}
                        />
                        {example.note && (
                            <div className="note">
                                <strong>Key Point:</strong> {example.note}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LearningCard

