import { getChords } from "./getChords";

describe("getChords", () => {
  it("should return all combinations of roots, chord_types, and inversions", () => {
    const roots = ["C", "D", "E"];
    const chord_types = ["m7", "7"];
    const inversions = ["1st", "2nd"];

    const result = getChords(roots, chord_types, inversions);

    expect(result).toEqual([
      "C m7 1st",
      "C m7 2nd",
      "C 7 1st",
      "C 7 2nd",
      "D m7 1st",
      "D m7 2nd",
      "D 7 1st",
      "D 7 2nd",
      "E m7 1st",
      "E m7 2nd",
      "E 7 1st",
      "E 7 2nd",
    ]);
  });
});
