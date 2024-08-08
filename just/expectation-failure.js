export class ExpectationFailure extends Error {

  constructor(params) {
    super("Expectation failure");
    Object.assign(this, params);
  }
}
