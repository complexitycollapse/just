import { ExpectationFailure } from "../expectation-failure.js";

export function toBeMatcher(actual, location, not, expected) {
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
