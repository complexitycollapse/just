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

test("PASS: toHaveProperty", () => {
  expect({x: 1}).toHaveProperty("x");
});

test("PASS: toHaveProperty - value specified", () => {
  expect({x: 1}).toHaveProperty("x", 1);
});

test("FAIL: toHaveProperty", () => {
  expect({y: 1}).toHaveProperty("x");
});

test("FAIL: toHaveProperty - value specified", () => {
  expect({x: 1}).toHaveProperty("x", 2);
});

test("PASS: not.toHaveProperty", () => {
  expect({y: 1}).not.toHaveProperty("x");
});

test("FAIL: not.toHaveProperty - value specified", () => {
  expect({x: 1}).not.toHaveProperty("x", 1);
});

test("FAIL: not.toHaveProperty", () => {
  expect({x: 1}).not.toHaveProperty("x");
});

test("FAIL: not.toHaveProperty - value specified", () => {
  expect({x: 1}).not.toHaveProperty("x", 1);
});

test("PASS: toBeLessThan", () => {
  expect(5).toBeLessThan(6);
});

test("FAIL: toBeLessThan", () => {
  expect(5).toBeLessThan(5);
});

test("PASS: toBeTruthy", () => {
  expect(5).toBeTruthy();
});

test("FAIL: toBeTruthy", () => {
  expect(0).toBeTruthy();
});

test("PASS: toBeFalsy", () => {
  expect(0).toBeFalsy();
});

test("FAIL: toBeFalsy", () => {
  expect(5).toBeFalsy();
});

test("PASS: toBeNull", () => {
  expect(null).toBeNull();
});

test("FAIL: toBeNull", () => {
  expect(0).toBeNull();
});

test("PASS: not.toBeNull", () => {
  expect(0).not.toBeNull();
});

test("FAIL: not.toBeNull", () => {
  expect(null).not.toBeNull();
});

test("PASS: toBeUndefined", () => {
  expect(undefined).toBeUndefined();
});

test("FAIL: toBeUndefined", () => {
  expect(null).toBeUndefined();
});

test("PASS: not.toBeUndefined", () => {
  expect(null).not.toBeUndefined();
});

test("FAIL: not.toBeUndefined", () => {
  expect(undefined).not.toBeUndefined();
});

test("PASS: toBeDefined", () => {
  expect(null).toBeDefined();
});

test("FAIL: toBeDefined", () => {
  expect(undefined).toBeDefined();
});

test("PASS: not.toBeDefined", () => {
  expect(undefined).not.toBeDefined();
});

test("FAIL: not.toBeDefined", () => {
  expect(null).not.toBeDefined();
});
