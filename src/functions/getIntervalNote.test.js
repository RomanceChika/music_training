import getIntervalNote from "./getIntervalNote";

describe("getIntervalNote", () => {
  test("should return the correct note when base note is C, interval is M3, and direction is up", () => {
    expect(getIntervalNote("C", "M3", "up")).toBe("E");
  });

  test("should return the correct note when base note is E, interval is m3, and direction is down", () => {
    expect(getIntervalNote("E", "m3", "down")).toBe("C#");
  });

  test("should return the correct note when base note is G, interval is P5, and direction is up", () => {
    expect(getIntervalNote("G", "P5", "up")).toBe("D");
  });

  test("should return the correct note when base note is D, interval is P4, and direction is down", () => {
    expect(getIntervalNote("D", "P4", "down")).toBe("A");
  });

  test("should return the correct note when base note is C#, interval is M3, and direction is up", () => {
    expect(getIntervalNote("C#", "M3", "up")).toBe("E#");
  });

  test("should return the correct note when base note is E♭, interval is m3, and direction is down", () => {
    expect(getIntervalNote("E♭", "m3", "down")).toBe("C");
  });

  test("should return the correct note when base note is G##, interval is P5, and direction is up", () => {
    expect(getIntervalNote("G##", "P5", "up")).toBe("D##");
  });

  test("should return the correct note when base note is D♭♭, interval is P4, and direction is down", () => {
    expect(getIntervalNote("D♭♭", "P4", "down")).toBe("A♭♭");
  });
});
