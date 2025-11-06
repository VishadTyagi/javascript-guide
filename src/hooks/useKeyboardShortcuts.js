import { useEffect } from 'react'
import { KEYBOARD_SHORTCUTS } from '../constants/categories'

export const useKeyboardShortcuts = (onSearch, onEscape) => {
    useEffect(() => {
        const handleKeyPress = (e) => {
            const { SEARCH, ESCAPE } = KEYBOARD_SHORTCUTS
            
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === SEARCH.key) {
                e.preventDefault()
                onSearch?.()
            }
            
            // Escape to close sidebar
            if (e.key === ESCAPE.key) {
                onEscape?.()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [onSearch, onEscape])
}

