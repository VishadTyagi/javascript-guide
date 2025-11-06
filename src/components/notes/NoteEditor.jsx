import React, { useState, useEffect } from 'react'
import './Notes.css'

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
        <div className="note-editor">
            <div className="note-editor-header">
                <h3>📝 Add Note</h3>
                <button className="note-close" onClick={onClose}>×</button>
            </div>
            <textarea
                className="note-textarea"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your notes here..."
                rows={6}
            />
            <div className="note-editor-actions">
                <button className="note-save" onClick={handleSave}>
                    <i className="fas fa-save"></i> Save
                </button>
                <button className="note-cancel" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default NoteEditor

