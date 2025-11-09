import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

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
        <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
                    >
                        <i className="fas fa-times text-gray-500"></i>
                    </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    {isSignUp ? 'Start your JavaScript learning journey' : 'Continue learning JavaScript'}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Your name"
                                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-primary text-white rounded-lg font-semibold shadow-soft hover:shadow-glow transition-all duration-200"
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                
                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-semibold"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default LoginModal
