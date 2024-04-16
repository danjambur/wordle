import { ReactNode } from "react";
import { LetterStatus } from "~/types";
import classNames from "classnames";
interface Props {
  children: ReactNode;
  status: LetterStatus;
}

function Tile({ children, status }: Props) {
  return (
    <div className="bg-gray-800 rounded text-white md:text-8xl font-bold text-center p-2 min-w-12">
      {children}
    </div>
  );
}

export default Tile;
