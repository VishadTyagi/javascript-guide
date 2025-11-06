import { useState, useEffect } from 'react'
import { storage } from '../utils/storage'

export const useExpandedCards = () => {
    const [expandedCards, setExpandedCards] = useState({})

    // Load expanded cards on mount
    useEffect(() => {
        const savedExpanded = storage.getExpandedCards()
        if (Object.keys(savedExpanded).length > 0) {
            setExpandedCards(savedExpanded)
        }
    }, [])

    // Save expanded cards when they change
    useEffect(() => {
        if (Object.keys(expandedCards).length > 0) {
            storage.saveExpandedCards(expandedCards)
        }
    }, [expandedCards])

    const toggleCard = (cardId) => {
        setExpandedCards(prev => ({
            ...prev,
            [cardId]: !prev[cardId]
        }))
    }

    const isExpanded = (cardId) => {
        return expandedCards[cardId] || false
    }

    return { expandedCards, toggleCard, isExpanded }
}

