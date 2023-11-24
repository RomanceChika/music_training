import getIntervalNote from './getIntervalNote'

function generateCombinations() {
    const notes = ['C', 'C#', 'D♭', 'D', 'D#', 'E♭', 'E', 'F', 'F#', 'G♭', 'G', 'G#', 'A♭', 'A', 'A#', 'B♭', 'B'];
    const intervals = ['m2', 'M2', 'm3', 'M3', 'P4'];
    const directions = ['up', 'down'];
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
                    order: order++  // 元の順番を示すキーを追加
                });
            }
        }
    }

    return combinations;
}

function shuffleArray(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

function generateShuffledCombinations() {
    const combinations = generateCombinations();
    return shuffleArray(combinations);
}

function sortArray(array) {
    let sortedArray = [...array];
    sortedArray.sort((a, b) => a.order - b.order);

    return sortedArray;
}

export { generateShuffledCombinations, sortArray };
