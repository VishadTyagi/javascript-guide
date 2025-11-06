import { useState, useEffect, useMemo } from 'react'
import { storage } from '../utils/storage'
import { ACHIEVEMENTS } from '../features/achievements/achievementsData'
import { learningData } from '../data/learningData'

export const useAchievements = (completedCards, bookmarks, streak) => {
    const [unlockedAchievements, setUnlockedAchievements] = useState([])

    // Load achievements on mount
    useEffect(() => {
        const saved = storage.getAchievements()
        if (saved.length > 0) {
            setUnlockedAchievements(saved)
        }
    }, [])

    // Calculate stats for achievement checking
    const stats = useMemo(() => {
        const allCards = Object.values(learningData).flatMap(cat => cat.cards)
        const categoriesCompleted = Object.keys(learningData).filter(catId => {
            const catCards = learningData[catId].cards
            return catCards.every(card => completedCards.has(card.id))
        }).length

        return {
            completedCount: completedCards.size,
            bookmarkedCount: bookmarks.size,
            totalCards: allCards.length,
            categoriesCompleted,
            streak: streak || 0,
        }
    }, [completedCards, bookmarks, streak])

    // Check for new achievements
    useEffect(() => {
        const newAchievements = ACHIEVEMENTS.filter(achievement => {
            // Skip if already unlocked
            if (unlockedAchievements.some(a => a.id === achievement.id)) {
                return false
            }
            // Check if condition is met
            return achievement.condition(stats)
        })

        if (newAchievements.length > 0) {
            const updated = [...unlockedAchievements, ...newAchievements]
            setUnlockedAchievements(updated)
            storage.saveAchievements(updated)
            
            // Show notification (could be enhanced with a toast system)
            newAchievements.forEach(achievement => {
                console.log(`🎉 Achievement Unlocked: ${achievement.title}!`)
            })
        }
    }, [stats, unlockedAchievements])

    const getAchievementProgress = (achievementId) => {
        const achievement = ACHIEVEMENTS.find(a => a.id === achievementId)
        if (!achievement) return null

        const isUnlocked = unlockedAchievements.some(a => a.id === achievementId)
        return {
            ...achievement,
            unlocked: isUnlocked,
        }
    }

    return {
        achievements: ACHIEVEMENTS,
        unlockedAchievements,
        getAchievementProgress,
    }
}

