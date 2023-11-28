// 配列のクラス

/**
 * 配列をシャッフルします。
 * @param {Array} array - シャッフルする配列。
 * @return {Array} シャッフルされた配列。
 */
export function shuffleArray(array) {
  let shuffledArray = [...array];
  // Fisher-Yatesのアルゴリズムを使用して配列をシャッフル
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/**
 * 配列をソートします。
 * @param {Array} array - ソートする配列。
 * @return {Array} ソートされた配列。
 */
export function sortArray(array) {
  let sortedArray = [...array];
  // 配列を'order'プロパティに基づいてソート
  sortedArray.sort((a, b) => a.order - b.order);

  return sortedArray;
}
