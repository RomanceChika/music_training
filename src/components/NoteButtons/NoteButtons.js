import React, { useState } from 'react';
import './NoteButtons.css';

function NoteButtons({ setAnswer }) {
  const [selectedNote, setSelectedNote] = useState('');
  const [selectedAccidental, setSelectedAccidental] = useState('');

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const accidentals = ['♭♭', '♭', '', '#', '##'];

  const handleNoteButtonClick = (note) => {
    setSelectedNote(note);
    setAnswer(note + selectedAccidental);
  }

  const handleAccidentalButtonClick = (accidental) => {
    setSelectedAccidental(accidental);
    setAnswer(selectedNote + accidental);
  }

  const noteButtons = notes.map(note => (
    <button
      key={note}
      onClick={() => handleNoteButtonClick(note)}
      className={selectedNote === note ? 'selected' : ''}
    >
      {note}
    </button>
  ));

  const accidentalButtons = accidentals.map(accidental => (
    <button
      key={accidental}
      onClick={() => handleAccidentalButtonClick(accidental)}
      className={selectedAccidental === accidental ? 'selected' : ''}
    >
      {accidental || 'なし'}
    </button>
  ));

  return (
    <div>
      <div>{noteButtons}</div>
      <div>{accidentalButtons}</div>
    </div>
  );
}

export default NoteButtons;
