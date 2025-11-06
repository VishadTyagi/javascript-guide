import React, { useState } from 'react'
import './Quiz.css'

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
        <div className="quiz-card">
            <div className="quiz-question">
                <h3>{question}</h3>
            </div>
            
            <div className="quiz-options">
                {options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx
                    const isCorrectOption = idx === correctAnswer
                    let optionClass = 'quiz-option'
                    
                    if (showResult) {
                        if (isCorrectOption) {
                            optionClass += ' correct'
                        } else if (isSelected && !isCorrect) {
                            optionClass += ' incorrect'
                        }
                    } else if (isSelected) {
                        optionClass += ' selected'
                    }

                    return (
                        <button
                            key={idx}
                            className={optionClass}
                            onClick={() => handleSelect(idx)}
                            disabled={showResult}
                        >
                            <span className="option-label">{String.fromCharCode(65 + idx)}</span>
                            <span className="option-text">{option}</span>
                            {showResult && isCorrectOption && (
                                <i className="fas fa-check option-icon"></i>
                            )}
                            {showResult && isSelected && !isCorrect && (
                                <i className="fas fa-times option-icon"></i>
                            )}
                        </button>
                    )
                })}
            </div>

            {showResult && (
                <div className={`quiz-result ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="result-icon">
                        {isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="result-text">
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                    </div>
                    {explanation && (
                        <div className="result-explanation">
                            {explanation}
                        </div>
                    )}
                </div>
            )}

            {!showResult && (
                <button 
                    className="quiz-submit"
                    onClick={handleSubmit}
                    disabled={selectedAnswer === null}
                >
                    Submit Answer
                </button>
            )}
        </div>
    )
}

export default QuizCard

