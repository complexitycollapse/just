import { ExpectationFailure } from "./expectation-failure.js";

export function expect(actual) {
  const stack = new Error().stack;
  const location = getLocation(stack);

  return {

    toBe(expected) {
      if (expected !== actual) {
        throw new ExpectationFailure({location, expected, actual});
      }
    },

    toHaveLength(expected) {
      if (!Array.isArray(actual)) {
        throw new ExpectationFailure({location, expected: "an Array", actual});
      } else if (actual.length !== expected) {
        throw new ExpectationFailure({location, expected: "length to be " + expected, actual: "length to be " + actual.length, extraInfo: ["Array was:", actual]});
      }
    }

  };

}

function getLocation(stack) {
  const result = stack.split("\n")[2];
  return result;
}
