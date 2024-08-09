import { ExpectationFailure } from "../expectation-failure.js";

export function toThrowMatcher(actual, location, not, expected) {
  
  let exceptionThrown, exception;

  try {
    actual();
  } catch (e) {
    exception = e;
    exceptionThrown = true;
  }

  if (not) {
    if (exceptionThrown) {
      
      if (expected) {
        if (exception.message.includes(expected)) {
          throw new ExpectationFailure({location, expected: ["to not throw exception with message containing", expected], actual: [exception]});
        }
        return;
      }
      
      throw new ExpectationFailure({location, expected: "not to throw exception", actual: [exception]});
    }
  } else {
    if (!exceptionThrown) {
      throw new ExpectationFailure({location, expected: "to throw exception"});
    }
    if (expected && !exception.message.includes(expected)) {
      throw new ExpectationFailure({location, expected: ["to throw exception with message containing", expected], actual: [exception]});
    }
  }
}
