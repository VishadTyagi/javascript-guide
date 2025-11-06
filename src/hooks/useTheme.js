import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

export const useTheme = () => {
    const [darkMode, setDarkMode] = useState(false)

    // Load theme on mount
    useEffect(() => {
        const savedTheme = storage.getTheme()
        const isDark = savedTheme === 'dark'
        setDarkMode(isDark)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    // Apply theme changes
    useEffect(() => {
        const theme = darkMode ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', theme)
        storage.saveTheme(theme)
    }, [darkMode])

    const toggleTheme = () => {
        setDarkMode(prev => !prev)
    }

    return { darkMode, toggleTheme, setDarkMode }
}

