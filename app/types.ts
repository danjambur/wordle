export enum LetterStatus {
  Correct = "correct",
  Miss = "miss",
  Absent = "absent",
  Neutral = "neutral",
}

export type Tile = {
  char: string;
  status: LetterStatus;
};

export type Tiles = Tile[][];

export type ModalState = {
  showModal: boolean;
  isSuccess: boolean;
};
