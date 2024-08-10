import { test, expect } from "./just.js";
import { checkEquality } from "./structural-equality.js";
import * as col from "./text-colours.js";

test("printing", () => {
  const expected = [{type: "ul", indent: 4, marker: "-", content: [{type: "text", content: "the bullet point"}]}];
  const actual = [{type: "ul", indent: 4, marker: "-", text: [{type: "text", content: "the bullet point"}]}];

  const result = checkEquality(actual, expected, {});

  expect(result.passed).toBe(false);
  expect(result.expected).toBe("[{ type: \"ul\", indent: 4, marker: \"-\", " + col.red("content: [{ type: \"text\", content: \"the bullet point\" }]") + " }]");
  expect(result.actual).toBe(  "[{ type: \"ul\", indent: 4, marker: \"-\", " + col.green("text: [{ type: \"text\", content: \"the bullet point\" }]") + " }]");
});
