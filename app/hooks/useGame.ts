import { useState, useEffect, useRef } from "react";
import { Tiles, ModalState, LetterStatus } from "~/types";
import { useWord } from "~/hooks/useWord";

export function useGame() {
  const answer = useWord();
  const [tiles, setTiles] = useState<Tiles>(createInitialTiles());
  const [currentRow, setCurrentRow] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [modalState, setModalState] = useState<ModalState>({
    showModal: false,
    isSuccess: false,
  });

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement && !modalState.showModal) {
      const handleBlur = () => {
        inputElement.focus();
      };
      inputElement.addEventListener("blur", handleBlur);
      return () => {
        inputElement.removeEventListener("blur", handleBlur);
      };
    }
  }, [modalState.showModal]);

  const countOccurrences = (str: string, char: string): number => {
    return str.split("").filter((c) => c === char).length;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^[a-zA-Z]*$/g.test(inputValue)) {
      setInputValue(inputValue);
      const guess = inputValue.toUpperCase().split("");
      setTiles((prevTiles) => updateTilesWithGuess(prevTiles, guess));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const guess = inputValue.toUpperCase().split("");
    if (guess.length !== 5) {
      return;
    }
    setTiles((prevTiles) => updateTilesWithGuess(prevTiles, guess, true));
    setCurrentRow(currentRow + 1);
    setInputValue("");
    if (guess.join("") === answer) {
      setModalState({ showModal: true, isSuccess: true });
    } else if (currentRow === tiles.length - 1) {
      setModalState({ showModal: true, isSuccess: false });
    }
  };

  function createInitialTiles(): Tiles {
    return new Array(5)
      .fill(0)
      .map(() => new Array(5).fill({ char: "", status: LetterStatus.Neutral }));
  }

  function updateTilesWithGuess(
    prevTiles: Tiles,
    guess: string[],
    updateStatus = false
  ): Tiles {
    const newTiles = [...prevTiles];
    for (let i = 0; i < 5; i++) {
      const char = guess[i] || "";
      newTiles[currentRow][i] = {
        char,
        status: updateStatus
          ? getTileStatus(char, i, guess)
          : newTiles[currentRow][i].status,
      };
    }
    return newTiles;
  }

  function getTileStatus(
    char: string,
    index: number,
    guess: string[]
  ): LetterStatus {
    if (char === answer[index]) {
      return LetterStatus.Correct;
    }
    if (
      answer.includes(char) &&
      countOccurrences(guess.slice(0, index + 1).join(""), char) <=
        countOccurrences(answer.slice(0, index + 1), char)
    ) {
      return LetterStatus.Miss;
    }
    return LetterStatus.Absent;
  }

  const resetGame = () => {
    setModalState({ showModal: false, isSuccess: false });
    setCurrentRow(0);
    setInputValue("");
    setTiles(createInitialTiles());
  };

  return {
    tiles,
    currentRow,
    inputValue,
    modalState,
    inputRef,
    setInputValue,
    setTiles,
    setCurrentRow,
    setModalState,
    handleInputChange,
    handleSubmit,
    resetGame,
  };
}
