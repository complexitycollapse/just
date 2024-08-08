import { ExpectationFailure } from "../expectation-failure.js";
import { checkEquality } from "../structural-equality.js";

export function toEqualMatcher(actual, location, not, expected) {

  if (not) {
    const result = checkEquality(actual, expected, {});
    if (result.passed) {
      throw new ExpectationFailure({
        location,
        expected: ["not to equal", expected]
      });
    }
  } else {
    const result = checkEquality(actual, expected, {});
    if (!result.passed) {
      throw new ExpectationFailure({
        location,
        expected: result.expected,
        actual: result.actual
      });
    }
  }
  
}
