/**
 * 幹音間の度数を判定する関数。
 * @param {string} note1 - 最初の幹音。
 * @param {string} note2 - 二番目の幹音。
 * @return {number} 二つの幹音間の度数。
 */
function getDegreeDifference(note1, note2) {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const index1 = notes.indexOf(note1);
    const index2 = notes.indexOf(note2);
    let degreeDiff = (index2 - index1 + 7) % 7;
    return degreeDiff === 0 ? 7 : degreeDiff + 1;
}

/**
 * 幹音間の半音距離を判定する関数。
 * @param {string} note1 - 最初の幹音。
 * @param {string} note2 - 二番目の幹音。
 * @return {number} 二つの幹音間の半音数。
 */
function getSemitoneDifference(note1, note2) {
    const semitones = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11};
    return ((semitones[note2] - semitones[note1] + 12) % 12);
}

/**
 * 音程の種類に基づいて必要な半音数を計算する関数。
 * @param {string} interval - 音程（例: 'm3', 'M3' など）。
 * @return {number} 音程に必要な半音数。
 */
function getIntervalSemitones(interval) {
    const intervalSemitones = {
        'P1': 0, 'm2': 1, 'M2': 2, 'm3': 3, 'M3': 4, 'P4': 5, 'd5': 6, 'P5': 7, 'm6': 8, 'M6': 9, 'm7': 10, 'M7': 11, 'P8': 12
    };
    return intervalSemitones[interval] || 0;
}

/**
 * 幹音から特定の度数の音名を導出する関数。
 * @param {string} baseNote - 基準となる幹音。
 * @param {number} degree - 目標とする度数。
 * @param {string} direction - 方向（'up' または 'down'）。
 * @return {string} 指定された度数の音名。
 */
function getNoteByDegree(baseNote, degree, direction) {
    const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const index = notes.indexOf(baseNote);
    const adjustedIndex = direction === 'up' ? index + degree - 1 : index - degree + 1;
    return notes[(adjustedIndex + 7) % 7];
}

/**
 * 目標音程に必要な変化記号の数を計算する関数。
 * @param {string} baseNote - 基準音（変化記号含む）。
 * @param {string} targetNote - 目標音の幹音。
 * @param {string} interval - 音程。
 * @return {number} 変化記号による調整量。
 */
function calculateAccidentalAdjustment(baseNote, targetNote, interval) {
    const baseSemitone = getSemitoneFromBase(baseNote);
    const targetBaseSemitone = getSemitoneFromBase(targetNote.charAt(0));
    const intervalSemitone = getIntervalSemitones(interval);

    let theoreticalSemitone = baseSemitone + intervalSemitone;
    theoreticalSemitone = (theoreticalSemitone + 12) % 12;

    let semitoneAdjustment = theoreticalSemitone - targetBaseSemitone;
    if (semitoneAdjustment > 6) semitoneAdjustment -= 12; // 大きすぎる調整を正規化
    else if (semitoneAdjustment < -6) semitoneAdjustment += 12; // 小さすぎる調整を正規化

    return semitoneAdjustment;
}




/**
 * 変化記号を適用する関数。
 * @param {string} note - 幹音。
 * @param {number} adjustment - 変化記号による調整量。
 * @return {string} 変化記号を適用した音名。
 */
function applyAccidental(note, adjustment) {
    if (adjustment > 0) {
        return note + (adjustment === 1 ? '#' : '##');
    } else if (adjustment < 0) {
        return note + (adjustment === -1 ? '♭' : '♭♭');
    }
    return note;
}

/**
 * 変化記号に基づく半音数の補正を計算する関数。
 * @param {string} accidental - 変化記号（'', '#', '##', '♭', '♭♭'）。
 * @return {number} 補正後の半音数。
 */
function getAccidentalAdjustment(accidental) {
    switch (accidental) {
        case '##':
            return 2;
        case '#':
            return 1;
        case '♭':
            return -1;
        case '♭♭':
            return -2;
        default:
            return 0;
    }
}

/**
 * 基準音と音程から目標の音名を計算する総合関数。
 * @param {string} baseNote - 基準音（変化記号含む）。
 * @param {string} interval - 音程（例: 'P5', 'm3' など）。
 * @param {string} direction - 方向（'up' または 'down'）。
 * @return {string} 計算された目標音名。
 */
function getIntervalNote(baseNote, interval, direction) {
    const baseNoteChar = baseNote.charAt(0);
    const intervalNumber = parseInt(interval.charAt(1)); // 音程の数字部分
    const targetNoteChar = getNoteByDegree(baseNoteChar, intervalNumber, direction); // 目標音の幹音
    const baseSemitone = getSemitoneFromBase(baseNote);
    const requiredSemitone = getIntervalSemitones(interval); // 音程に必要な半音数

    // 目標音までの実際の半音数を計算
    let actualSemitone = direction === 'up'
        ? baseSemitone + requiredSemitone
        : baseSemitone - requiredSemitone;

    actualSemitone = (actualSemitone + 12) % 12; // 半音数を0から11の範囲に正規化

    // 目標音の幹音の半音数
    const targetSemitone = getSemitoneFromBase(targetNoteChar);

    // 半音数の差に基づいて変化記号を適用
    let semitoneDiff = actualSemitone - targetSemitone;
    if (semitoneDiff > 6) semitoneDiff -= 12; // 大きすぎる調整を正規化
    else if (semitoneDiff < -6) semitoneDiff += 12; // 小さすぎる調整を正規化

    return applyAccidental(targetNoteChar, semitoneDiff);
}



/**
 * 変化記号を含む基準音からの半音数を取得する関数。
 * @param {string} note - 変化記号を含む音名。
 * @return {number} 半音数。
 */
function getSemitoneFromBase(note) {
    const baseSemitones = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11};
    let semitone = baseSemitones[note.charAt(0)];
    semitone += getAccidentalAdjustment(note.slice(1));
    return semitone;
}

// ...（その他の関数）

/*
const notes = ['C♭', 'D♭', 'E♭', 'F♭', 'G♭', 'A♭', 'B♭'];
const intervals = ['m2', 'M2', 'm3', 'M3', 'P4', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
const directions = ['up', 'down'];

for (let note of notes) {
    for (let interval of intervals) {
        for (let direction of directions) {
            const result = getIntervalNote(note, interval, direction);
            console.log(`基準音: ${note}, 音程: ${interval}, 方向: ${direction}, 結果: ${result}`);
        }
    }
}
*/


export default getIntervalNote