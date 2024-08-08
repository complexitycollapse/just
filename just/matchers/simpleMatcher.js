import { ExpectationFailure } from "../expectation-failure.js";
import * as col from "../text-colours.js";

export function simpleMatcher(comparison, failString, showExpected = true, ignoreNot = false) {
  return (actual, location, not, expected) => {
    if (!ignoreNot && not) {
      throw new ExpectationFailure({location, extraInfo: "can't use not with this matcher"});
    } else {
      console.log("actual", actual, "expected", expected);
      if (!comparison(actual, expected)) {
        throw new ExpectationFailure({location, expected: showExpected ? [col.green(failString), expected] : col.green(failString), actual});
      }
    }
  };
}
