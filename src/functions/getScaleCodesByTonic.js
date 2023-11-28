import { SCALES } from "../constants/constant.js";
import getIntervalNote from "./getIntervalNote.js";

/**
 * 与えられたトニックとスケールに基づいてスケールの各音を生成します。
 * 各音は、degreeNameとcodeNameの2つのプロパティを持つオブジェクトとして表現されます。
 *
 * @param {string} tonic - トニック（基準音）。
 * @param {string} scale - スケールの種類。
 * @return {Array} スケールの各音を表すオブジェクトの配列。
 */
function getScaleCodesByTonic(tonic, scale) {
  // スケールのインターバルと度数を取得します
  const scaleIntervals = SCALES[scale].INTERVALS;
  const scaleDegrees = SCALES[scale].DEGREES;
  const scaleSeventh = SCALES[scale].SEVENTHS;

  // 各インターバルに対して音を生成し、degreeNameとcodeNameを持つオブジェクトを作成します
  return scaleIntervals.map((interval_type, index) => {
    // degreeNameはスケールの度数とセブンスから生成します
    const degreeName = `${scaleDegrees[index]}${scaleSeventh[index]}`;
    // codeNameはgetIntervalNote関数を使用して生成します
    const interval = `${interval_type}${index + 1}`;
    const root = getIntervalNote(tonic, interval, "up");
    const codeName = `${root}${scaleSeventh[index]}`;
    return { degreeName, codeName };
  });
}

export default getScaleCodesByTonic;
