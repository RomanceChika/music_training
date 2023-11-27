/**
 * Toneライブラリで鳴らせる音に変換する
 * @param {*} note 音
 * @param {*} octave 音域
 * @returns
 */
function convertSoundToTone(note, octave = 4) {
  const noteMap = {
    "C♭♭": "A#",
    "C♭": "B",
    C: "C",
    "C#": "C#",
    "C##": "D",
    "D♭": "C#",
    "D♭♭": "C",
    D: "D",
    "D#": "D#",
    "D##": "E",
    "E♭": "D#",
    "E♭♭": "D",
    E: "E",
    "E#": "F",
    "E##": "F#",
    "F♭": "E",
    F: "F",
    "F#": "F#",
    "F##": "G",
    "G♭": "F#",
    "G♭♭": "F",
    G: "G",
    "G#": "G#",
    "G##": "A",
    "A♭": "G#",
    "A♭♭": "G",
    A: "A",
    "A#": "A#",
    "A##": "B",
    "B♭": "A#",
    "B♭♭": "A",
    B: "B",
    "B#": "C",
    "B##": "C#",
  };

  const toneNote = noteMap[note];

  // B#, B##, C♭ and C♭♭ cases
  if (
    (note === "B#" || note === "B##") &&
    (toneNote === "C" || toneNote === "C#")
  ) {
    octave += 1;
  } else if (
    (note === "C♭" || note === "C♭♭") &&
    (toneNote === "B" || toneNote === "A#")
  ) {
    octave -= 1;
  }

  return toneNote ? `${toneNote}${octave}` : null;
}

export default convertSoundToTone;
