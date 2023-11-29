import getIntervalNote from "./getIntervalNote";
import getTargetNoteOctave from "./getTargetNoteOctave";
import convertSoundToTone from "./convertSoundToTone";

const CODE_INTERVALS = {
  "△7": ["M3", "P5", "M7"],
  m7: ["m3", "P5", "m7"],
  7: ["M3", "P5", "m7"],
  ø7: ["m3", "d5", "m7"],
};

function getChordTones(chordName, octave = 4) {
  // 音名とコードの種類を分離する
  const [root, chordType] = chordName.match(/([A-G][#♭♯♮]*)(.*)/).slice(1);

  // rootから必要な音を配列として取得する
  const intervals = CODE_INTERVALS[chordType];
  if (!intervals) {
    throw new Error(`Unknown code type: ${chordType}`);
  }

  // それぞれをrootから上に重ねるのでoctaveの補正とtone用の音への変換をする
  const tones = intervals.map((interval) => {
    // 異名同音で処理がややこしくなるので一旦音名をtoneで使えるものに変換
    const convertedRoot = convertSoundToTone(root, octave).replace(/\d+/g, "");
    const note = getIntervalNote(convertedRoot, interval, "up");
    const noteOctave = getTargetNoteOctave(convertedRoot, octave, note, "up");
    return convertSoundToTone(note, noteOctave);
  });

  // rootと同じ音名のbaseを考えてrootよりオクターブ下の同音として定義する
  const base = convertSoundToTone(root, octave - 1);

  // これらの音を配列として返す
  return [base, ...tones];
}

export default getChordTones;
