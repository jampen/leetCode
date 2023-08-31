/**
 * For clamping  a number between min and max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 * @return {number}
 **/
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

  const taps = (() => {
    const clamp = clamper(0, n);

    return (
      ranges
        .map((range, point) => {
          return { range, point };
        })
        .filter(({ range }) => range !== 0)
        // Sort the taps by range in descending order, this is key to the solution.
        .sort((left, right) => right.range - left.range)
        .map(({ range, point }) => {
          return { start: clamp(point - range), end: clamp(point + range) };
        })
    );
  })();

  // The number of taps which have watered at least 1 space
  let numEffectiveTaps = 0;

  // For keeping track of where we have watered
  let visited = new Array(n).fill(false);

  // Water the garden
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

  //  At least one space is not watered
  if (visited.includes(false)) return -1;
  else return numEffectiveTaps;
};

module.exports = {
  minTaps,
};
