import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addOrEditNote = (newNote) => {
    if (noteToEdit) {
      setNotes(notes.map((note) => (note.id === newNote.id ? newNote : note)));
      setNoteToEdit(null);
    } else {
      setNotes([...notes, newNote]);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const startEditingNote = (note) => {
    setNoteToEdit(note);
  };

  return (
    <div className={isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'} style={{ height: '100vh' }}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container">
        <NoteForm addOrEditNote={addOrEditNote} noteToEdit={noteToEdit} isDarkMode={isDarkMode} />
        <div className="row">
          {notes.map((note) => (
            <Note key={note.id} note={note} editNote={startEditingNote} deleteNote={deleteNote} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;