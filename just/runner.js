let fileContext;

export async function runFile(filePath) {
  fileContext = [];
  await import(filePath);
  fileContext.forEach(t => execute(t));
  fileContext = undefined;
}

export function registerTest(name, testCallback) {
  fileContext.push({name, testCallback});
}

function execute({name, testCallback}) {
  testCallback();
}
