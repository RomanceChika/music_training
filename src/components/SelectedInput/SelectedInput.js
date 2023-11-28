import React from "react";
import "./SelectedInput.css";

function SelectedInput({ answer }) {
  return <p className="selected-input">選択された入力: {answer}</p>;
}

export default SelectedInput;
