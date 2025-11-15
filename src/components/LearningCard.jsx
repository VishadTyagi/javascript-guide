import React, { useCallback, useState } from 'react'
import CodeBlock from './CodeBlock'
import NoteEditor from './notes/NoteEditor'

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

    const handleCardClick = useCallback((e) => {
        if (e.target.closest('button') || e.target.closest('label') || e.target.closest('input')) {
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

    const difficultyStyles = {
        beginner: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
        intermediate: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
        advanced: 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300',
    }

    return (
        <article className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden card-hover">
            {/* Card Header */}
            <div 
                className="p-4 sm:p-6 cursor-pointer"
                onClick={handleCardClick}
            >
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                                <i className={`fas ${card.icon} text-white text-sm`}></i>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 truncate">
                                {card.title}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                            {card.description}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${difficultyStyles[card.difficulty] || difficultyStyles.beginner}`}>
                                {card.difficulty || 'Beginner'}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={handleBookmark}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                                isBookmarked
                                    ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                            title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                            <i className="fas fa-bookmark text-sm"></i>
                        </button>
                        <label className="cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isCompleted}
                                onChange={handleComplete}
                                className="sr-only"
                            />
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                                isCompleted
                                    ? 'bg-brand-500 text-white shadow-soft'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}>
                                {isCompleted && <i className="fas fa-check text-sm"></i>}
                            </div>
                        </label>
                    </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                    <button className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 flex items-center gap-2">
                        {isExpanded ? (
                            <>
                                <span>Show less</span>
                                <i className="fas fa-chevron-up text-xs"></i>
                            </>
                        ) : (
                            <>
                                <span>Learn more</span>
                                <i className="fas fa-chevron-down text-xs"></i>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                    {/* Explanation Section */}
                    {card.explanation && (
                        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-3 flex items-center gap-2">
                                <i className="fas fa-book-open text-blue-500 dark:text-blue-400"></i>
                                Explanation
                            </h4>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {card.explanation}
                                </p>
                            </div>
                        </div>
                    )}
                    {card.examples && card.examples.map((example, idx) => (
                        <div key={idx} className="p-6 border-b border-gray-200 dark:border-gray-800 last:border-b-0">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4 flex items-center gap-2">
                                <i className="fas fa-code text-brand-500"></i>
                                {example.title}
                            </h4>
                            <CodeBlock 
                                code={example.code} 
                                language={example.language || 'javascript'}
                                runFunction={example.runFunction}
                                outputId={`${card.id}-example-${idx}`}
                            />
                            {example.note && (
                                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg">
                                    <p className="text-sm text-blue-900 dark:text-blue-100">
                                        <strong>💡 Key Point:</strong> {example.note}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                    
                    {/* Notes Section */}
                    <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                        {note && !showNoteEditor && (
                            <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-sm font-semibold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                                        <i className="fas fa-sticky-note"></i>
                                        Your Note
                                    </h5>
                                    <button
                                        onClick={() => onDeleteNote(card.id)}
                                        className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
                                    >
                                        <i className="fas fa-trash text-xs"></i>
                                    </button>
                                </div>
                                <p className="text-sm text-amber-800 dark:text-amber-200 whitespace-pre-wrap mb-3">{note}</p>
                                <button
                                    onClick={() => setShowNoteEditor(true)}
                                    className="text-xs font-medium text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200"
                                >
                                    Edit note
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
                                onClick={() => setShowNoteEditor(true)}
                                className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-plus text-xs"></i>
                                Add a note
                            </button>
                        )}
                    </div>
                </div>
            )}
        </article>
    )
}, (prevProps, nextProps) => {
    return (
        prevProps.card.id === nextProps.card.id &&
        prevProps.isExpanded === nextProps.isExpanded &&
        prevProps.isCompleted === nextProps.isCompleted &&
        prevProps.isBookmarked === nextProps.isBookmarked
    )
})

LearningCard.displayName = 'LearningCard'

export default LearningCard
