import { shuffleArray, sortArray } from "./arrayUtils";

describe("shuffleArray", () => {
  it("should return an array with the same length after shuffling", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled.length).toEqual(array.length);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4, 5];
    const copy = [...array];
    shuffleArray(array);
    expect(array).toEqual(copy);
  });
});

describe("sortArray", () => {
  it("should sort an array based on the order property", () => {
    const array = [{ order: 3 }, { order: 1 }, { order: 2 }];
    const sorted = sortArray(array);
    expect(sorted).toEqual([{ order: 1 }, { order: 2 }, { order: 3 }]);
  });

  it("should not mutate the original array", () => {
    const array = [{ order: 3 }, { order: 1 }, { order: 2 }];
    const copy = JSON.parse(JSON.stringify(array));
    sortArray(array);
    expect(array).toEqual(copy);
  });
});
