const { minTaps } = require("../index.js");

const EXAMPLES = [
  { n: 5, ranges: [3, 4, 1, 1, 0, 0], expectedResult: 1 },
  { n: 3, ranges: [0, 0, 0, 0], expectedResult: -1 },
];

describe("minTaps", () => {
  it("Is purely functional", () => {
    const baseInput = [...EXAMPLES][0];
    const input = { ...baseInput };
    minTaps(input.n, input.ranges);
    expect(input).toEqual(baseInput);
  });

  it("Returns -1 if the garden is not fully watered", () => {
    const input = EXAMPLES[1];
    const result = minTaps(input.n, input.ranges);
    expect(result).toEqual(-1);
  });

  it("Returns the minumum number of taps needed to water the garden fully ", () => {
    const input = EXAMPLES[0];
    const result = minTaps(input.n, input.ranges);
    expect(result).toEqual(input.expectedResult);
  });
});
