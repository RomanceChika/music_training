/**
 * Generate all combinations of roots, chord_types, and inversions.
 *
 * @param {string[]} roots - An array of root notes.
 * @param {string[]} chord_types - An array of chord types.
 * @param {string[]} inversions - An array of inversions.
 * @return {string[]} An array of all combinations of root, chord_type, and inversion.
 */
export function getChords(roots, chord_types, inversions) {
  let chords = [];

  roots.forEach((root) => {
    chord_types.forEach((chord_type) => {
      inversions.forEach((inversion) => {
        chords.push(`${root} ${chord_type} ${inversion}`);
      });
    });
  });

  return chords;
}
