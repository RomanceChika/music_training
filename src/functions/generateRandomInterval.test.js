import {
  generateCombinations,
  generateShuffledCombinations,
} from "./generateRandomInterval";

describe("generateCombinations", () => {
  it("should generate combinations based on given notes and intervals", () => {
    const notes = ["C", "D"];
    const intervals = ["m2", "M2"];
    const combinations = generateCombinations(notes, intervals);

    expect(combinations.length).toBe(8); // 2 notes * 2 intervals * 2 directions = 8 combinations
    expect(combinations[0]).toEqual({
      baseNote: "C",
      interval: "m2",
      direction: "up",
      resultNote: "D♭",
      result: "D♭",
      order: 0,
    });
  });
});

describe("generateShuffledCombinations", () => {
  it("should generate and shuffle combinations based on given notes and intervals", () => {
    const notes = ["C", "D"];
    const intervals = ["m2", "M2"];
    const combinations = generateShuffledCombinations(notes, intervals);

    expect(combinations.length).toBe(8); // 2 notes * 2 intervals * 2 directions = 8 combinations
    // We can't predict the exact order due to shuffling, but we can check the length and the structure of the elements
    expect(combinations[0]).toHaveProperty("baseNote");
    expect(combinations[0]).toHaveProperty("interval");
    expect(combinations[0]).toHaveProperty("direction");
    expect(combinations[0]).toHaveProperty("resultNote");
    expect(combinations[0]).toHaveProperty("order");
  });
});
