import { useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from './useProgress'

export const useStreak = () => {
    const { user, updateUser } = useAuth()
    const { completedCards } = useProgress()

    // Check and update streak daily
    useEffect(() => {
        if (!user) return

        const today = new Date().toDateString()
        const lastActiveDate = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null

        if (lastActiveDate !== today) {
            // Check if user was active yesterday (maintains streak)
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            const yesterdayStr = yesterday.toDateString()

            let newStreak = user.streak || 0

            if (lastActiveDate === yesterdayStr) {
                // Continue streak
                newStreak += 1
            } else if (lastActiveDate !== today) {
                // Reset streak if more than 1 day gap
                newStreak = 1
            }

            updateUser({
                streak: newStreak,
                lastActiveDate: today,
            })
        }
    }, [user, updateUser])

    // Update last active date when cards are completed
    useEffect(() => {
        if (user && completedCards.size > 0) {
            const today = new Date().toDateString()
            if (user.lastActiveDate !== today) {
                updateUser({ lastActiveDate: today })
            }
        }
    }, [completedCards.size, user, updateUser])

    return {
        streak: user?.streak || 0,
    }
}

