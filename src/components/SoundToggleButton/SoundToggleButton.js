import { useSound } from "../../contexts/SoundContext";
import "./SoundToggleButton.css";
import * as Tone from "tone";

function SoundToggleButton() {
  const { isSoundOn, setIsSoundOn } = useSound();

  const toggleSound = () => {
    // 初回は手動動作に応じてTone.start()を実行しないとAPIが有効化されない仕様のため
    if (!isSoundOn && Tone.context.state !== "running") {
      Tone.start();
    }
    setIsSoundOn((prevIsSoundOn) => !prevIsSoundOn);
    //setIsSoundOn(!isSoundOn);
  };

  return (
    <div className="sound-toggle-button">
      <button onClick={toggleSound}>
        {isSoundOn ? "Sound: ON" : "Sound: OFF"}
      </button>
    </div>
  );
}

export default SoundToggleButton;
