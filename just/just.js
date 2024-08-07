import * as runner from "./runner.js";

export function test(name, testCallback) {
  runner.registerTest(name, testCallback);
}
