import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

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
        <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Profile</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-times text-gray-500"></i>
                    </button>
                </div>

                <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-primary p-0.5 mx-auto mb-4">
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    {isEditing ? (
                        <div className="space-y-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">{user?.name}</h3>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium"
                            >
                                <i className="fas fa-edit mr-1.5"></i>Edit
                            </button>
                        </>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user?.level || 1}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Level</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user?.xp || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">XP</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                        <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">{user?.streak || 0}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Streak</div>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                </button>
            </div>
        </div>
    )
}

export default UserProfile
