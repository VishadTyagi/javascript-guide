import { useState, useMemo, useCallback } from 'react'
import { learningData } from '../data/learningData'

export const useSearch = (activeCategory, difficultyFilter) => {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCards = useMemo(() => {
        const categoryData = learningData[activeCategory] || learningData['core-js']
        let cards = categoryData.cards || []
        
        // Filter by difficulty
        if (difficultyFilter !== 'all') {
            cards = cards.filter(card => 
                (card.difficulty || 'Beginner').toLowerCase() === difficultyFilter.toLowerCase()
            )
        }
        
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase()
            cards = cards.filter(card => 
                card.title.toLowerCase().includes(query) ||
                card.description.toLowerCase().includes(query) ||
                (card.examples && card.examples.some(ex => 
                    ex.title.toLowerCase().includes(query) ||
                    ex.code.toLowerCase().includes(query)
                ))
            )
        }
        
        return cards
    }, [activeCategory, difficultyFilter, searchQuery])

    const clearSearch = useCallback(() => {
        setSearchQuery('')
    }, [])

    return {
        searchQuery,
        setSearchQuery,
        filteredCards,
        clearSearch,
    }
}

