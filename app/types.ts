export type GameStatus = "won" | "lost" | "playing";
export enum LetterStatus {
  Correct = "correct",
  Miss = "miss",
  Absent = "absent",
}
export type CharGuess = { char: string; status: LetterStatus };
