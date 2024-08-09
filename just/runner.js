import { ExpectationFailure } from "./expectation-failure.js";
import * as col from "./text-colours.js"
import * as fs from "fs";
import * as path from "path";

let fileTestsStack, describeStack, totalTests;

export async function run(test, describe, file, directory) {
  let passed = 0, failed = 0, ignored = 0, total = 0, passedSuites = 0, failedSuites = 0, ignoredSuites = 0;

  if (file) await runFile(file, test, describe);
  else {
    const files = scanDirectory(directory);
    const testFiles = files.filter(f => f.search(/.*\.test.js/) != -1);
    for (const f of testFiles) {
      const result = await runFile(f, test, describe);
      passed += result.passed;
      failed += result.failed;
      ignored += result.ignored;
      total += result.total;
      if (result.ignored === result.total) ignoredSuites += 1;
      else if (result.failed === 0) passedSuites += 1;
      else failedSuites += 1;
    };

    console.log("Suites:", 
      col.green(`${passedSuites} passed,`), 
      col.red(`${failedSuites} failed,`), 
      col.yellow(`${ignoredSuites} ignored,`), 
      `${passedSuites + failedSuites + ignoredSuites} total,`);

    console.log("Tests: ", 
      col.green(`${passed} passed,`), 
      col.red(`${failed} failed,`), 
      col.yellow(`${ignored} ignored,`), 
      `${total} total,`);
  }
}

async function runFile(filePath, testToRun, describeToRun) {
  fileTestsStack = [[]];
  describeStack = [];
  totalTests = 0;

  const fileUrl = convertPathToUrl(filePath);

  try {
    await import(fileUrl);
  } catch (error) {
    throw new Error("Error loading test file " + fileUrl, { cause: error });
  }

  const results = await runTests(testToRun, describeToRun, !!describeToRun);

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

  return {passed: passedCount, failed: failedCount, ignored: ignoredCount, total: totalTests};
}

async function runTest(test, testNameFilter, results) {

  const passesNameTest = !testNameFilter || testNameFilter === test.name;
  
  if (passesNameTest) {
    ++totalTests;
    results.push(await execute(test));
  }
}

async function runDescribe(describe, testNameFilter, describeNameFilter) {

  const passesNameTest = !describeNameFilter || describeNameFilter === describe.name;

  fileTestsStack.unshift([]);

  if (describe.testsCallback.constructor.name === "AsyncFunction") {
    await describe.testsCallback();
  } else {
    describe.testsCallback();
  }

  const describeResults = await runTests(testNameFilter, passesNameTest ? undefined : describeNameFilter);
  fileTestsStack.shift();
  return describeResults;
}

async function runTests(testToRun, describeToRun) {
  let results = [];

  for (const testOrDescribe of fileTestsStack[0]) {
    switch (testOrDescribe.type) {
      case "test":
        if (!describeToRun) {
          await runTest(testOrDescribe, testToRun, results);
        }
        break;
      case "describe":
        results = results.concat(await runDescribe(testOrDescribe, testToRun, describeToRun));
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

function scanDirectory(directory) {
  const files = [];

  function doDir(directory) {
    let dir;
    try {
      dir = fs.opendirSync(directory);
      for (let dirEnt = dir.readSync(); dirEnt; dirEnt = dir.readSync()) {
        if (dirEnt.isFile()) {
          files.push(path.join(directory, dirEnt.name));
        } else if (dirEnt.isDirectory() && dirEnt.name != ".git") {
          doDir(path.join(directory, dirEnt.name));
        }
      }
    } finally {
      dir?.closeSync();
    }
  }
  
  doDir(directory);
  return files;
}

export function convertPathToUrl(pathname) {
  
  if (path.isAbsolute(pathname) && /^[a-zA-Z]:/.test(pathname)) {
      // Convert the drive letter to uppercase
      pathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  }

  const url = "file:///" + path.resolve(pathname).replace(/\\/g, "/");

  return url;
}
