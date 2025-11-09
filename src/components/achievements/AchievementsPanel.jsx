import React from 'react'
import { useAchievements } from '../../hooks/useAchievements'
import { useProgress } from '../../hooks/useProgress'
import { useAuth } from '../../contexts/AuthContext'

const AchievementsPanel = () => {
    const { completedCards, bookmarks } = useProgress()
    const { user } = useAuth()
    const streak = user?.streak || 0
    const { achievements, unlockedAchievements } = useAchievements(
        completedCards,
        bookmarks,
        streak
    )

    const unlockedIds = new Set(unlockedAchievements.map(a => a.id))

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">🏆 Achievements</h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Unlocked {unlockedAchievements.length} of {achievements.length} achievements
                    </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {achievements.map(achievement => {
                        const isUnlocked = unlockedIds.has(achievement.id)
                        return (
                            <div
                                key={achievement.id}
                                className={`p-5 rounded-xl border-2 transition-all ${
                                    isUnlocked
                                        ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-300 dark:border-amber-700 shadow-soft'
                                        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-60'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                        isUnlocked
                                            ? 'bg-amber-500 text-white'
                                            : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                                    }`}>
                                        <i className={`fas ${achievement.icon} text-lg`}></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className={`text-sm font-semibold ${
                                                isUnlocked
                                                    ? 'text-amber-900 dark:text-amber-100'
                                                    : 'text-gray-900 dark:text-gray-50'
                                            }`}>
                                                {achievement.title}
                                            </h3>
                                            {isUnlocked && (
                                                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-check text-white text-xs"></i>
                                                </div>
                                            )}
                                        </div>
                                        <p className={`text-xs mb-2 ${
                                            isUnlocked
                                                ? 'text-amber-800 dark:text-amber-200'
                                                : 'text-gray-600 dark:text-gray-400'
                                        }`}>
                                            {achievement.description}
                                        </p>
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                            <i className="fas fa-star"></i>
                                            <span>{achievement.xp} XP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AchievementsPanel
