import React, { useState, useEffect } from 'react'

const NoteEditor = ({ cardId, initialNote, onSave, onClose }) => {
    const [note, setNote] = useState(initialNote || '')

    useEffect(() => {
        setNote(initialNote || '')
    }, [initialNote])

    const handleSave = () => {
        onSave(cardId, note)
        onClose()
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    {initialNote ? 'Edit Note' : 'Add Note'}
                </h4>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <i className="fas fa-times text-sm"></i>
                </button>
            </div>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your notes here..."
                rows={4}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
            />
            <div className="flex gap-2 mt-3">
                <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    Save
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default NoteEditor
