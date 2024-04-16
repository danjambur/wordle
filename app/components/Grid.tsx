import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function Grid({ children }: Props) {
  return (
    // grid container
    <div className="absolute left-1/2 translate-x-[-50%] top-1/5 md:top-[160px]">
      <div className="grid grid-cols-5 gap-x-[10px] justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default Grid;
