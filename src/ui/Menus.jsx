// import styled from "styled-components";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

/////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const MenusContext = createContext();

//-----------------------------------
Menus.propTypes = {
  children: PropTypes.node.isRequired,
};
export default function Menus({ children }) {
  const [isOpenId, setIsOpenId] = useState("");
  const [menuPosition, setMenuPosition] = useState({});

  const open = (id) => {
    setIsOpenId(id);
  };
  const close = () => {
    setIsOpenId("");
  };

  useEffect(() => {
    function detectClick() {
      if (isOpenId !== "") {
        close();
      }
      return;
    }

    document.addEventListener("click", detectClick);
  });

  return (
    <MenusContext.Provider
      value={{
        isOpenId,
        setIsOpenId,
        open,
        close,
        menuPosition,
        setMenuPosition,
      }}
    >
      {children}
    </MenusContext.Provider>
  );
}

//-----------------------------------
Toggle.propTypes = {
  id: PropTypes.number.isRequired,
};
function Toggle({ id }) {
  const { isOpenId, close, open, setMenuPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setMenuPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    isOpenId === "" || isOpenId !== id ? open(id) : close();
  }

  return (
    <StyledToggle onClick={(e) => handleClick(e)}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

//-----------------------------------
List.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
function List({ id, children }) {
  const { isOpenId, menuPosition } = useContext(MenusContext);

  if (isOpenId !== id) return null;

  return createPortal(
    <StyledList position={menuPosition}>{children}</StyledList>,
    document.body
  );
}

//-----------------------------------
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.node.isRequired,
};
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <StyledButton onClick={() => handleClick()}>
      <li>
        {icon}
        <span> {children}</span>
      </li>
    </StyledButton>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;