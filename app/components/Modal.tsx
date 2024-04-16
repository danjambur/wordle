import { useRef } from "react";
import { Overlay, useModalOverlay } from "react-aria";

function Modal({ state, children, ...props }) {
  const ref = useRef<HTMLDivElement>(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

  return (
    <Overlay>
      <div className="backdrop-blur-[40px]" {...underlayProps}>
        <div
          {...modalProps}
          ref={ref}
          className="flex flex-col items-center p-5 gap-4 bg-[rgba(63,58,58,0.6)]"
        >
          {children}
        </div>
      </div>
    </Overlay>
  );
}

export default Modal;
