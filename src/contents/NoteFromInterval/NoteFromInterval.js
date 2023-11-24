import React, { useState, useEffect, useCallback } from 'react';
import './NoteFromInterval.css'
import { sortArray, generateShuffledCombinations } from '../../functions/generateRandomInterval.js';
import TimerSettingButtons from '../../components/TimeSettingButtons/TimeSettingButtons.js';
import NoteButtons from '../../components/NoteButtons/NoteButtons.js';
import IntervalsTable from '../../components/IntervalsTable/IntervalsTable.js';
import usePlayNote from '../../hooks/usePlayNote';

function NoteFromInterval() {
  const [intervalData, setIntervalData] = useState(generateShuffledCombinations());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timerSetting, setTimerSetting] = useState(10); // 制限時間の設定用の状態変数を追加
  const [isStarted, setIsStarted] = useState(false); // 開始・停止の状態を管理する状態変数を追加
  const [sortedResults, setSortedResults] = useState([]);

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
      setShowResult(true);
      if (intervalData[currentIndex] && answer === intervalData[currentIndex].resultNote) {
        setCorrectCount(correctCount + 1);
        intervalData[currentIndex].isCorrect = true;  // 正答フラグを追加
      } else {
        setIncorrectCount(incorrectCount + 1);
        intervalData[currentIndex].isCorrect = false;  // 正答フラグを追加
      }
      intervalData[currentIndex].userAnswer = answer;  // ユーザーの回答を追加
      const timerId = setTimeout(() => {
        setShowResult(false);
        setCurrentIndex(currentIndex + 1);  // 次の問題へ進む
        setTimeLeft(timerSetting); // 制限時間を設定用の状態変数から取得
      },2000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isStarted]);

  const directionTranslation = {
    up: '上↑',
    down: '下↓'
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
    setIntervalData(generateShuffledCombinations());
  }

  // 音を鳴らす
  const playNote = usePlayNote();
  useEffect(() => {
    console.log('isStarted:', isStarted);
    console.log('showResult:', showResult);
    if (isStarted) {
      if (showResult) {
        console.log('Playing C4 and E4');
        playNote("C4");
        const timerId = setTimeout(() => playNote("E4"), 500);
        return () => clearTimeout(timerId);
      } else {
        console.log('Playing C4');
        playNote("C4", "1n");
      }
    }
  }, [showResult, playNote, isStarted]);

  return (
    <div>
      <h1>音程</h1>
      <button onClick={handleStartButtonClick}>開始</button>
      <button onClick={handleStopButtonClick}>停止</button>
      <button onClick={handleResetButtonClick}>リセット</button>
      <p>正解数: {correctCount}/{correctCount + incorrectCount}</p>
      {isStarted && (
        <div>
          <p>基準音: {intervalData[currentIndex].baseNote}</p>
          <p>音程: {intervalData[currentIndex].interval}</p>
          <p>方向: {directionTranslation[intervalData[currentIndex].direction]}</p>
          <p className="selected-input">選択された入力: {answer}</p> {/* 選択された入力を表示 */}
          <p>残り時間: {timeLeft}秒</p>
          {showResult && (
            <div>
              <p className={answer === intervalData[currentIndex].resultNote ? 'correct' : 'wrong'}>
                {answer === intervalData[currentIndex].resultNote ? '正答です' : '誤答です'}
              </p>
              {answer !== intervalData[currentIndex].resultNote && <p>正答は {intervalData[currentIndex].resultNote} でした。</p>}
            </div>
          )}
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

export default NoteFromInterval
