import getScaleCodesByTonic from "./getScaleCodesByTonic";

const tonicList = [
  "C♭",
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
  "B♭",
  "B",
];

function generateRandomScaleCode() {
  const randomKeyIndex = Math.floor(Math.random() * tonicList.length);
  const randomKey = tonicList[randomKeyIndex];
  const scaleCodes = getScaleCodesByTonic(randomKey, "Major"); // ここではMajorスケールを使用しています
  const randomIndex = Math.floor(Math.random() * scaleCodes.length);
  const randomScaleCode = scaleCodes[randomIndex];
  randomScaleCode.key = randomKey;
  randomScaleCode.order = randomIndex;
  return randomScaleCode;
}

export default generateRandomScaleCode;
