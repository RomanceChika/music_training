import React, { useState } from "react";

function ChordButtons({ setAnswer }) {
  const [selectedNote, setSelectedNote] = useState("C");
  const [selectedAccidental, setSelectedAccidental] = useState("");
  const [selectedChordType, setSelectedChordType] = useState("△7");

  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const accidentals = ["♭♭", "♭", "", "#", "##"];
  const chord_types = ["△7", "m7", "7", "ø7"];

  const handleNoteButtonClick = (note) => {
    setSelectedNote(note);
    setAnswer(note + selectedAccidental + selectedChordType);
  };

  const handleAccidentalButtonClick = (accidental) => {
    setSelectedAccidental(accidental);
    setAnswer(selectedNote + accidental + selectedChordType);
  };

  const handleChordTypeButtonClick = (chord_type) => {
    setSelectedChordType(chord_type);
    setAnswer(selectedNote + selectedAccidental + chord_type);
  };

  const noteButtons = notes.map((note) => (
    <button
      key={note}
      onClick={() => handleNoteButtonClick(note)}
      className={selectedNote === note ? "selected" : ""}
    >
      {note}
    </button>
  ));

  const accidentalButtons = accidentals.map((accidental) => (
    <button
      key={accidental}
      onClick={() => handleAccidentalButtonClick(accidental)}
      className={selectedAccidental === accidental ? "selected" : ""}
    >
      {accidental || "なし"}
    </button>
  ));

  const chordTypeButtons = chord_types.map((chord_type) => (
    <button
      key={chord_type}
      onClick={() => handleChordTypeButtonClick(chord_type)}
      className={selectedChordType === chord_type ? "selected" : ""}
    >
      {chord_type}
    </button>
  ));

  return (
    <div className="chord-buttons">
      <div>{noteButtons}</div>
      <div>{accidentalButtons}</div>
      <div>{chordTypeButtons}</div>
    </div>
  );
}

export default ChordButtons;
