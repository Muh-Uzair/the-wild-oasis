import styled from "styled-components";
import PropTypes from "prop-types";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

//-------------------------------
Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Modal({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const open = () => {
    setIsOpenModal(true);
  };
  const close = () => {
    setIsOpenModal(false);
  };
  return (
    <ModalContext.Provider value={{ isOpenModal, setIsOpenModal, open, close }}>
      <div>{children}</div>
    </ModalContext.Provider>
  );
}

//-----------------------------
Open.propTypes = {
  children: PropTypes.node.isRequired,
};
function Open({ children }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open() });
}

//--------------------------------
Window.propTypes = {
  children: PropTypes.node.isRequired,
};
function Window({ children }) {
  const { close, isOpenModal } = useContext(ModalContext);

  if (!isOpenModal) return null;

  return createPortal(
    <DivBGBlur>
      <StyledModal>
        <ButtonCloseModal onClick={() => close()}>
          <HiXMark />
        </ButtonCloseModal>
        {children}
      </StyledModal>
    </DivBGBlur>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

/////////////////////////////////////////////////////////////////////

const DivBGBlur = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  box-shadow: var(--shadow-lg);
  border-radius: 10px;
  position: relative;
  transition: all 0.5s;

  max-width: 80%;
`;

const ButtonCloseModal = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  right: 10px;
  top: 10px;
  transition: all 0.2s;
  border-radius: 2px;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:active {
    background-color: var(--color-grey-300);
  }
`;
