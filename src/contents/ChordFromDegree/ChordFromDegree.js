import React, { useState, useEffect } from "react";
import { NOTES } from "../../constants/constant.js";
import { generateShuffledCombinations } from "../../functions/generateRandomScaleCode.js";
import TimerSettingButtons from "../../components/TimeSettingButtons/TimeSettingButtons.js";
import ControlButtons from "../../components/ControlButtons/ControlButtons.js";
import ChordButtons from "../../components/ChordButtons/ChordButtons.js";
import SelectedInput from "../../components/SelectedInput/SelectedInput.js";
import CodesTable from "../../components/ChordsTable/ChordsTable.js";
import ResultDisplay from "../../components/ResultDisplay/ResultDisplay.js";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup.js";
import { sortArray } from "../../functions/arrayUtils.js";
import usePlayNote from "../../sounds/usePlayNote.js";
import convertSoundToTone from "../../functions/convertSoundToTone.js";
import getChordTones from "../../functions/getChordTones.js";

function CodeFromDegree() {
  const [scaleCodeData, setScaleCodeData] = useState(
    generateShuffledCombinations(NOTES)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [answer, setAnswer] = useState("C△7");
  const [showResult, setShowResult] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timerSetting, setTimerSetting] = useState(10);
  const [sortedResults, setSortedResults] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(NOTES);

  useEffect(() => {
    setSortedResults(sortArray(scaleCodeData));
  }, [scaleCodeData]);

  useEffect(() => {
    setTimeLeft(timerSetting);
  }, [timerSetting]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (isStarted && timeLeft === 0) {
      setShowResult(true);
      setScaleCodeData((prevScaleCodeData) => {
        const updatedScaleCodeData = [...prevScaleCodeData];
        const isCorrect = updatedScaleCodeData[currentIndex].result === answer;
        updatedScaleCodeData[currentIndex] = {
          ...updatedScaleCodeData[currentIndex],
          isCorrect,
          userAnswer: answer,
        };
        return updatedScaleCodeData;
      });

      const timerId = setTimeout(() => {
        setShowResult(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % scaleCodeData.length);
        setTimeLeft(timerSetting);
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isStarted]);

  // 音を鳴らす
  const playNote = usePlayNote();
  useEffect(() => {
    if (isStarted) {
      if (currentIndex < scaleCodeData.length) {
        // 基準音をtone.jsで鳴らせる音の文字列に変換
        const tonic = scaleCodeData[currentIndex].key;
        const toneTonic = convertSoundToTone(tonic);
        if (showResult) {
          // コードネームからコード構成音を算出して鳴らす
          const chordName = scaleCodeData[currentIndex].result;
          const chordTones = getChordTones(chordName);
          playNote(toneTonic);
          const timerId = setTimeout(() => playNote(chordTones, "4n"), 500);
          return () => clearTimeout(timerId);
        } else {
          playNote(toneTonic, "1n");
        }
      } else {
        setIsStarted(false);
      }
    }
  }, [showResult, playNote, isStarted]);

  const handleKeyChange = (event) => {
    const key = event.target.value;
    setSelectedKeys((prevKeys) => {
      const newKeys = prevKeys.includes(key)
        ? prevKeys.filter((k) => k !== key)
        : [...prevKeys, key];
      setScaleCodeData(generateShuffledCombinations(newKeys));
      return newKeys;
    });
  };

  const handleStartButtonClick = () => {
    setIsStarted(true);
    setTimeLeft(timerSetting);
  };

  const handleStopButtonClick = () => {
    setIsStarted(false);
  };

  const handleResetButtonClick = () => {
    setIsStarted(false);
    setCurrentIndex(0);
    setScaleCodeData(generateShuffledCombinations(selectedKeys));
    setTimeLeft(timerSetting);
  };

  return (
    <div className="code-from-degree">
      <CheckboxGroup
        title="対象とするキー"
        items={NOTES}
        selectedItems={selectedKeys}
        onChange={handleKeyChange}
        show={!isStarted}
      />
      <ControlButtons
        handleStart={handleStartButtonClick}
        handleStop={handleStopButtonClick}
        handleReset={handleResetButtonClick}
      />
      {isStarted && (
        <div>
          <p>key: {scaleCodeData[currentIndex].key}</p>
          <p>degree: {scaleCodeData[currentIndex].degree}</p>
          <SelectedInput answer={answer} />
          <p>残り時間: {timeLeft}秒</p>
          <ResultDisplay
            showResult={showResult}
            answer={answer}
            data={scaleCodeData}
            currentIndex={currentIndex}
          />
          <ChordButtons setAnswer={setAnswer} />
        </div>
      )}
      <TimerSettingButtons
        timeSettings={[5, 7, 10, 15]}
        setTimerSetting={setTimerSetting}
      />
      <CodesTable sortedResults={sortedResults} />
    </div>
  );
}

export default CodeFromDegree;
