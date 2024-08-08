import { ExpectationFailure } from "./expectation-failure.js";

export function expect(actual) {
  const stack = new Error().stack;

  return {
    toBe(expected) {
      if (expected !== actual) {
        throw new ExpectationFailure(getLocation(stack), expected, actual);
      }
    }
  };

}

function getLocation(stack) {
  const result = stack.split("\n")[2];
  return result;
}
