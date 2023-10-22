import { isHaiku } from "../utils";

import { describe, expect, test } from "vitest";

describe("isHaiku()", () => {
  test("given a valid haiku", () => {
    const inputText =
      "An old silent pond\nA frog jumps into the pond—\nSplash! Silence again.";
    expect(isHaiku(inputText).status).toBeTruthy();
  });

  test("given a haiku with multiline string", () => {
    const inputText = `agitated ghosts
    manufactured by the mind
    hallucinations`;
    expect(isHaiku(inputText).status).toBeTruthy();
  });

  test("given a haiku with the last line having excess syllables", () => {
    const inputText = `agitated ghosts
    manufactured by the mind
    hallucinations bread`;
    const res = isHaiku(inputText);
    expect(res.status).toBeFalsy();
    expect(res.message).toEqual(
      "Must have exactly 5 syllables on line 3. Current syllable count: 6.",
    );
  });

  test("given a haiku with the line 2 having excess syllables", () => {
    const inputText = `agitated ghosts
    manufactured by the mind flayer
    hallucinations`;
    const res = isHaiku(inputText);
    expect(res.status).toBeFalsy();
    expect(res.message).toEqual(
      "Must have exactly 7 syllables on line 2. Current syllable count: 9.",
    );
  });

  test("given a haiku with unusual stops and special characters", () => {
    const inputText = `moments -- do they die?
    if so, then why shouldn't we
    just become ourselves?`;
    expect(isHaiku(inputText).status).toBeTruthy();
  });

  test("given a haiku without line breaks", () => {
    const inputText =
      "An old silent pond A frog jumps into the pond— Splash! Silence again.";
    const res = isHaiku(inputText);
    expect(res.status).toBeFalsy(); 
  });

  test("given a haiku without line breaks but valid syllable count", () => {
    const inputText =
      "An old silent pond";
    const res = isHaiku(inputText);
    expect(res.status).toBeFalsy(); 
    expect(res.message).toEqual(
      "Line breaks must be exactly 3. Your line breaks: 1.",
    );
  });

  test("given a haiku that exceeds 3 line breaks", () => {
    const inputText =
      "An old silent pond\nA frog jumps into the pond—\nSplash! Silence again.\nBut then,";
    const res = isHaiku(inputText);
    expect(res.status).toBeFalsy();
    expect(res.message).toEqual(
      "Line breaks must be exactly 3. Your line breaks: 4.",
    );
  });
});
