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
  const [openName, setIsOpenName] = useState("");

  const open = setIsOpenName;
  const close = () => {
    setIsOpenName("");
  };
  return (
    <ModalContext.Provider value={{ openName, setIsOpenName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

//-----------------------------
Open.propTypes = {
  opens: PropTypes.string,
  children: PropTypes.node,
};
function Open({ children, opens: windowToOpen }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowToOpen) });
}

//--------------------------------
Window.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node,
};
function Window({ children, name }) {
  const { close, openName, setIsOpenName } = useContext(ModalContext);

  if (name !== openName) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return createPortal(
    <DivBGBlur onClick={() => setIsOpenName("")}>
      <StyledModal onClick={handleModalClick}>
        <ButtonCloseModal onClick={() => close()}>
          <HiXMark />
        </ButtonCloseModal>
        <div>{cloneElement(children, { onClose: close })}</div>
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
