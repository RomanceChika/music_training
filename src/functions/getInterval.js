function getNoteSemitones(note) {
    // 各音の基本的な半音数を定義
    const baseSemitones = {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'B': 11
    };

    let semitoneAdjustment = 0;
    // シャープ(#)とフラット(b)の調整
    for (let char of note) {
        if (char === '#') {
            semitoneAdjustment += 1;
        } else if (char === 'b') {
            semitoneAdjustment -= 1;
        }
    }

    return baseSemitones[note[0]] + semitoneAdjustment;
}

function getInterval(note1, note2) {
    const baseSemitones = {
        'C': 0,
        'D': 2,
        'E': 4,
        'F': 5,
        'G': 7,
        'A': 9,
        'B': 11
    };
    // 半音数の基本差異
    const semitoneDifferences = [0, 2, 4, 5, 7, 9, 11, 12];
    // 音程の度数
    const degrees = [1, 2, 3, 4, 5, 6, 7, 8];
    // 完全音程の度数
    const perfectIntervals = [0, 3, 4, 7];

    const semitones1 = getNoteSemitones(note1);
    const semitones2 = getNoteSemitones(note2);
    let semitoneDifference = (semitones2 - semitones1 + 12) % 12;

    let degreeIndex = semitoneDifferences.findIndex(diff => diff === semitoneDifference);
    if (degreeIndex === -1) {
        // 増、減、重増、重減の判定
        degreeIndex = semitoneDifferences.findIndex(diff => (diff + 12) % 12 === semitoneDifference);
        if (semitoneDifference > semitoneDifferences[degreeIndex]) {
            return (semitoneDifference - semitoneDifferences[degreeIndex] > 1 ? "Double Augmented " : "Augmented ") + degrees[degreeIndex];
        } else {
            return (semitoneDifferences[degreeIndex] - semitoneDifference > 1 ? "Double Diminished " : "Diminished ") + degrees[(degreeIndex + 1) % 8];
        }
    } else {
        // 完全、長、短のケース
        let quality = perfectIntervals.includes(degreeIndex) ? "Perfect" : (semitoneDifference > semitoneDifferences[degreeIndex] ? "Major" : "Minor");
        return quality + " " + degrees[degreeIndex];
    }
}






