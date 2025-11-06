import React, { useMemo } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useProgress } from '../../hooks/useProgress'
import { useProgressCalculation } from '../../hooks/useProgressCalculation'
import { learningData } from '../../data/learningData'
import './Dashboard.css'

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

        // Calculate XP (10 XP per completed card, 5 XP per bookmark)
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
        // In a real app, this would come from activity logs
        return [
            { type: 'completed', card: 'Closures', time: '2 hours ago' },
            { type: 'bookmarked', card: 'Prototypes', time: '1 day ago' },
            { type: 'completed', card: 'Promises', time: '2 days ago' },
        ]
    }, [])

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Welcome back, {user?.name || 'Learner'}! 👋</h1>
                <p>Continue your JavaScript learning journey</p>
            </div>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <div className="stat-icon">📚</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.completedCount}/{stats.totalCards}</div>
                        <div className="stat-label">Cards Completed</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.level}</div>
                        <div className="stat-label">Level {stats.level}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-content">
                        <div className="stat-value">{user?.streak || 0}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">📖</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.categoriesCompleted}/{stats.totalCategories}</div>
                        <div className="stat-label">Categories Mastered</div>
                    </div>
                </div>
            </div>

            <div className="dashboard-progress">
                <h2>Overall Progress</h2>
                <div className="progress-container">
                    <div className="progress-bar-large">
                        <div className="progress-fill-large" style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="progress-text-large">{progress}% Complete</div>
                </div>
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        {recentActivity.map((activity, idx) => (
                            <div key={idx} className="activity-item">
                                <i className={`fas ${activity.type === 'completed' ? 'fa-check-circle' : 'fa-bookmark'}`}></i>
                                <span>{activity.type === 'completed' ? 'Completed' : 'Bookmarked'} {activity.card}</span>
                                <span className="activity-time">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-section">
                    <h3>XP Progress</h3>
                    <div className="xp-container">
                        <div className="xp-bar">
                            <div className="xp-fill" style={{ width: `${(stats.xp % 100)}%` }}></div>
                        </div>
                        <div className="xp-text">
                            {stats.xp} / {stats.xpForNextLevel} XP to Level {stats.level + 1}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

