import convertSoundToTone from "./convertSoundToTone";

describe("convertSoundToTone", () => {
  it("converts note and octave to tone.js format", () => {
    const note = "C";
    const octave = 4;
    const expected = "C4";

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles sharp (#) in note", () => {
    const note = "C#";
    const octave = 4;
    const expected = "C#4";

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles double sharp (##) in note", () => {
    const note = "C##";
    const octave = 4;
    const expected = "D4"; // C## is equivalent to D

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles flat (♭) in note", () => {
    const note = "D♭";
    const octave = 4;
    const expected = "C#4"; // D♭ is equivalent to C#

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles double flat (♭♭) in note", () => {
    const note = "D♭♭";
    const octave = 4;
    const expected = "C4"; // D♭♭ is equivalent to C

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles octave change for B#", () => {
    const note = "B#";
    const octave = 4;
    const expected = "C5"; // B#4 is equivalent to C5

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("handles octave change for C♭", () => {
    const note = "C♭";
    const octave = 5;
    const expected = "B4"; // C♭5 is equivalent to B4

    const result = convertSoundToTone(note, octave);

    expect(result).toEqual(expected);
  });

  it("returns null when note is not in noteMap", () => {
    const note = "Z"; // 'Z' is not in noteMap
    const octave = 4;

    const result = convertSoundToTone(note, octave);

    expect(result).toBeNull();
  });
});
