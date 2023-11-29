import {
  generateCombinations,
  generateShuffledCombinations,
} from "./generateRandomScaleCode";

describe("generateCombinations", () => {
  it("should generate scale code combinations based on the given keys", () => {
    const keys = ["C", "D"];
    const combinations = generateCombinations(keys);

    // Check that the combinations array has the correct length
    expect(combinations.length).toBe(14);

    // Check that each combination has the correct properties
    combinations.forEach((combination, index) => {
      expect(combination).toHaveProperty("key");
      expect(combination).toHaveProperty("degree");
      expect(combination).toHaveProperty("result");
      expect(combination).toHaveProperty("order");
      expect(combination.order).toBe(index);
    });
  });
});

describe("generateShuffledCombinations", () => {
  it("should generate and shuffle scale code combinations based on the given keys", () => {
    const keys = ["C", "D"];
    const combinations = generateShuffledCombinations(keys);

    // Check that the combinations array has the correct length
    expect(combinations.length).toBe(14);

    // Check that each combination has the correct properties
    combinations.forEach((combination) => {
      expect(combination).toHaveProperty("key");
      expect(combination).toHaveProperty("degree");
      expect(combination).toHaveProperty("result");
      expect(combination).toHaveProperty("order");
    });

    // Check that the combinations are shuffled (it's possible but highly unlikely that they will be in the original order)
    const orders = combinations.map((combination) => combination.order);
    expect(orders).not.toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  });
});
