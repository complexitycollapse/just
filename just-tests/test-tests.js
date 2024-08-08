import { test, expect } from "../just/just.js";

test("PASS: Passing test", () => {
});

test("FAIL: test throws Error", () => {
  throw new Error("this is the message");
});

test("FAIL: test throws non-Error expection", () => {
  throw {msg: "the exception message", data: 123};
});

test("PASS: toBe", () => {
  expect(0).toBe(0);
});

test("FAIL: toBe", () => {
  expect(0).toBe(1);
});

test("PASS: not.toBe", () => {
  expect(0).not.toBe(1);
});

test("FAIL: not.toBe", () => {
  expect(0).not.toBe(0);
});

test("PASS: toHaveLength", () => {
  expect([1, 2, 3]).toHaveLength(3);
});

test("FAIL: toHaveLength - wrong length", () => {
  expect([1, 2, 3]).toHaveLength(5);
});

test("FAIL: toHaveLength - not an array", () => {
  expect({x: 1, y: 2, z: 3}).toHaveLength(3);
});

test("PASS: not.toHaveLength", () => {
  expect([1, 2, 3]).not.toHaveLength(4);
});

test("FAIL: not.toHaveLength - wrong length", () => {
  expect([1, 2, 3]).not.toHaveLength(3);
});

test("FAIL: not.toHaveLength - not an array", () => {
  expect({x: 1, y: 2, z: 3}).not.toHaveLength(3);
});
