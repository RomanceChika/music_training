import React from "react";

function ControlButtons({ handleStart, handleStop, handleReset }) {
  return (
    <div className="control-buttons">
      <button onClick={handleStart}>開始</button>
      <button onClick={handleStop}>停止</button>
      <button onClick={handleReset}>リセット</button>
    </div>
  );
}

export default ControlButtons;
