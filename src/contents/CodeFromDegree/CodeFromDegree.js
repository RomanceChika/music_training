import React, { useState, useEffect } from "react";
import generateRandomScaleCode from "../../functions/generateRandomScaleCode";
import CodeButtons from "../../components/CodeButtons/CodeButtons";
import CodeTable from "../../components/CodesTable/CodesTable";
import TimerSettingButtons from "../../components/TimeSettingButtons/TimeSettingButtons.js";

function CodeFromDegree() {
  const [scaleCodeData, setScaleCodeData] = useState(generateRandomScaleCode());
  const [answer, setAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isStarted, setIsStarted] = useState(false);
  const [timerSetting, setTimerSetting] = useState(10);

  useEffect(() => {
    setTimeLeft(timerSetting);
  }, [timerSetting]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (isStarted && timeLeft === 0) {
      setScaleCodeData((prevScaleCodeData) => {
        const isCorrect = prevScaleCodeData.codeName === answer;
        return {
          ...prevScaleCodeData,
          isCorrect,
          userAnswer: answer,
        };
      });
      setScaleCodeData(generateRandomScaleCode());
      setTimeLeft(timerSetting);
    }
  }, [timeLeft, isStarted]);

  const handleStartButtonClick = () => {
    setIsStarted(true);
  };

  const handleStopButtonClick = () => {
    setIsStarted(false);
  };

  const handleResetButtonClick = () => {
    setIsStarted(false);
    setScaleCodeData(generateRandomScaleCode());
    setTimeLeft(timerSetting);
  };

  return (
    <div className="code-from-degree">
      <h1>Code From Degree</h1>
      <button onClick={handleStartButtonClick}>開始</button>
      <button onClick={handleStopButtonClick}>停止</button>
      <button onClick={handleResetButtonClick}>リセット</button>
      <p>選択された入力: {answer}</p>
      <p>残り時間: {timeLeft}秒</p>
      <CodeButtons setAnswer={setAnswer} />
      <TimerSettingButtons
        timeSettings={[5, 7, 10, 15]}
        setTimerSetting={setTimerSetting}
      />
      <CodeTable sortedResults={[scaleCodeData]} />
    </div>
  );
}

export default CodeFromDegree;
