const EXAMPLES = [
  { n: 5, ranges: [3, 4, 1, 1, 0, 0], expectedResult: 1 },
  { n: 3, ranges: [0, 0, 0, 0], expectedResult: -1 },
];

const clamper = function (min, max) {
  return (value) => {
    if (value < min) return min;
    else if (value > max) return max;
    else return value;
  };
};

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
const minTaps = (n, ranges) => {
  /*
    This solution works by using a 'visited' buffer to
    keep track of where the taps have watered the garden.

    We sort the taps by their effective range to reduce
    the count of uniquely watering taps.
  */

  const clamp = clamper(0, n);

  const taps = ranges
    .map((range, point) => {
      return { range, point };
    })
    .filter(({ range }) => range !== 0)
    // Sort the taps by range in descending order, this is key to the solution.
    .sort((left, right) => right.range - left.range)
    .map(({ range, point }) => {
      return { start: clamp(point - range), end: clamp(point + range) };
    });

  let numEffectiveTaps = 0;
  let visited = new Array(n).fill(false);

  taps.forEach(({ start, end }) => {
    let wateredAtLeastOneSpace = false;

    for (let idx = start; idx <= end; ++idx) {
      if (!visited[idx]) {
        visited[idx] = true;
        wateredAtLeastOneSpace = true;
      }
    }

    if (wateredAtLeastOneSpace) {
      ++numEffectiveTaps;
    }
  });

  //  one space is not watered
  if (visited.includes(false)) return -1;
  else return numEffectiveTaps;
};

const run = (exampleId) => {
  const { n, ranges, expectedResult } = EXAMPLES[exampleId];
  console.log(`running example ${exampleId}..`);
  console.log(`input: n=${n}, ranges=${ranges}`);
  const result = minTaps(n, ranges);
  console.log(`output: ${result}`);

  if (result !== expectedResult) {
    console.log(`FAILED. expected ${expectedResult}`);
  } else {
    console.log("success");
  }
};

run(0);
run(1);
