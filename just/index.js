import * as runner from "./runner.js";

async function load() {
  await runner.runFile("../just-tests/test-tests.mjs");
}

load();
