import React, { useCallback, useState } from 'react'
import CodeBlock from './CodeBlock'
import NoteEditor from './notes/NoteEditor'
import './LearningCard.css'
import './notes/Notes.css'

const LearningCard = React.memo(({ 
    card, 
    isExpanded, 
    onToggle, 
    isCompleted,
    toggleCompleted,
    isBookmarked,
    toggleBookmark,
    note,
    onSaveNote,
    onDeleteNote,
}) => {
    const [showNoteEditor, setShowNoteEditor] = useState(false)
    const difficultyClass = `difficulty-${card.difficulty || 'beginner'}`

    const handleCardClick = useCallback((e) => {
        // Don't toggle if clicking on action buttons
        if (e.target.closest('.card-actions') || 
            e.target.closest('.bookmark-btn') || 
            e.target.closest('.complete-checkbox')) {
            return
        }
        onToggle()
    }, [onToggle])

    const handleComplete = useCallback((e) => {
        e.stopPropagation()
        toggleCompleted()
    }, [toggleCompleted])

    const handleBookmark = useCallback((e) => {
        e.stopPropagation()
        toggleBookmark()
    }, [toggleBookmark])

    return (
        <div className="learning-card">
            <div 
                className={`card-header ${isExpanded ? 'expanded' : ''}`}
                onClick={handleCardClick}
            >
                <div className="card-title-section">
                    <div className="card-title">
                        <i className={`fas ${card.icon} icon`}></i>
                        {card.title}
                    </div>
                    <div className="card-actions">
                        <button 
                            className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                            onClick={handleBookmark}
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this card'}
                        >
                            <i className="fas fa-bookmark"></i>
                        </button>
                        <label className="complete-checkbox-wrapper">
                            <input
                                type="checkbox"
                                className="complete-checkbox"
                                checked={isCompleted}
                                onChange={handleComplete}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className={`checkmark ${isCompleted ? 'checked' : ''}`} title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}>
                                {isCompleted && <i className="fas fa-check"></i>}
                            </span>
                        </label>
                    </div>
                </div>
                <div className="card-description">
                    {card.description}
                </div>
                <div className="card-footer">
                    <div className={`difficulty-badge ${difficultyClass}`}>
                        {card.difficulty || 'Beginner'}
                    </div>
                </div>
            </div>
            {isExpanded && (
                <div className="card-content expanded">
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
                    
                    {/* Notes Section */}
                    <div className="card-notes-section">
                        {note && !showNoteEditor && (
                            <div className="card-note">
                                <div className="card-note-header">
                                    <h4><i className="fas fa-sticky-note"></i> Your Note</h4>
                                    <button 
                                        className="note-delete"
                                        onClick={() => onDeleteNote(card.id)}
                                        title="Delete note"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                                <div className="card-note-content">{note}</div>
                                <button 
                                    className="note-button"
                                    onClick={() => setShowNoteEditor(true)}
                                >
                                    <i className="fas fa-edit"></i> Edit Note
                                </button>
                            </div>
                        )}
                        
                        {showNoteEditor && (
                            <NoteEditor
                                cardId={card.id}
                                initialNote={note}
                                onSave={onSaveNote}
                                onClose={() => setShowNoteEditor(false)}
                            />
                        )}
                        
                        {!note && !showNoteEditor && (
                            <button 
                                className="note-button"
                                onClick={() => setShowNoteEditor(true)}
                            >
                                <i className="fas fa-plus"></i> Add Note
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}, (prevProps, nextProps) => {
    // Custom comparison for React.memo
    return (
        prevProps.card.id === nextProps.card.id &&
        prevProps.isExpanded === nextProps.isExpanded &&
        prevProps.isCompleted === nextProps.isCompleted &&
        prevProps.isBookmarked === nextProps.isBookmarked
    )
})

LearningCard.displayName = 'LearningCard'

export default LearningCard
