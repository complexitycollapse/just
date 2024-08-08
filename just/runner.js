import { ExpectationFailure } from "./expectation-failure.js";
import * as col from "./text-colours.js"

let fileTests;

export async function runFile(filePath, testToRun) {
  fileTests = [];
  await import(filePath);
  const results = [];

  for (const test of fileTests.filter(t => testToRun === undefined || testToRun === t.name)) {
    results.push(await execute(test));
  }

  const failed = results.filter(r => !r.passed);
  const failedCount = failed.length;
  const passedCount = results.length - failedCount;
  const ignoredCount = fileTests.length - failedCount - passedCount;
  const allPassed = failed.length === 0;

  let output = allPassed ? col.greenBack("PASS") : col.redBack("FAIL");
  output = output
  + col.green(` ${passedCount} passed,`)
  + col.red(` ${failedCount} failed,`)
  + col.yellow(` ${ignoredCount} ignored,`)
  + ` ${fileTests.length} total `
  + filePath;
  
  console.log(output);

  failed.forEach(f => {
    console.log("●  " + col.red(f.testName));
    log(" Expected:", f, "expected");
    log(" Actual:  ", f, "actual");
    log("", f, "extraInfo");
    if (Object.hasOwn(f, "location")) console.log(" " + f.location.trim());
    if (Object.hasOwn(f, "trace")) console.log(f.trace);
  });

  fileTests = undefined;
}

export function registerTest(name, testCallback) {
  fileTests.push({name, testCallback});
}

async function execute({name, testCallback}) {
  try {
    if (testCallback.constructor.name === "AsyncFunction") {
      await testCallback();
    } else {
      testCallback();
    }
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

function log(prefix, obj, prop) {
  if (Object.hasOwn(obj, prop)) {
    const value = obj[prop];
    if (typeof value === "string") {
      console.log(prefix + " " + value);
    } else {
      console.log.apply(console, [prefix].concat(value));
    }
  }
}
