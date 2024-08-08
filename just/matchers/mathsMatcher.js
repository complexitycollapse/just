import { ExpectationFailure } from "../expectation-failure.js";

export function mathsMatcher(comparison, failString) {
  return (actual, location, not, expected) => {
    if (not) {
      throw new ExpectationFailure({location, extraInfo: "can't use not with mathematical matcher"});
    } else {
      if (!comparison(actual, expected)) {
        throw new ExpectationFailure({location, expected: [failString, expected], actual});
      }
    }
  };
}
