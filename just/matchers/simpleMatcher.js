import { ExpectationFailure } from "../expectation-failure.js";
import * as col from "../text-colours.js";

export function simpleMatcher(comparison, failString, showExpected = true) {
  return (actual, location, not, expected) => {
    if (not) {
      throw new ExpectationFailure({location, extraInfo: "can't use not with mathematical matcher"});
    } else {
      if (!comparison(actual, expected)) {
        throw new ExpectationFailure({location, expected: showExpected ? [col.green(failString), expected] : col.green(failString), actual});
      }
    }
  };
}
