export type GameStatus = "won" | "lost" | "playing";
export enum LetterStatus {
  Correct = "correct",
  Miss = "miss",
  Absent = "absent",
  Neutral = "neutral",
}
export type CharGuess = { char: string; status: LetterStatus };
