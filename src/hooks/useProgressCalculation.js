import { useMemo } from 'react'
import { learningData } from '../data/learningData'

export const useProgressCalculation = (completedCards) => {
    const progress = useMemo(() => {
        const allCards = Object.values(learningData).flatMap(cat => cat.cards)
        const totalCards = allCards.length
        const completedCount = completedCards.size
        return totalCards > 0 ? Math.round((completedCount / totalCards) * 100) : 0
    }, [completedCards])

    return progress
}

