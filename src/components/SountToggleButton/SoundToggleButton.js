import { useSound } from '../../contexts/SoundContext';

function SoundToggleButton() {
  const { isSoundOn, setIsSoundOn } = useSound();

  return (
    <button onClick={() => setIsSoundOn(!isSoundOn)}>
      {isSoundOn ? 'Sound: ON' : 'Sound: OFF'}
    </button>
  );
}

export default SoundToggleButton;