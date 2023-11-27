/**
 * 特定の基準音とターゲットの音と方向の情報から近い音のオクターブを返す
 * @param baseNote 基準音
 * @param baseNoteOctave 基準音のオクターブ
 * @param note ターゲットの音
 * @param direction up or down
 * @returns
 */
function getTargetNoteOctave(baseNote, baseNoteOctave, note, direction) {
  const noteOrder = [
    "C",
    "C#",
    "D♭",
    "D",
    "D#",
    "E♭",
    "E",
    "F",
    "F#",
    "G♭",
    "G",
    "G#",
    "A♭",
    "A",
    "A#",
    "B♭",
    "B",
  ];
  const baseNoteIndex = noteOrder.indexOf(baseNote);
  const targetNoteIndex = noteOrder.indexOf(note);
  let targetNoteOctave;

  if (direction === "up") {
    targetNoteOctave =
      targetNoteIndex > baseNoteIndex ? baseNoteOctave : baseNoteOctave + 1;
  } else if (direction === "down") {
    targetNoteOctave =
      targetNoteIndex < baseNoteIndex ? baseNoteOctave : baseNoteOctave - 1;
  }

  return targetNoteOctave;
}

export default getTargetNoteOctave;
