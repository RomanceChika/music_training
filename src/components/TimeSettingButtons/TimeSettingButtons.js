import React, { useState } from 'react';
import './TimeSettingButtons.css';

function TimerSettingButtons({ timeSettings, setTimerSetting }) {
  const [activeButton, setActiveButton] = useState(10);

  // 制限時間を設定するボタンのハンドラ
  function handleTimerSettingButtonClick(seconds) {
    setTimerSetting(seconds);
    setActiveButton(seconds);
  }

  return (
    <div>
      <p>制限時価の変更</p>
      {timeSettings.map(timeSetting => (
        <button 
          key={timeSetting} 
          onClick={() => handleTimerSettingButtonClick(timeSetting)}
          style={timeSetting === activeButton ? { backgroundColor: 'blue' } : {}}
        >
          {timeSetting}秒
        </button>
      ))}
    </div>
  );
}

export default TimerSettingButtons;
