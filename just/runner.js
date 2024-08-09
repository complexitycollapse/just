import { ExpectationFailure } from "./expectation-failure.js";
import * as col from "./text-colours.js"

let fileTestsStack, describeStack, totalTests;

export async function runFile(filePath, testToRun) {
  fileTestsStack = [[]];
  describeStack = [];
  totalTests = 0;
  await import(filePath);
  const results = await runTests(testToRun);

  const failed = results.filter(r => !r.passed);
  const failedCount = failed.length;
  const passedCount = results.length - failedCount;
  const ignoredCount = totalTests - failedCount - passedCount;
  const allPassed = failed.length === 0;

  let output = allPassed ? col.greenBack("PASS") : col.redBack("FAIL");
  output = output
  + col.green(` ${passedCount} passed,`)
  + col.red(` ${failedCount} failed,`)
  + col.yellow(` ${ignoredCount} ignored,`)
  + ` ${totalTests} total `
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

  fileTestsStack = undefined;
  describeStack = undefined;
}

async function runTests(testToRun) {

  let results = [];

  for (const test of fileTestsStack[0].filter(t => testToRun === undefined || testToRun === t.name)) {
    if (test.type === "test") {
      ++totalTests;
      results.push(await execute(test));
    } else if (test.type === "describe") {
      describeStack.push(test.name);
      fileTestsStack.unshift([]);

      if (test.testsCallback.constructor.name === "AsyncFunction") {
        await test.testsCallback();
      } else {
        test.testsCallback();
      }

      const describeResults = await runTests(testToRun);
      results = results.concat(describeResults);
      describeStack.pop();
      fileTestsStack.shift();
    }
  }

  return results;
}

export function registerTest(name, testCallback) {
  const fullName = describeStack.concat([name]).join(" > ");
  fileTestsStack[0].push({type: "test", name, testCallback, fullName});
}

export function registerDescribe(name, testsCallback) {
  fileTestsStack[0].push({type: "describe", name, testsCallback});
}


async function execute({testCallback, fullName}) {
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
        testName: fullName
      }, error);
    } else if (error instanceof Error) {
      return {
        passed: false,
        testName: fullName,
        trace: error.stack
      };
    } else {
      return {
        passed: false,
        testName: fullName,
        expected: "No exception thrown",
        actual: ["Non-Error exception:", error]
      };
    }
  }

  return {
    passed: true,
    testName: fullName
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
