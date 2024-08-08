import * as col from "./text-colours.js";
import { removeItem } from "./utils.js";

export function checkEquality(actual, expected, options) {
  if (Array.isArray(expected)) {
    return checkArray(actual, expected, options);
  } else if (typeof expected === "object" && expected !== null) {
    return checkObject(actual, expected, options);
  } else {
    return checkPrimitive(actual, expected, options);
  }
}

function checkArray(actual, expected, options) {
  if (!Array.isArray(actual)){
    return {
      passed: false,
      expected: col.yellow(formatArray(expected)),
      actual: col.yellow(format(actual))
    }
  }

  const end = Math.min(actual.length, expected.length);
  let result, i;
  
  for (i = 0; i < end; ++i) {
    result = combineResults(result, checkEquality(actual[i], expected[i], options), ", ");
  }

  if (actual.length > expected.length) {
    for (i; i < actual.length; ++i) {
      const fail = {
        passed: false,
        actual: col.green(format(actual[i]))
      }
      result = combineResults(result, fail, ", ");
    }
  }

  if (actual.length < expected.length) {
    for (i; i < expected.length; ++i) {
      const fail = {
        passed: false,
        expected: col.red(format(expected[i]))
      }
      result = combineResults(result, fail, ", ");
    }
  }

  if (result.passed === false) {
    result.expected = "[" + result.expected + "]";
    result.actual = "[" + result.actual + "]";
    return result;
  }

  return {
    passed: true,
    expected: formatArray(expected),
    actual: format(actual)
  };
}

function checkObject(actual, expected, options) {
  if (!(typeof actual === "object") || actual === null){
    return {
      passed: false,
      expected: col.yellow(formatObject(expected)),
      actual: col.yellow(format(actual))
    }
  }

  const actualKeys = Object.keys(actual);

  let result;

  for (const key of Object.keys(expected)) {
    if (Object.hasOwn(actual, key)) {
      removeItem(actualKeys, key);
      const res = checkEquality(actual[key], expected[key], options);
      if (res.expected) res.expected = key + ": " + res.expected;
      if (res.actual) res.actual = key + ": " + res.actual;
      result = combineResults(result, res, ", ");
    } else {
      const res = {
        passed: false,
        expected: col.red(key + ": " + expected[key])
      };
      result = combineResults(result, res, ", ");
    }
  }

  if (!options.ignoreExtraProperties) {
    for (const key of actualKeys) {
      const res = {
        passed: false,
        actual: col.green(key + ": " + actual[key])
      };
      result = combineResults(result, res, ", ");
    }
  }

  if (result.passed) {
    return {
      passed: true,
      expected: formatObject(expected),
      actual: format(actual)
    };
  } else {
    return {
      passed: false,
      expected: "{ " + result.expected + " }",
      actual: "{ " + result.actual + " }"
    }
  }
}

function checkPrimitive(actual, expected, options) {
  if (actual === expected) {
    return {
      passed: true,
      expected: formatPrimitive(expected),
      actual: formatPrimitive(actual)
    }
  } else {
    return {
      passed: false,
      expected: col.yellow(formatPrimitive(expected)),
      actual: col.yellow(format(actual))
    }
  }
}

function combineResults(first, second, separator) {
  function combineVals(val1, val2) {
    if (!val1) return val2;
    if (!val2) return val1;
    return val1 + separator + val2;
  }

  if (!first) return second;
  if (!second) return first;

  return {
    passed: first.passed && second.passed,
    expected: combineVals(first.expected, second.expected),
    actual: combineVals(first.actual, second.actual)
  };
}

function format(value) {
  if (Array.isArray(value)) {
    return formatArray(value);
  } else if (typeof value === "object" && value !== null) {
    return formatObject(value);
  } else {
    return formatPrimitive(value);
  }
}

function formatArray(value) {
  return "[" + value.map(format).join(", ") + "]";
}

function formatObject(value) {
  return "{ " + Object.entries(value).map(([key, val]) => key + ": " + format(val)).join(", ") + " }";
}

function formatPrimitive(prim) {
  if (prim === undefined) {
    return "undefined";
  }  else if (prim === null) {
    return "null";
  } else {
    return JSON.stringify(prim);
  }
}
