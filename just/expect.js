import { simpleMatcher } from "./matchers/simpleMatcher.js";
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
    toBeLessThan: match(simpleMatcher((x, y) => x < y, "to be less than")),
    toBeLessThanOrEqual: match(simpleMatcher((x, y) => x <= y, "to be less than or equal")),
    toBeGreaterThan: match(simpleMatcher((x, y) => x > y, "to be greater than")),
    toBeGreaterThanOrEqual: match(simpleMatcher((x, y) => x >= y, "to be greater than or equal")),
    toBeTruthy: match(simpleMatcher(x => x, "to be truthy", false)),
    toBeFalsy: match(simpleMatcher(x => !x, "to be falsy", false)),
    toBeNull: () => match(toBeMatcher)(null),
    toBeUndefined: () => match(toBeMatcher)(undefined)
  };

  if (!negate) {
    expectObj.not = makeExpectObj(actual, location, true);
  }

  return expectObj;
}
