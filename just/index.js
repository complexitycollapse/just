export { test, describe, expect } from "./just.js";
import * as runner from "./runner.js";

let file, describeBlock, test, directory;

function stripQuotes(arg) {
  return arg.replace(/^"|"$/g, '');
}

async function runAll() {
  
  if (!file && !directory) {
    directory = process.cwd();
  }

  await runner.run(test, describeBlock, file, directory);

}

for (let i = 2; i < process.argv.length; i += 2) {

  const val = process.argv[i + 1];

  switch (process.argv[i]) {
    case "--file":
      file = stripQuotes(val);
      break;
    case "--describe":
      describeBlock = stripQuotes(val);
      break;
    case "--test":
      test = stripQuotes(val);
      break;
    case "--directory":
      directory = stripQuotes(val);
      break;
    default:
      throw new Error("Argument not recognised: " + val);
  }
}

runAll();
