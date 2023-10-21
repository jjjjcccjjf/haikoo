import { syllable } from "syllable";

export function isHaiku(text: string) {
  // Remove leading and trailing whitespace
  text = text.trim();

  // Split the text into lines
  const lines = text.split("\n");

  // Check if there are exactly 3 lines (5-7-5 syllable structure)
  if (lines.length !== 3) {
    console.log(`line breaks must be exactly 3. your line breaks: ${lines.length} `);
    
    return false;
  }

  // Define the syllable count for each line
  const syllableCounts = [5, 7, 5];

  // Check each line for the correct syllable count
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const syllables = syllable(line);
    console.log(syllables);
    
    if (syllables !== syllableCounts[i]) {
      return false;
    }
  }

  return true;
}
