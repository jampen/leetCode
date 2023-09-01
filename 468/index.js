const EXAMPLES = [
  { ip: "172.16.254.1", result: "IPv4" },
  { ip: "100.160.BAD.12", result: "Neither" },
  { ip: "100.160.35.12", result: "IPv4" },
  { ip: "2001:0db8:85a3:0:0:8A2E:0370:7334", result: "IPv6" },
  { ip: "3401:1ff2:12a2:0:3:C0A2:0370:7334", result: "IPv6" },
  { ip: "256.256.256.256", result: "Neither" },
];

/**
 * @param {string} queryIP
 * @return {string}
 */
function isValidIPv4(queryIP) {
  const numberRegex = /\d+/;

  if (numberRegex.test(!queryIP.slice(-1))) return false;

  const bytes = queryIP
    .split(".")
    .filter((segment) => numberRegex.test(segment))
    .filter((segment) => !segment.startsWith("0"))
    .map((segment) => parseInt(segment))
    .filter((number) => number >= 1 && number <= 255);

  return bytes.length === 4;
}

/**
 * @param {string} queryIP
 * @return {string}
 */
function isValidIPv6(queryIP) {
  const hexRegex = /[A-F|0-9]+/i;

  if (!hexRegex.test(queryIP.slice(-1))) return false;

  const hex = queryIP
    .split(":")
    .filter((segment) => hexRegex.test(segment))
    .map((segment) => `0x${segment}`)
    .map((segment) => parseInt(segment))
    .filter((number) => number >= 0 && number <= 0xffff);

  return hex.length === 8;
}

/**
 * @param {string} queryIP
 * @return {string}
 */
function validIPAddress(queryIP) {
  if (queryIP.includes(".")) {
    if (isValidIPv4(queryIP)) return "IPv4";
  } else if (queryIP.includes(":")) {
    if (isValidIPv6(queryIP)) return "IPv6";
  }
  return "Neither";
}

function run(id) {
  console.log(`running example #${id}`);
  console.log("--");
  const example = EXAMPLES[id];
  const result = validIPAddress(example.ip);
  if (result === example.result) {
    console.log("success.");
  } else {
    console.log(`failure. was ${result}, should be: ${example.result}`);
    console.log("parameters:");
    console.log(`ip: ${example.ip}`);
  }
  console.log("--");
}

for (let idx = 0; idx < EXAMPLES.length; ++idx) {
  run(idx);
}
