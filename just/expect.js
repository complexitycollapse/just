import { simpleMatcher } from "./matchers/simpleMatcher.js";
import { toBeMatcher } from "./matchers/toBe.js";
import { toEqualMatcher } from "./matchers/toEqual.js";
import { toHaveLengthMatcher } from "./matchers/toHaveLength.js";
import { toHavePropertyMatcher } from "./matchers/toHaveProperty.js";
import { toIncludeMatcher } from "./matchers/toInclude.js";
import { toThrowMatcher } from "./matchers/toThrow.js";

export function expect(actual) {
  const stack = new Error().stack;
  const location = getLocation(stack);

  return makeExpectObj(actual, location);
}

function getLocation(stack) {
  const result = stack.split("\n")[2];
  return result;
}

function makeExpectObj(actual, location, negate, unnegated) {
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
    toBeUndefined: () => match(toBeMatcher)(undefined),
    toBeDefined: () => expectObj.not.toBeUndefined(),
    toBeNaN: match(simpleMatcher(x => Number.isNaN(x), "to be NaN" , false)),
    toEqual: match(toEqualMatcher({})),
    toMatchObject: match(toEqualMatcher({ ignoreExtraProperties: true })),
    toInclude: match(toIncludeMatcher(false)),
    toIncludeEqual: match(toIncludeMatcher(true)),
    toThrow: match(toThrowMatcher)
  };

  if (!negate) {
    expectObj.not = makeExpectObj(actual, location, true, expectObj);
  } else {
    expectObj.toBeDefined = unnegated.toBeUndefined;
    expectObj.toBeNaN = match(simpleMatcher(x => !Number.isNaN(x), "to not be NaN" , false, true));
  }

  return expectObj;
}
