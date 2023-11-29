import getScaleCodesByTonic from "./getScaleCodesByTonic";
import { shuffleArray } from "./arrayUtils";

/**
 * 与えられたキーの配列に基づいてスケールコードの組み合わせを生成します。
 * 各組み合わせは、キー、スケールコード、および元の順序を示すオブジェクトとして表現されます。
 *
 * @param {Array} keys - スケールコードを生成するためのキーの配列。
 * @return {Array} スケールコードの組み合わせを表すオブジェクトの配列。
 */
export function generateCombinations(keys) {
  let combinations = [];
  let order = 0;

  for (let key of keys) {
    const scaleCodes = getScaleCodesByTonic(key, "Major");
    for (let scaleCode of scaleCodes) {
      combinations.push({
        key: key,
        degree: scaleCode.degreeName,
        result: scaleCode.codeName,
        order: order++,
      });
    }
  }

  return combinations;
}

/**
 * 与えられたキーの配列に基づいてスケールコードの組み合わせを生成し、それをシャッフルします。
 *
 * @param {Array} keys - スケールコードを生成するためのキーの配列。
 * @return {Array} シャッフルされたスケールコードの組み合わせを表すオブジェクトの配列。
 */
export function generateShuffledCombinations(keys) {
  const combinations = generateCombinations(keys);
  return shuffleArray(combinations);
}
