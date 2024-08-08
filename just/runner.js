import { ExpectationFailure } from "./expectation-failure.js";
import * as col from "./text-colours.js"

let fileTests;

export async function runFile(filePath) {
  fileTests = [];
  await import(filePath);
  const results = fileTests.map(t => execute(t));
  fileTests = undefined;

  const failed = results.filter(r => !r.passed);
  const allPassed = failed.length === 0;

  let output = allPassed ? col.greenBack("PASS") : col.redBack("FAIL");
  output = output + " " + filePath;
  console.log(output);

  failed.forEach(f => {
    console.log("●  " + col.red(f.testName));
    if (Object.hasOwn(f, "expected")) console.log(" Expected: " + col.green(f.expected));
    if (Object.hasOwn(f, "actual")) console.log(" Actual:   " + col.red(f.actual));
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
      return {
        passed: false,
        testName: name,
        expected: error.expected,
        actual: error.actual,
        location: error.location
      };
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
        actual: "Non-Error exception: " + JSON.stringify(error)
      };
    }
  }

  return {
    passed: true,
    testName: name
  };
}
