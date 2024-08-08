export class ExpectationFailure extends Error {

  location;
  expected;
  actual;
  stack;

  constructor(location, expected, actual, stack) {
    super("Expectation failure");
    this.location = location;
    this.expected = expected;
    this.actual = actual;
    this.stack = stack;
  }
}
