import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = storage.getUser()
        if (savedUser) {
            setUser(savedUser)
        }
        setIsLoading(false)
    }, [])

    const login = useCallback((userData) => {
        const userWithTimestamp = {
            ...userData,
            joinedAt: userData.joinedAt || new Date().toISOString(),
            lastLogin: new Date().toISOString()
        }
        setUser(userWithTimestamp)
        storage.saveUser(userWithTimestamp)
    }, [])

    const logout = useCallback(() => {
        setUser(null)
        storage.clearUser()
    }, [])

    const updateUser = useCallback((updates) => {
        setUser(prev => {
            const updated = { ...prev, ...updates }
            storage.saveUser(updated)
            return updated
        })
    }, [])

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

