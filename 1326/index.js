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

module.exports = {
  minTaps,
};
