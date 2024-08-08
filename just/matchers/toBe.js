import { ExpectationFailure } from "../expectation-failure.js";

export function toBeMatcher(expected, actual, location, not) {
  if (not) {
    if (expected === actual) {
      throw new ExpectationFailure({location, expected: ["not to be", expected]});
    }
  } else {
    if (expected !== actual) {
      throw new ExpectationFailure({location, expected, actual});
    }
  }
}
