import getScaleCodesByTonic from "./getScaleCodesByTonic";

describe("getScaleCodesByTonic", () => {
  it("should return the correct scales for a given tonic and scale", () => {
    const result = getScaleCodesByTonic("C", "Major");
    expect(result).toEqual([
      { degreeName: "I△7", codeName: "C△7" },
      { degreeName: "IIm7", codeName: "Dm7" },
      { degreeName: "IIIm7", codeName: "Em7" },
      { degreeName: "IV△7", codeName: "F△7" },
      { degreeName: "V7", codeName: "G7" },
      { degreeName: "VIm7", codeName: "Am7" },
      { degreeName: "VIIø7", codeName: "Bø7" },
    ]);
  });
  it("should return the correct scales for a given tonic and scale case G♭", () => {
    const result = getScaleCodesByTonic("G♭", "Major");
    expect(result).toEqual([
      { degreeName: "I△7", codeName: "G♭△7" },
      { degreeName: "IIm7", codeName: "A♭m7" },
      { degreeName: "IIIm7", codeName: "B♭m7" },
      { degreeName: "IV△7", codeName: "C♭△7" },
      { degreeName: "V7", codeName: "D♭7" },
      { degreeName: "VIm7", codeName: "E♭m7" },
      { degreeName: "VIIø7", codeName: "Fø7" },
    ]);
  });
});
