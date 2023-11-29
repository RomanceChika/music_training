import React, { useState, useEffect } from "react";
import "./NoteFromInterval.css";
import { NOTES, INTERVALS } from "../../constants/constant.js";
import { generateShuffledCombinations } from "../../functions/generateRandomInterval.js";
import TimerSettingButtons from "../../components/TimeSettingButtons/TimeSettingButtons.js";
import ControlButtons from "../../components/ControlButtons/ControlButtons.js";
import NoteButtons from "../../components/NoteButtons/NoteButtons.js";
import SelectedInput from "../../components/SelectedInput/SelectedInput.js";
import IntervalsTable from "../../components/IntervalsTable/IntervalsTable.js";
import ResultDisplay from "../../components/ResultDisplay/ResultDisplay.js";
import CheckboxGroup from "../../components/CheckboxGroup/CheckboxGroup.js";
import usePlayNote from "../../sounds/usePlayNote.js";
import convertSoundToTone from "../../functions/convertSoundToTone.js";
import getTargetNoteOctave from "../../functions/getTargetNoteOctave.js";
import { sortArray } from "../../functions/arrayUtils.js";

function NoteFromInterval() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answer, setAnswer] = useState("C");
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timerSetting, setTimerSetting] = useState(10); // 制限時間の設定用の状態変数を追加
  const [isStarted, setIsStarted] = useState(false); // 開始・停止の状態を管理する状態変数を追加
  const [sortedResults, setSortedResults] = useState([]);
  const [selectedNotes, setSelectedNotes] = useState(NOTES);
  //音程はデフォルトではP5, m6, M6, m7, M7は除外
  const [selectedIntervals, setSelectedIntervals] = useState(
    INTERVALS.filter(
      (interval) =>
        interval !== "P5" &&
        interval !== "m6" &&
        interval !== "M6" &&
        interval !== "m7" &&
        interval !== "M7"
    )
  );

  const [intervalData, setIntervalData] = useState(
    generateShuffledCombinations(selectedNotes, selectedIntervals)
  );

  useEffect(() => {
    setSortedResults(sortArray(intervalData));
  }, [intervalData]);

  useEffect(() => {
    setTimeLeft(timerSetting);
  }, [timerSetting]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (isStarted && timeLeft === 0) {
      if (currentIndex >= intervalData.length) {
        setIsStarted(false);
      } else {
        setShowResult(true);
        if (
          intervalData[currentIndex] &&
          answer === intervalData[currentIndex].resultNote
        ) {
          setCorrectCount(correctCount + 1);
          intervalData[currentIndex].isCorrect = true; // 正答フラグを追加
        } else {
          setIncorrectCount(incorrectCount + 1);
          intervalData[currentIndex].isCorrect = false; // 正答フラグを追加
        }
        intervalData[currentIndex].userAnswer = answer; // ユーザーの回答を追加
        const timerId = setTimeout(() => {
          setShowResult(false);
          setCurrentIndex(currentIndex + 1); // 次の問題へ進む
          setTimeLeft(timerSetting); // 制限時間を設定用の状態変数から取得
        }, 2000);
        return () => clearTimeout(timerId);
      }
    }
  }, [timeLeft, isStarted]);

  const directionTranslation = {
    up: "上↑",
    down: "下↓",
  };

  const handleNoteChange = (event) => {
    const note = event.target.value;
    setSelectedNotes((prevNotes) => {
      const newNotes = prevNotes.includes(note)
        ? prevNotes.filter((n) => n !== note)
        : [...prevNotes, note];
      // 新しい音程データを生成し、状態にセット
      setIntervalData(
        generateShuffledCombinations(newNotes, selectedIntervals)
      );
      return newNotes;
    });
  };

  const handleIntervalChange = (event) => {
    const interval = event.target.value;
    setSelectedIntervals((prevIntervals) => {
      const newIntervals = prevIntervals.includes(interval)
        ? prevIntervals.filter((i) => i !== interval)
        : [...prevIntervals, interval];
      // 新しい音程データを生成し、状態にセット
      setIntervalData(
        generateShuffledCombinations(selectedNotes, newIntervals)
      );
      return newIntervals;
    });
  };

  // 開始ボタンのハンドラ
  async function handleStartButtonClick() {
    setIsStarted(true);
    setTimeLeft(timerSetting); // 開始時に0になると即時誤答となるので、制限時間を設定用の状態変数から取得
  }

  // 停止ボタンのハンドラ
  function handleStopButtonClick() {
    setIsStarted(false);
  }

  // リセットボタンのハンドラ
  function handleResetButtonClick() {
    setIsStarted(false);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIntervalData(
      generateShuffledCombinations(selectedNotes, selectedIntervals)
    );
  }

  // 音を鳴らす
  const playNote = usePlayNote();
  useEffect(() => {
    if (isStarted) {
      if (currentIndex < intervalData.length) {
        // 基準音をtone.jsで鳴らせる音の文字列に変換
        const baseNote = intervalData[currentIndex].baseNote;
        const toneBaseNote = convertSoundToTone(baseNote);
        if (showResult) {
          // 正答を上下で一番近い音でかつtone.jsで鳴らせる音の文字列に変換
          const resultNote = intervalData[currentIndex].resultNote;
          const direction = intervalData[currentIndex].direction;
          const toneResultNoteOctave = getTargetNoteOctave(
            baseNote,
            4,
            resultNote,
            direction
          );
          const toneResultNote = convertSoundToTone(
            resultNote,
            toneResultNoteOctave
          );
          playNote(toneBaseNote);
          const timerId = setTimeout(() => playNote(toneResultNote), 500);
          return () => clearTimeout(timerId);
        } else {
          playNote(toneBaseNote, "1n");
        }
      } else {
        setIsStarted(false);
      }
    }
  }, [showResult, playNote, isStarted]);

  return (
    <div className="note-from-interval">
      <CheckboxGroup
        title="対象とする基準音"
        items={NOTES}
        selectedItems={selectedNotes}
        onChange={handleNoteChange}
        show={!isStarted}
      />
      <CheckboxGroup
        title="対象とする音程"
        items={INTERVALS}
        selectedItems={selectedIntervals}
        onChange={handleIntervalChange}
        show={!isStarted}
      />
      <ControlButtons
        handleStart={handleStartButtonClick}
        handleStop={handleStopButtonClick}
        handleReset={handleResetButtonClick}
      />
      <div>
        <p>
          正解数: {correctCount}/{correctCount + incorrectCount}
        </p>
      </div>
      {isStarted && (
        <div>
          <p>基準音: {intervalData[currentIndex].baseNote}</p>
          <p>音程: {intervalData[currentIndex].interval}</p>
          <p>
            方向: {directionTranslation[intervalData[currentIndex].direction]}
          </p>
          <SelectedInput answer={answer} />
          {/* 選択された入力を表示 */}
          <p>残り時間: {timeLeft}秒</p>
          <ResultDisplay
            showResult={showResult}
            answer={answer}
            data={intervalData}
            currentIndex={currentIndex}
          />
          <NoteButtons setAnswer={setAnswer} />
        </div>
      )}
      <TimerSettingButtons
        timeSettings={[5, 7, 10, 15]}
        setTimerSetting={setTimerSetting}
      />
      <IntervalsTable sortedResults={sortedResults} />
    </div>
  );
}

export default NoteFromInterval;
