import getIntervalNote from "./getIntervalNote";
import { shuffleArray } from "./arrayUtils";

/**
 * 与えられた音符と間隔の配列に基づいて音程の組み合わせを生成します。
 * 各組み合わせは、基準音、間隔、方向、結果の音、および元の順序を示すオブジェクトとして表現されます。
 *
 * @param {Array} notes - 基準となる音符の配列。
 * @param {Array} intervals - 生成する音程の配列。
 * @return {Array} 音程の組み合わせを表すオブジェクトの配列。
 */
export function generateCombinations(notes, intervals) {
  const directions = ["up", "down"];
  let combinations = [];
  let order = 0;

  for (let note of notes) {
    for (let interval of intervals) {
      for (let direction of directions) {
        const resultNote = getIntervalNote(note, interval, direction);
        combinations.push({
          baseNote: note,
          interval: interval,
          direction: direction,
          resultNote: resultNote,
          order: order++, // 元の順番を示すキーを追加
        });
      }
    }
  }

  return combinations;
}

/**
 * 与えられた音符と間隔の配列に基づいて音程の組み合わせを生成し、それをシャッフルします。
 *
 * @param {Array} notes - 基準となる音符の配列。
 * @param {Array} intervals - 生成する音程の配列。
 * @return {Array} シャッフルされた音程の組み合わせを表すオブジェクトの配列。
 */
export function generateShuffledCombinations(notes, intervals) {
  const combinations = generateCombinations(notes, intervals);
  return shuffleArray(combinations);
}
