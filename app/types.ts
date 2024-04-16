export type GameStatus = "won" | "lost" | "playing";
export type LetterStatus = "correct" | "miss " | "absent";
export type CharGuess = { char: string; status: LetterStatus };
