// LocalStorage utility functions for persisting user data

export const storage = {
  // Progress tracking
  getProgress: () => {
    try {
      const data = localStorage.getItem('jsMastery_progress')
      return data ? JSON.parse(data) : { completedCards: [], bookmarks: [] }
    } catch (e) {
      return { completedCards: [], bookmarks: [] }
    }
  },

  saveProgress: (completedCards, bookmarks) => {
    try {
      localStorage.setItem('jsMastery_progress', JSON.stringify({
        completedCards: Array.from(completedCards),
        bookmarks: Array.from(bookmarks),
        lastUpdated: new Date().toISOString()
      }))
    } catch (e) {
      console.error('Failed to save progress:', e)
    }
  },

  // Expanded cards state
  getExpandedCards: () => {
    try {
      const data = localStorage.getItem('jsMastery_expanded')
      return data ? JSON.parse(data) : {}
    } catch (e) {
      return {}
    }
  },

  saveExpandedCards: (expandedCards) => {
    try {
      localStorage.setItem('jsMastery_expanded', JSON.stringify(expandedCards))
    } catch (e) {
      console.error('Failed to save expanded cards:', e)
    }
  },

  // Theme preference
  getTheme: () => {
    try {
      return localStorage.getItem('jsMastery_theme') || 'light'
    } catch (e) {
      return 'light'
    }
  },

  saveTheme: (theme) => {
    try {
      localStorage.setItem('jsMastery_theme', theme)
    } catch (e) {
      console.error('Failed to save theme:', e)
    }
  },

  // Search history
  getSearchHistory: () => {
    try {
      const data = localStorage.getItem('jsMastery_searchHistory')
      return data ? JSON.parse(data) : []
    } catch (e) {
      return []
    }
  },

  saveSearchHistory: (history) => {
    try {
      localStorage.setItem('jsMastery_searchHistory', JSON.stringify(history.slice(0, 10)))
    } catch (e) {
      console.error('Failed to save search history:', e)
    }
  },

  // User data
  getUser: () => {
    try {
      const data = localStorage.getItem('jsMastery_user')
      return data ? JSON.parse(data) : null
    } catch (e) {
      return null
    }
  },

  saveUser: (user) => {
    try {
      localStorage.setItem('jsMastery_user', JSON.stringify(user))
    } catch (e) {
      console.error('Failed to save user:', e)
    }
  },

  clearUser: () => {
    try {
      localStorage.removeItem('jsMastery_user')
    } catch (e) {
      console.error('Failed to clear user:', e)
    }
  },

  // Learning paths
  getLearningPaths: () => {
    try {
      const data = localStorage.getItem('jsMastery_paths')
      return data ? JSON.parse(data) : []
    } catch (e) {
      return []
    }
  },

  saveLearningPaths: (paths) => {
    try {
      localStorage.setItem('jsMastery_paths', JSON.stringify(paths))
    } catch (e) {
      console.error('Failed to save learning paths:', e)
    }
  },

  // Notes
  getNotes: () => {
    try {
      const data = localStorage.getItem('jsMastery_notes')
      return data ? JSON.parse(data) : {}
    } catch (e) {
      return {}
    }
  },

  saveNotes: (notes) => {
    try {
      localStorage.setItem('jsMastery_notes', JSON.stringify(notes))
    } catch (e) {
      console.error('Failed to save notes:', e)
    }
  },

  // Achievements
  getAchievements: () => {
    try {
      const data = localStorage.getItem('jsMastery_achievements')
      return data ? JSON.parse(data) : []
    } catch (e) {
      return []
    }
  },

  saveAchievements: (achievements) => {
    try {
      localStorage.setItem('jsMastery_achievements', JSON.stringify(achievements))
    } catch (e) {
      console.error('Failed to save achievements:', e)
    }
  },

  // Study goals
  getStudyGoals: () => {
    try {
      const data = localStorage.getItem('jsMastery_goals')
      return data ? JSON.parse(data) : null
    } catch (e) {
      return null
    }
  },

  saveStudyGoals: (goals) => {
    try {
      localStorage.setItem('jsMastery_goals', JSON.stringify(goals))
    } catch (e) {
      console.error('Failed to save study goals:', e)
    }
  }
}

