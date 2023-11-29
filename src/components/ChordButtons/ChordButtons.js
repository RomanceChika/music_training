import React, { useState } from "react";

function ChordButtons({ setAnswer }) {
  const [selectedNote, setSelectedNote] = useState("C");
  const [selectedAccidental, setSelectedAccidental] = useState("");
  const [selectedCodeType, setSelectedCodeType] = useState("△7");

  const notes = ["C", "D", "E", "F", "G", "A", "B"];
  const accidentals = ["♭♭", "♭", "", "#", "##"];
  const code_types = ["△7", "m7", "7", "ø7"];

  const handleNoteButtonClick = (note) => {
    setSelectedNote(note);
    setAnswer(note + selectedAccidental);
  };

  const handleAccidentalButtonClick = (accidental) => {
    setSelectedAccidental(accidental);
    setAnswer(selectedNote + accidental);
  };

  const handleCodeTypeButtonClick = (code_type) => {
    setSelectedCodeType(code_type);
    setAnswer(selectedNote + selectedAccidental + code_type);
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

  const codeTypeButtons = code_types.map((code_type) => (
    <button
      key={code_type}
      onClick={() => handleCodeTypeButtonClick(code_type)}
      className={selectedCodeType === code_type ? "selected" : ""}
    >
      {code_type}
    </button>
  ));

  return (
    <div className="code-buttons">
      <div>{noteButtons}</div>
      <div>{accidentalButtons}</div>
      <div>{codeTypeButtons}</div>
    </div>
  );
}

export default ChordButtons;
