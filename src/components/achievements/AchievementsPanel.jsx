import React from 'react'
import { useAchievements } from '../../hooks/useAchievements'
import { useProgress } from '../../hooks/useProgress'
import { useAuth } from '../../contexts/AuthContext'
import './Achievements.css'

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
        <div className="achievements-panel">
            <h2>🏆 Achievements</h2>
            <p className="achievements-subtitle">
                Unlocked {unlockedAchievements.length} of {achievements.length} achievements
            </p>
            
            <div className="achievements-grid">
                {achievements.map(achievement => {
                    const isUnlocked = unlockedIds.has(achievement.id)
                    return (
                        <div 
                            key={achievement.id} 
                            className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                        >
                            <div className="achievement-icon">
                                <i className={`fas ${achievement.icon}`}></i>
                                {isUnlocked && <div className="achievement-badge">✓</div>}
                            </div>
                            <div className="achievement-content">
                                <h3>{achievement.title}</h3>
                                <p>{achievement.description}</p>
                                <div className="achievement-xp">
                                    <i className="fas fa-star"></i> {achievement.xp} XP
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AchievementsPanel

