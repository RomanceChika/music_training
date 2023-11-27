import getTargetNoteOctave from "./getTargetNoteOctave";

describe("getTargetNoteOctave", () => {
  test("should return the correct octave when direction is up and target note is higher than base note", () => {
    expect(getTargetNoteOctave("C", 4, "D", "up")).toBe(4);
  });

  test("should return the correct octave when direction is up and target note is lower than base note", () => {
    expect(getTargetNoteOctave("C", 4, "B", "up")).toBe(4);
  });

  test("should return the correct octave when direction is down and target note is higher than base note", () => {
    expect(getTargetNoteOctave("C", 4, "D", "down")).toBe(3);
  });

  test("should return the correct octave when direction is down and target note is lower than base note", () => {
    expect(getTargetNoteOctave("C", 4, "B", "down")).toBe(3);
  });

  test("should return the correct octave when direction is up and base note is B4 and target note is C", () => {
    expect(getTargetNoteOctave("B", 4, "C", "up")).toBe(5);
  });
});
