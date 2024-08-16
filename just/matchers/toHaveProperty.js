import { ExpectationFailure } from "../expectation-failure.js";
import { format } from "../format.js";

export function toHavePropertyMatcher(actual, location, not, ...expectation) {
  const [expectedProperty, expectedValue] = expectation ?? [];

  if (typeof expectedProperty !== "string" || expectedProperty.length === 0) {
    throw new ExpectationFailure({location, extraInfo: ["Invalid expectedProperty argument: ", expectedProperty]});
  }

  if (typeof actual !== "object") {
    throw new ExpectationFailure({location, expected: "an Object", actual});
  }

  if (not) {
    if (Object.hasOwn(actual, expectedProperty)) {
      throw new ExpectationFailure({
        location,
        expected: "to not have property " + expectedProperty,
        extraInfo: ["Value was:", actual[expectedProperty]]
      });
    }
  } else {
    if (!Object.hasOwn(actual, expectedProperty)) {
      throw new ExpectationFailure({
        location,
        expected: "to have property " + expectedProperty,
        extraInfo: "Actual object was: " + format(actual)
      });
    }
    if (expectation.length > 1 && actual[expectedProperty] !== expectedValue) {
      throw new ExpectationFailure({
        location,
        expected: expectedValue,
        actual: actual[expectedProperty],
        extraInfo: ["Property tested:", expectedProperty]
      });
    }
  }
  
}
