import React from 'react';

const Note = ({ note, editNote, deleteNote, isDarkMode }) => {
    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <div className={`card-body ${isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.content}</p>
                    <button className="btn btn-warning" onClick={() => editNote(note)}>Edit</button>
                    <button className="btn btn-danger mx-2" onClick={() => deleteNote(note.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Note;