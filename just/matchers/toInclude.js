import { ExpectationFailure } from "../expectation-failure.js";
import { checkEquality } from "../structural-equality.js";
import * as col from "../text-colours.js";
import { isIterable } from "../utils.js";

export function toIncludeMatcher(equal) {
  return (actual, location, not, expected) => {
    if (!isIterable(actual)) {
      throw new ExpectationFailure({location, expected: "iterable", actual: [actual]});
    }

    if (not) {
      for (const item of actual) {
        if (matchTest(item, expected, equal)) {
          throw new ExpectationFailure({location, expected: [col.green("not to include"), expected], actual: [actual]});
        }
      }
    } else {
      for (const item of actual) {
        if (matchTest(item, expected, equal)) return;
      }
      throw new ExpectationFailure({location, expected: [col.green("to include"), expected], actual: [actual]});
    }
  };
}

function matchTest(actual, expected, equal) {
  if (equal) {
    const equalResult = checkEquality(actual, expected, {});
    return equalResult.passed;
  }
  return actual === expected;
}
