import { test, expect, describe } from "../just/just.js";

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

test("PASS: toBeNaN", () => {
  expect(NaN).toBeNaN();
});

test("FAIL: toBeNaN", () => {
  expect(0).toBeNaN();
});

test("PASS: not.toBeNaN", () => {
  expect(0).not.toBeNaN();
});

test("FAIL: not.toBeNaN", () => {
  expect(NaN).not.toBeNaN();
});

test("PASS: toEqual - number", () => {
  expect(5).toEqual(5);
});

test("FAIL: toEqual - number", () => {
  expect(5).toEqual(6);
});

test("PASS: not.toEqual - number", () => {
  expect(5).not.toEqual(6);
});

test("FAIL: not.toEqual - number", () => {
  expect(5).not.toEqual(5);
});

test("PASS: toEqual - string", () => {
  expect("foo").toEqual("foo");
});

test("FAIL: toEqual - string", () => {
  expect("foo").toEqual("bar");
});

test("PASS: not.toEqual - string", () => {
  expect("foo").not.toEqual("bar");
});

test("FAIL: not.toEqual - string", () => {
  expect("foo").not.toEqual("foo");
});

test("PASS: toEqual - undefined", () => {
  expect(undefined).toEqual(undefined);
});

test("FAIL: toEqual - undefined", () => {
  expect("foo").toEqual(undefined);
});

test("PASS: not.toEqual - undefined", () => {
  expect("foo").not.toEqual(undefined);
});

test("FAIL: not.toEqual - undefined", () => {
  expect(undefined).not.toEqual(undefined);
});

test("PASS: toEqual - array", () => {
  expect([1, 2, 3]).toEqual([1, 2, 3]);
});

test("FAIL: toEqual - array type", () => {
  expect(5).toEqual([1, 2, 3]);
});

test("FAIL: toEqual - array too long", () => {
  expect([1, 2, 3, 4]).toEqual([1, 2, 3]);
});

test("FAIL: toEqual - array too short", () => {
  expect([1, 2]).toEqual([1, 2, 3]);
});

test("FAIL: toEqual - array wrong members", () => {
  expect([1, 5, 3]).toEqual([1, 2, 3]);
});

test("PASS: toEqual - object", () => {
  expect({x: 1, y: 2}).toEqual({x: 1, y: 2});
});

test("FAIL: toEqual - object type", () => {
  expect(5).toEqual({x: 1, y: 2});
});

test("FAIL: toEqual - object wrong value", () => {
  expect({x: 1, y: 5}).toEqual({x: 1, y: 2});
});

test("FAIL: toEqual - object property missing", () => {
  expect({x: 1}).toEqual({x: 1, y: 2});
});

test("FAIL: toEqual - object unexpected property", () => {
  expect({x: 1, y: 2, z: 3}).toEqual({x: 1, y: 2});
});

test("PASS: toEqual - combined test", () => {
  const obj = {x: 1, y: [1, 2, {a: 6, b: undefined}, "hello"], z: 3, w: null};
  expect(obj).toEqual(obj);
});

test("FAIL: toEqual - combined test", () => {
  const obj = {x: 1, y: [1, 2, {a: 6, b: undefined}, "hello", 7], w: null};
  expect(obj).toEqual({x: 5, y: [1, 3, {a: 6, b: null}, "goodbye"], z: 3, w: "undefined"});
});

test("PASS: toMatchObject - object", () => {
  expect({x: 1, y: { a: 10, b: 20 }, z: 3}).toMatchObject({x: 1, y: { b: 20 } });
});

test("PASS: async", async () => {
  expect(1).toBe(1);
});

test("FAIL: async", async () => {
  expect(1).toBe(5);
});

describe("testing describe", () => {
  test("PASS: describe", () => {
    expect(1).toBe(1);
  });
  
  test("FAIL: describe", () => {
    expect(1).toBe(5);
  });

  test("PASS: async in describe", async () => {
    expect(1).toBe(1);
  });
  
  test("FAIL: async in describe", async () => {
    expect(1).toBe(5);
  });
});

test("PASS: toInclude - array", () => {
  expect([1, 2, 3]).toInclude(2);
});

test("PASS: toInclude - string", () => {
  expect("123").toInclude("2");
});

test("FAIL: toInclude - array", () => {
  expect([1, 2, 3]).toInclude(5);
});

test("FAIL: toInclude - string", () => {
  expect("123").toInclude("5");
});

test("FAIL: toInclude - not iterable", () => {
  expect({x: 1}).toInclude(1);
});

test("PASS: not.toInclude - array", () => {
  expect([1, 2, 3]).not.toInclude(5);
});

test("PASS: not.toInclude - string", () => {
  expect("123").not.toInclude("5");
});

test("FAIL: not.toInclude - array", () => {
  expect([1, 2, 3]).not.toInclude(2);
});

test("FAIL: not.toInclude - string", () => {
  expect("123").not.toInclude("2");
});

test("FAIL: not.toInclude - not iterable", () => {
  expect({x: 1}).not.toInclude(1);
});

test("PASS: toIncludeEqual - array", () => {
  expect([1, [1, 2], 3]).toIncludeEqual([1, 2]);
});

test("PASS: toIncludeEqual - string", () => {
  expect("123").toIncludeEqual("2");
});

test("FAIL: toIncludeEqual - array", () => {
  expect([1, [1, 2], 3]).toIncludeEqual([1, 3]);
});

test("FAIL: toIncludeEqual - string", () => {
  expect("123").toIncludeEqual("5");
});

test("FAIL: toIncludeEqual - not iterable", () => {
  expect({x: 1}).toIncludeEqual(1);
});

test("PASS: not.toIncludeEqual - array", () => {
  expect([1, 2, 3]).not.toIncludeEqual(5);
});

test("PASS: not.toIncludeEqual - string", () => {
  expect("123").not.toIncludeEqual("5");
});

test("FAIL: not.toIncludeEqual - array", () => {
  expect([1, {x: 1}, 3]).not.toIncludeEqual({x: 1});
});

test("FAIL: not.toIncludeEqual - string", () => {
  expect("123").not.toIncludeEqual("2");
});

test("FAIL: not.toIncludeEqual - not iterable", () => {
  expect({x: 1}).not.toIncludeEqual(1);
});
