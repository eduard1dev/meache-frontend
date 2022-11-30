import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import { ModalTitle, ModalContainer } from '../styles/components/Modal';

type ModalState = {
  isOpen: boolean;
  content: ReactNode;
};

interface ModalContextProps {
  isOpen: boolean;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  content: ReactNode;
  setContent: any;
}

ModalContainer.setAppElement('#__next');

export const ModalContext = createContext<ModalContextProps>({
  content: null,
  closeModal: () => null,
  isOpen: false,
  openModal: (content) => null,
  setContent: () => null
});

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [{ isOpen, content }, setContent] = useState<ModalState>({
    isOpen: false,
    content: null
  });

  function closeModal() {
    setContent({ isOpen: false, content: null });
    return null;
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal: (content) => {
          setContent({ isOpen: true, content });
        },
        closeModal,
        content,
        setContent
      }}
    >
      <ModalContainer
        isOpen={isOpen}
        shouldCloseOnOverlayClick
        shouldCloseOnEsc
        onRequestClose={closeModal}
      >
        {/* {!!content.title && <ModalTitle>{content.title}</ModalTitle>} */}
        {content}
      </ModalContainer>
      {children}
    </ModalContext.Provider>
  );
};
