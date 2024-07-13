import React, { useState, useEffect } from 'react';

const NoteForm = ({ addOrEditNote, noteToEdit, isDarkMode }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [noteToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newNote = { id: noteToEdit ? noteToEdit.id : Date.now(), title, content };
        addOrEditNote(newNote);
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
                <label htmlFor="noteTitle">Title</label>
                <input
                    type="text"
                    className={`form-control ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                    id="noteTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="noteContent">Content</label>
                <textarea
                    className={`form-control ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                    id="noteContent"
                    rows="3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary my-3">
                {noteToEdit ? 'Update Note' : 'Add Note'}
            </button>
        </form>
    );
};

export default NoteForm;