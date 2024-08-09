import * as runner from "./runner.js";

let file, describeBlock, test, directory;

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
      file = val;
      break;
    case "--describe":
      describeBlock = val;
      break;
    case "--test":
      test = val;
      break;
    case "--directory":
      directory = val;
      break;
    default:
      throw new Error("Argument not recognised: " + val);
  }
}

runAll();
