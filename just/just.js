export { expect } from "./expect.js";
import * as runner from "./runner.js";

export function test(name, testCallback) {
  runner.registerTest(name, testCallback);
}

export function describe(name, testsCallback) {
  runner.registerDescribe(name, testsCallback);
}
