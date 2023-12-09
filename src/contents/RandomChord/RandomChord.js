import React, { useState, useEffect } from "react";
import "./RandomChord.css";
import { NOTES, CHORD_TYPES, INVERSIONS } from "../../constants/constant";
import { getChords } from "../../functions/getChords";
import { shuffleArray } from "../../functions/arrayUtils";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup";
import TimeSettingButtons from "../../components/TimeSettingButtons/TimeSettingButtons";
import ControlButtons from "../../components/ControlButtons/ControlButtons";

function RandomChord() {
  const [chords, setChords] = useState([]);
  const [currentChord, setCurrentChord] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(null);
  const [interval, setInterval] = useState(5); // 5秒ごとに更新
  const [countdown, setCountdown] = useState(interval);
  const [selectedNotes, setSelectedNotes] = useState(NOTES);
  const [selectedChordTypes, setSelectedChordTypes] = useState(CHORD_TYPES);
  const [selectedInversions, setSelectedInversions] = useState(INVERSIONS);

  const handleNoteChange = (event) => {
    const note = event.target.value;
    setSelectedNotes((prevNotes) => {
      const newNotes = prevNotes.includes(note)
        ? prevNotes.filter((n) => n !== note)
        : [...prevNotes, note];
      setChords(
        shuffleArray(
          getChords(newNotes, selectedChordTypes, selectedInversions)
        )
      );
      return newNotes;
    });
  };

  const handleChordTypeChange = (event) => {
    const chordType = event.target.value;
    setSelectedChordTypes((prevChordTypes) => {
      const newChordTypes = prevChordTypes.includes(chordType)
        ? prevChordTypes.filter((c) => c !== chordType)
        : [...prevChordTypes, chordType];
      setChords(
        shuffleArray(
          getChords(selectedNotes, newChordTypes, selectedInversions)
        )
      );
      return newChordTypes;
    });
  };

  const handleInversionChange = (event) => {
    const inversion = event.target.value;
    setSelectedInversions((prevInversions) => {
      const newInversions = prevInversions.includes(inversion)
        ? prevInversions.filter((i) => i !== inversion)
        : [...prevInversions, inversion];
      setChords(
        shuffleArray(
          getChords(selectedNotes, selectedChordTypes, newInversions)
        )
      );
      return newInversions;
    });
  };

  useEffect(() => {
    if (isStarted && countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (isStarted && countdown === 0) {
      setCurrentChord(chords.pop());
      setChords(chords);
      setCountdown(interval);
    }
  }, [countdown, isStarted]);

  const start = () => {
    setChords(
      shuffleArray(
        getChords(selectedNotes, selectedChordTypes, selectedInversions)
      )
    );
    setIsStarted(true);
    setCountdown(interval);
  };

  const stop = () => {
    setIsStarted(false);
  };

  const reset = () => {
    setIsStarted(false);
    setChords([]);
    setCurrentChord("");
    setCountdown(interval);
  };

  return (
    <div className="container">
      <h1>Random Chord</h1>
      <CheckboxGroup
        title="対象とする基準音"
        items={NOTES}
        selectedItems={selectedNotes}
        onChange={handleNoteChange}
        show={!isStarted}
      />
      <CheckboxGroup
        title="対象とするコードタイプ"
        items={CHORD_TYPES}
        selectedItems={selectedChordTypes}
        onChange={handleChordTypeChange}
        show={!isStarted}
      />
      <CheckboxGroup
        title="対象とするインバージョン"
        items={INVERSIONS}
        selectedItems={selectedInversions}
        onChange={handleInversionChange}
        show={!isStarted}
      />
      <TimeSettingButtons
        timeSettings={[5, 7, 10, 15]}
        setTimerSetting={setInterval}
      />
      <ControlButtons
        handleStart={start}
        handleStop={stop}
        handleReset={reset}
      />
      <p className="current-chord">Current Chord: {currentChord}</p>
      <p className="other-text">Remaining: {chords.length}</p>
      <p className="other-text">Countdown: {countdown}</p>
    </div>
  );
}

export default RandomChord;
