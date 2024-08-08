import { ExpectationFailure } from "./expectation-failure.js";

export function expect(actual) {
  const stack = new Error().stack;
  const loc = getLocation(stack);

  return {

    toBe(expected) {
      if (expected !== actual) {
        throw new ExpectationFailure(loc, expected, actual);
      }
    },

    toHaveLength(expected) {
      if (!Array.isArray(actual)) {
        throw new ExpectationFailure(loc, "an Array", actual);
      } else if (actual.length !== expected) {
        throw new ExpectationFailure(loc, "length to be " + expected, "length to be " + actual.length, {extraInfo: ["Array was:", actual]});
      }
    }

  };

}

function getLocation(stack) {
  const result = stack.split("\n")[2];
  return result;
}
