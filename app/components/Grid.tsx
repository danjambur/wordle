import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Grid({ children }: Props) {
  return (
    <div className="absolute left-1/2 translate-x-[-50%] top-1/5 md:top-[160px]">
      {children}
    </div>
  );
}

export default Grid;
