import { ReactNode } from "react";
import { LetterStatus } from "~/types";
import classNames from "classnames";
interface Props {
  children: ReactNode;
  status: LetterStatus;
}

function Tile({ children, status }: Props) {
  const tileClass = classNames(
    {
      "bg-correct": status === "correct",
      "bg-miss": status === "miss",
      "bg-absent": status === "absent",
      "bg-transparent border-2 border-absent": status === "neutral",
    },
    "text-white md:text-3xl font-bold text-center p-2.5 w-16 h-16 rounded mb-2.5"
  );

  return <div className={tileClass}>{children}</div>;
}

export default Tile;
