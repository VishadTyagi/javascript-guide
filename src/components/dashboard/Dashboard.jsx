import React, { useMemo } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../hooks/useProgress'
import { useProgressCalculation } from '../../hooks/useProgressCalculation'
import { learningData } from '../../data/learningData'

const Dashboard = () => {
    const { user } = useAuth()
    const { completedCards, bookmarks } = useProgress()
    const progress = useProgressCalculation(completedCards)

    const stats = useMemo(() => {
        const allCards = Object.values(learningData).flatMap(cat => cat.cards)
        const categoriesCompleted = Object.keys(learningData).filter(catId => {
            const catCards = learningData[catId].cards
            return catCards.every(card => completedCards.has(card.id))
        }).length

        const totalCards = allCards.length
        const completedCount = completedCards.size
        const bookmarkedCount = bookmarks.size
        const xp = (completedCount * 10) + (bookmarkedCount * 5)
        const level = Math.floor(xp / 100) + 1

        return {
            totalCards,
            completedCount,
            bookmarkedCount,
            categoriesCompleted,
            totalCategories: Object.keys(learningData).length,
            xp,
            level,
            xpForNextLevel: level * 100,
        }
    }, [completedCards, bookmarks])

    const recentActivity = useMemo(() => {
        return [
            { type: 'completed', card: 'Closures', time: '2 hours ago' },
            { type: 'bookmarked', card: 'Prototypes', time: '1 day ago' },
            { type: 'completed', card: 'Promises', time: '2 days ago' },
        ]
    }, [])

    return (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50 mb-2">
                    Welcome back, {user?.name || 'Learner'}! 👋
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Continue your JavaScript learning journey</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl mb-2">📚</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                        {stats.completedCount}/{stats.totalCards}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Cards Completed</div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl mb-2">⭐</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                        {stats.level}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Level</div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl mb-2">🔥</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                        {user?.streak || 0}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="text-2xl mb-2">📖</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-1">
                        {stats.categoriesCompleted}/{stats.totalCategories}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Categories</div>
                </div>
            </div>

            {/* Progress */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">Overall Progress</h2>
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">{progress}%</span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Activity & XP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <i className={`fas ${activity.type === 'completed' ? 'fa-check-circle text-emerald-500' : 'fa-bookmark text-amber-500'}`}></i>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {activity.type === 'completed' ? 'Completed' : 'Bookmarked'} {activity.card}
                                    </span>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50 mb-4">XP Progress</h3>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                            style={{ width: `${(stats.xp % 100)}%` }}
                        ></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stats.xp} / {stats.xpForNextLevel} XP to Level {stats.level + 1}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
