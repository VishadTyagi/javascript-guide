import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'

export const useStudyGoals = () => {
    const [goals, setGoals] = useState(null)

    // Load goals on mount
    useEffect(() => {
        const saved = storage.getStudyGoals()
        if (saved) {
            setGoals(saved)
        } else {
            // Default goals
            setGoals({
                dailyCards: 3,
                weeklyCards: 15,
                streakGoal: 7,
            })
        }
    }, [])

    // Save goals when they change
    useEffect(() => {
        if (goals) {
            storage.saveStudyGoals(goals)
        }
    }, [goals])

    const updateGoals = useCallback((newGoals) => {
        setGoals(prev => ({ ...prev, ...newGoals }))
    }, [])

    const checkDailyGoal = useCallback((completedToday) => {
        if (!goals) return { met: false, progress: 0 }
        const progress = Math.min((completedToday / goals.dailyCards) * 100, 100)
        return {
            met: completedToday >= goals.dailyCards,
            progress,
            target: goals.dailyCards,
            current: completedToday,
        }
    }, [goals])

    return {
        goals,
        updateGoals,
        checkDailyGoal,
    }
}

