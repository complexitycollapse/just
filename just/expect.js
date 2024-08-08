import { mathsMatcher } from "./matchers/MathsMatcher.js";
import { toBeMatcher } from "./matchers/toBe.js";
import { toHaveLengthMatcher } from "./matchers/toHaveLength.js";
import { toHavePropertyMatcher } from "./matchers/toHaveProperty.js";

export function expect(actual) {
  const stack = new Error().stack;
  const location = getLocation(stack);

  return makeExpectObj(actual, location);
}

function getLocation(stack) {
  const result = stack.split("\n")[2];
  return result;
}

function makeExpectObj(actual, location, negate) {
  const match = matcher => (...args) => {
    matcher.apply(undefined, [actual, location, negate].concat(args));
  }

  const expectObj = {

    toBe: match(toBeMatcher),
    toHaveLength: match(toHaveLengthMatcher),
    toHaveProperty: match(toHavePropertyMatcher),
    toBeLessThan: match(mathsMatcher((x, y) => x < y, "to be less than")),
    toBeLessThanOrEqual: match(mathsMatcher((x, y) => x <= y, "to be less than or equal")),
    toBeGreaterThan: match(mathsMatcher((x, y) => x > y, "to be greater than")),
    toBeGreaterThanOrEqual: match(mathsMatcher((x, y) => x >= y, "to be greater than or equal"))
  };

  if (!negate) {
    expectObj.not = makeExpectObj(actual, location, true);
  }

  return expectObj;
}
