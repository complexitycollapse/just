export class ExpectationFailure extends Error {

  location;
  expected;
  actual;

  constructor(location, expected, actual, extraParams) {
    super("Expectation failure");
    this.location = location;
    this.expected = expected;
    this.actual = actual;
    if (extraParams) {
      if (Object.hasOwn(extraParams, "stack")) this.stack = extraParams.stack;
      if (Object.hasOwn(extraParams, "extraInfo")) this.extraInfo = extraParams.extraInfo;
    }
  }
}
