/**
 * Toneライブラリで鳴らせる音に変換する
 * @param {*} note 音
 * @param {*} octave 音域
 * @returns 
 */
function convertSoundToTone(note, octave = 4) {
    const noteMap = {
      'C': 'C',
      'C#': 'C#',
      'C##': 'D',
      'Db': 'C#',
      'Dbb': 'C',
      'D': 'D',
      'D#': 'D#',
      'D##': 'E',
      'Eb': 'D#',
      'Ebb': 'D',
      'E': 'E',
      'E#': 'F',
      'E##': 'F#',
      'Fb': 'E',
      'F': 'F',
      'F#': 'F#',
      'F##': 'G',
      'Gb': 'F#',
      'Gbb': 'F',
      'G': 'G',
      'G#': 'G#',
      'G##': 'A',
      'Ab': 'G#',
      'Abb': 'G',
      'A': 'A',
      'A#': 'A#',
      'A##': 'B',
      'Bb': 'A#',
      'Bbb': 'A',
      'B': 'B',
      'B#': 'C',
      'B##': 'C#'
    };
  
    const toneNote = noteMap[note];
    return toneNote ? `${toneNote}${octave}` : null;
  }

export default convertSoundToTone;