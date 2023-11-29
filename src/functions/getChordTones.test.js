import getChordTones from "./getChordTones";

describe("getChordTones function", () => {
  test("should handle codeName without accidentals", () => {
    expect(getChordTones("C△7")).toEqual(["C3", "E4", "G4", "B4"]);
    expect(getChordTones("Dm7")).toEqual(["D3", "F4", "A4", "C5"]);
    expect(getChordTones("E7")).toEqual(["E3", "G#4", "B4", "D5"]);
    expect(getChordTones("Fø7")).toEqual(["F3", "G#4", "B4", "D#5"]);
  });

  test("should handle codeName with accidentals", () => {
    expect(getChordTones("C♭△7")).toEqual(["B2", "D#5", "F#5", "A#5"]);
    expect(getChordTones("D♭♭m7")).toEqual(["C3", "D#4", "G4", "A#4"]);
    expect(getChordTones("E#7")).toEqual(["F3", "A4", "C5", "D#5"]);
    expect(getChordTones("F##ø7")).toEqual(["G3", "A#4", "C#5", "F5"]);
  });
});
