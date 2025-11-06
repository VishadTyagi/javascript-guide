import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Auth.css'

const LoginModal = ({ onClose }) => {
    const { login } = useAuth()
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real app, this would call an API
        // For now, we'll create a user locally
        const user = {
            id: Date.now().toString(),
            name: formData.name || 'Learner',
            email: formData.email || `user${Date.now()}@example.com`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=667eea&color=fff`,
            level: 1,
            xp: 0,
            streak: 0,
        }
        login(user)
        onClose()
    }

    return (
        <div className="auth-modal-overlay" onClick={onClose}>
            <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
                <button className="auth-close" onClick={onClose}>×</button>
                <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
                <p>{isSignUp ? 'Start your JavaScript learning journey' : 'Continue learning JavaScript'}</p>
                
                <form onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your name"
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-submit">
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                
                <p className="auth-switch">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'Login' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginModal

