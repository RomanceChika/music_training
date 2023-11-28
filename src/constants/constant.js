export const NOTES = [
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

export const INTERVALS = [
  "m2",
  "M2",
  "m3",
  "M3",
  "P4",
  "P5",
  "m6",
  "M6",
  "m7",
  "M7",
];

export const SCALES = {
  Major: {
    // 各度数の音程が主音からMajor, Minor, Perfectのいずれかであることを定義
    INTERVALS: ["P", "M", "M", "P", "P", "M", "M"],
    NAME: "Major",
    // トライアドの場合のコードの種類を定義
    TRIADS: ["M", "m", "m", "M", "M", "m", "dim"],
    // 7thコードの場合のコードの種類を定義
    SEVENTHS: ["△7", "m7", "m7", "△7", "7", "m7", "ø7"],
    // ディグリー表記の場合の各音のルートの度数
    DEGREES: ["I", "II", "III", "IV", "V", "VI", "VII"],
  },
};
