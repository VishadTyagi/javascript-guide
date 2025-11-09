import React, { useState } from 'react'

const QuizCard = ({ question, options, correctAnswer, explanation, onAnswer }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    const [showResult, setShowResult] = useState(false)

    const handleSelect = (answer) => {
        if (showResult) return
        setSelectedAnswer(answer)
    }

    const handleSubmit = () => {
        if (!selectedAnswer) return
        setShowResult(true)
        onAnswer(selectedAnswer === correctAnswer)
    }

    const isCorrect = selectedAnswer === correctAnswer

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{question}</h3>
            
            <div className="space-y-2">
                {options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx
                    const isCorrectOption = idx === correctAnswer
                    
                    let buttonClass = 'w-full flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all '
                    
                    if (showResult) {
                        if (isCorrectOption) {
                            buttonClass += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100'
                        } else if (isSelected && !isCorrect) {
                            buttonClass += 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-900 dark:text-rose-100'
                        } else {
                            buttonClass += 'border-gray-200 dark:border-gray-800 opacity-50'
                        }
                    } else if (isSelected) {
                        buttonClass += 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    } else {
                        buttonClass += 'border-gray-200 dark:border-gray-800 hover:border-brand-300 dark:hover:border-brand-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }

                    return (
                        <button
                            key={idx}
                            className={buttonClass}
                            onClick={() => handleSelect(idx)}
                            disabled={showResult}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                                showResult && isCorrectOption
                                    ? 'bg-emerald-500 text-white'
                                    : showResult && isSelected && !isCorrect
                                    ? 'bg-rose-500 text-white'
                                    : 'bg-brand-500 text-white'
                            }`}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="flex-1 text-sm">{option}</span>
                            {showResult && isCorrectOption && (
                                <i className="fas fa-check text-emerald-600 dark:text-emerald-400"></i>
                            )}
                            {showResult && isSelected && !isCorrect && (
                                <i className="fas fa-times text-rose-600 dark:text-rose-400"></i>
                            )}
                        </button>
                    )
                })}
            </div>

            {showResult && (
                <div className={`p-4 rounded-lg border-2 ${
                    isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500'
                        : 'bg-rose-50 dark:bg-rose-900/20 border-rose-500'
                }`}>
                    <div className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                    </div>
                    {explanation && (
                        <p className="text-sm text-gray-700 dark:text-gray-300">{explanation}</p>
                    )}
                </div>
            )}

            {!showResult && (
                <button
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                    className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                    Submit Answer
                </button>
            )}
        </div>
    )
}

export default QuizCard
