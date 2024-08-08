import { ExpectationFailure } from "./expectation-failure.js";
import * as col from "./text-colours.js"

let fileTests;

export async function runFile(filePath, testToRun) {
  fileTests = [];
  await import(filePath);
  const results = fileTests.filter(t => testToRun === undefined || testToRun === t.name).map(t => execute(t));
  fileTests = undefined;

  const failed = results.filter(r => !r.passed);
  const allPassed = failed.length === 0;

  let output = allPassed ? col.greenBack("PASS") : col.redBack("FAIL");
  output = output + " " + filePath;
  console.log(output);

  failed.forEach(f => {
    console.log("●  " + col.red(f.testName));
    log(" Expected:", f, "expected", col.turnGreen);
    log(" Actual:  ", f, "actual", col.turnRed);
    log("", f, "extraInfo");
    if (Object.hasOwn(f, "location")) console.log(" " + f.location.trim());
    if (Object.hasOwn(f, "trace")) console.log(f.trace);
  });
}

export function registerTest(name, testCallback) {
  fileTests.push({name, testCallback});
}

function execute({name, testCallback}) {
  try {
    testCallback();
  } catch (error) {
    if (error instanceof ExpectationFailure) {
      return Object.assign({
        passed: false,
        testName: name
      }, error);
    } else if (error instanceof Error) {
      return {
        passed: false,
        testName: name,
        trace: error.stack
      };
    } else {
      return {
        passed: false,
        testName: name,
        expected: "No exception thrown",
        actual: ["Non-Error exception:", error]
      };
    }
  }

  return {
    passed: true,
    testName: name
  };
}

function log(prefix, obj, prop, stringColour) {
  if (Object.hasOwn(obj, prop)) {
    const value = obj[prop];
    if (typeof value === "string") {
      console.log(prefix + " " + stringColour + value + col.restore);
    } else {
      console.log.apply(console, [prefix].concat(value));
    }
  }
}
