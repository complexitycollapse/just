import { ExpectationFailure } from "../expectation-failure.js";

export function toHaveLengthMatcher(actual, location, not, expected) {
  if (!Array.isArray(actual)) {
    throw new ExpectationFailure({location, expected: "an Array", actual});
  }

  if (not) {
    if (actual.length === expected) {
      throw new ExpectationFailure({
        location,
        expected: "length to not be " + expected,
        extraInfo: ["Array was:", actual]
      });
    }
  } else {
    if (actual.length !== expected) {
      throw new ExpectationFailure({
        location,
        expected: "length to be " + expected,
        actual: "length to be " + actual.length,
        extraInfo: ["Array was:", actual]
      });
    }
  }
  
}
