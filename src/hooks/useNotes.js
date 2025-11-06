import { useState, useEffect, useCallback } from 'react'
import { storage } from '../utils/storage'

export const useNotes = () => {
    const [notes, setNotes] = useState({})

    // Load notes on mount
    useEffect(() => {
        const saved = storage.getNotes()
        if (Object.keys(saved).length > 0) {
            setNotes(saved)
        }
    }, [])

    // Save notes when they change
    useEffect(() => {
        if (Object.keys(notes).length > 0) {
            storage.saveNotes(notes)
        }
    }, [notes])

    const getNote = useCallback((cardId) => {
        return notes[cardId] || ''
    }, [notes])

    const saveNote = useCallback((cardId, noteText) => {
        setNotes(prev => ({
            ...prev,
            [cardId]: noteText
        }))
    }, [])

    const deleteNote = useCallback((cardId) => {
        setNotes(prev => {
            const updated = { ...prev }
            delete updated[cardId]
            return updated
        })
    }, [])

    return {
        notes,
        getNote,
        saveNote,
        deleteNote,
    }
}

