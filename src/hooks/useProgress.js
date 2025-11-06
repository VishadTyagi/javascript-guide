import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'
import { useAuth } from '../contexts/AuthContext'

export const useProgress = () => {
    const { user, updateUser } = useAuth()
    const [completedCards, setCompletedCards] = useState(new Set())
    const [bookmarks, setBookmarks] = useState(new Set())

    // Load progress on mount
    useEffect(() => {
        const saved = storage.getProgress()
        if (saved.completedCards?.length) {
            setCompletedCards(new Set(saved.completedCards))
        }
        if (saved.bookmarks?.length) {
            setBookmarks(new Set(saved.bookmarks))
        }
    }, [])

    // Save progress when it changes
    useEffect(() => {
        storage.saveProgress(completedCards, bookmarks)
    }, [completedCards, bookmarks])

    const toggleCompleted = useCallback((cardId) => {
        setCompletedCards(prev => {
            const newSet = new Set(prev)
            const wasCompleted = newSet.has(cardId)
            
            if (wasCompleted) {
                newSet.delete(cardId)
                // Remove XP when uncompleting
                if (user) {
                    const newXP = Math.max(0, (user.xp || 0) - 10)
                    const newLevel = Math.floor(newXP / 100) + 1
                    updateUser({ xp: newXP, level: newLevel })
                }
            } else {
                newSet.add(cardId)
                // Award XP when completing
                if (user) {
                    const newXP = (user.xp || 0) + 10
                    const newLevel = Math.floor(newXP / 100) + 1
                    updateUser({ xp: newXP, level: newLevel })
                }
            }
            return newSet
        })
    }, [user, updateUser])

    const toggleBookmark = useCallback((cardId) => {
        setBookmarks(prev => {
            const newSet = new Set(prev)
            const wasBookmarked = newSet.has(cardId)
            
            if (wasBookmarked) {
                newSet.delete(cardId)
                // Remove XP when unbookmarking
                if (user) {
                    const newXP = Math.max(0, (user.xp || 0) - 5)
                    updateUser({ xp: newXP })
                }
            } else {
                newSet.add(cardId)
                // Award XP when bookmarking
                if (user) {
                    const newXP = (user.xp || 0) + 5
                    updateUser({ xp: newXP })
                }
            }
            return newSet
        })
    }, [user, updateUser])

    const isCompleted = useCallback((cardId) => {
        return completedCards.has(cardId)
    }, [completedCards])

    const isBookmarked = useCallback((cardId) => {
        return bookmarks.has(cardId)
    }, [bookmarks])

    return {
        completedCards,
        bookmarks,
        toggleCompleted,
        toggleBookmark,
        isCompleted,
        isBookmarked,
    }
}

