import test from "node:test";
import assert from "node:assert/strict";
import {
  moveProject,
  orderProjects,
  readProjectOrder,
} from "../app/utils/projectOrder.ts";

test("moving right inserts the dragged project after the target", () => {
  assert.deepEqual(
    moveProject(["yemekci", "tekinbey", "boraa"], "yemekci", "tekinbey"),
    ["tekinbey", "yemekci", "boraa"],
  );
});
test("moving left and moving across rows preserve other projects", () => {
  const original = ["a", "b", "c", "d", "e", "f"];
  assert.deepEqual(moveProject(original, "f", "b"), [
    "a",
    "f",
    "b",
    "c",
    "d",
    "e",
  ]);
  assert.deepEqual(original, ["a", "b", "c", "d", "e", "f"]);
});
test("missing or unchanged drop targets do not change the order", () => {
  assert.deepEqual(moveProject(["a", "b"], "a", "deleted"), ["a", "b"]);
  assert.deepEqual(moveProject(["a", "b"], "a", "a"), ["a", "b"]);
});
test("refresh keeps saved order while deleted IDs disappear and new projects append", () => {
  const projects = [
    { id: "a", title: "updated content" },
    { id: "c" },
    { id: "b" },
    { slug: "new" },
  ];
  assert.deepEqual(
    orderProjects(projects, ["b", "deleted", "a"]).map((p) => p.id || p.slug),
    ["b", "a", "c", "new"],
  );
  assert.equal(orderProjects(projects, ["a"])[0], projects[0]);
});
test("bad local storage never prevents the project list rendering", () => {
  for (const value of [null, "{broken", "{}", "null", "3"])
    assert.deepEqual(readProjectOrder(value), []);
  assert.deepEqual(readProjectOrder('["a",null,"b","a",3,""]'), ["a", "b"]);
});
