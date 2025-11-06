import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Auth.css'

const UserProfile = ({ onClose }) => {
    const { user, logout, updateUser } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState(user?.name || '')

    const handleSave = () => {
        updateUser({ name })
        setIsEditing(false)
    }

    const handleLogout = () => {
        logout()
        onClose()
    }

    return (
        <div className="profile-modal-overlay" onClick={onClose}>
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                <button className="profile-close" onClick={onClose}>×</button>
                <div className="profile-header">
                    <img src={user?.avatar} alt={user?.name} className="profile-avatar" />
                    {isEditing ? (
                        <div className="profile-edit">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="profile-name-input"
                            />
                            <button onClick={handleSave} className="profile-save">Save</button>
                            <button onClick={() => setIsEditing(false)} className="profile-cancel">Cancel</button>
                        </div>
                    ) : (
                        <>
                            <h2>{user?.name}</h2>
                            <button onClick={() => setIsEditing(true)} className="profile-edit-btn">
                                <i className="fas fa-edit"></i> Edit
                            </button>
                        </>
                    )}
                </div>
                
                <div className="profile-stats">
                    <div className="stat-item">
                        <div className="stat-value">{user?.level || 1}</div>
                        <div className="stat-label">Level</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{user?.xp || 0}</div>
                        <div className="stat-label">XP</div>
                    </div>
                    <div className="stat-item">
                        <div className="stat-value">{user?.streak || 0}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                </div>

                <button onClick={handleLogout} className="profile-logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </div>
        </div>
    )
}

export default UserProfile

