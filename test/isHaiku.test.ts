import { isHaiku } from "../utils";

import { describe, expect, test } from "vitest";

describe("isHaiku()", () => {
  test("given a valid haiku", () => {
    const inputText =
      "An old silent pond\nA frog jumps into the pond—\nSplash! Silence again.";
    expect(isHaiku(inputText)).toBeTruthy();
  });

  test("given a haiku with multiline string", () => {
    const inputText = `agitated ghosts
    manufactured by the mind
    hallucinations`;
    expect(isHaiku(inputText)).toBeTruthy();
  });

  test("given a haiku with unusual stops and special characters", () => {
    const inputText = `moments -- do they die?
    if so, then why shouldn't we
    just become ourselves?`;
    expect(isHaiku(inputText)).toBeTruthy();
  });

  test("given a haiku without line breaks", () => {
    const inputText =
      "An old silent pond A frog jumps into the pond— Splash! Silence again.";
    expect(isHaiku(inputText)).toBeFalsy();
  });

  test("given a haiku that exceeds 3 line breaks", () => {
    const inputText =
      "An old silent pond\nA frog jumps into\nthe pond—\nSplash! Silence again.";
    expect(isHaiku(inputText)).toBeFalsy();
  });
});
