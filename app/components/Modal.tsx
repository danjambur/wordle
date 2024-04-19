import {
  Modal as AriaModal,
  ModalOverlayProps as AriaModalOverlayProps,
  Dialog,
} from "react-aria-components";

interface ModalOverlayProps extends AriaModalOverlayProps {
  children: React.ReactNode;
}

function Modal({ children, ...props }: ModalOverlayProps) {
  return (
    <AriaModal className="bg-[#050606] text-[#FCFCFC]" {...props}>
      <Dialog className="flex flex-col items-center p-5 gap-4 bg-[#3F3A3A] bg-opacity-60 backdrop-blur-md rounded-lg max-w-[360px]">
        {children}
      </Dialog>
    </AriaModal>
  );
}

export default Modal;
