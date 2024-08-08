import { test, expect } from "../just/just.js";

test("PASS: Passing test", () => {
});

test("FAIL: test throws Error", () => {
  throw new Error("this is the message");
});

test("FAIL: test throws non-Error expection", () => {
  throw {msg: "this is the message"};
});

test("PASS: toBe", () => {
  expect(0).toBe(0);
});

test("FAIL: toBe", () => {
  expect(0).toBe(1);
});
