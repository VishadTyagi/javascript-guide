import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoginModal from './auth/LoginModal'
import UserProfile from './auth/UserProfile'
import Dashboard from './dashboard/Dashboard'
import './Navbar.css'

const Navbar = ({ currentView, setCurrentView }) => {
    const { user, isAuthenticated } = useAuth()
    const [showLogin, setShowLogin] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [showDashboard, setShowDashboard] = useState(false)

    const navItems = [
        { id: 'learn', label: 'Learn', icon: 'fa-book', view: 'learn' },
        { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', view: 'dashboard' },
        { id: 'achievements', label: 'Achievements', icon: 'fa-trophy', view: 'achievements' },
    ]

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <i className="fas fa-code"></i>
                    <span>JS Mastery</span>
                </div>
                
                <div className="navbar-menu">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${currentView === item.view ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentView(item.view)
                                if (item.view === 'dashboard') {
                                    setShowDashboard(true)
                                }
                            }}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                <div className="navbar-actions">
                    {isAuthenticated ? (
                        <button 
                            className="user-avatar-btn"
                            onClick={() => setShowProfile(true)}
                            title={user?.name}
                        >
                            <img src={user?.avatar} alt={user?.name} className="user-avatar" />
                            <span className="user-level">{user?.level || 1}</span>
                        </button>
                    ) : (
                        <button 
                            className="login-btn"
                            onClick={() => setShowLogin(true)}
                        >
                            <i className="fas fa-sign-in-alt"></i> Login
                        </button>
                    )}
                </div>
            </nav>

            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
            {showDashboard && currentView === 'dashboard' && (
                <div className="dashboard-overlay" onClick={() => {
                    setShowDashboard(false)
                    setCurrentView('learn')
                }}>
                    <div className="dashboard-container" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="dashboard-close"
                            onClick={() => {
                                setShowDashboard(false)
                                setCurrentView('learn')
                            }}
                        >
                            ×
                        </button>
                        <Dashboard />
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar

