import { useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDiv = styled.div`
  position: relative;

  transition: all ease 0.2s;
`;

const DropDownButton = styled.button`
  width: 28px;
  height: 28px;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f4f9ff;
  }

  &:active {
    background-color: #e4f1ff;
  }

  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const StyledMenu = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;

  z-index: 1000;

  width: 100px;
  height: 100px;
  background-color: red;
  transition: all ease 0.2s;
`;

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

DropDownMenu.propTypes = {
  bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default function DropDownMenu({ bookingId }) {
  const [isOpenId, setIsOpenId] = useState("");

  function handleClickDropDown() {
    if (isOpenId === "" || isOpenId !== bookingId) {
      setIsOpenId(bookingId);
    } else {
      setIsOpenId("");
    }
  }

  return (
    <StyledDiv>
      <DropDownButton onClick={() => handleClickDropDown()}>
        <HiEllipsisVertical size={20} />
      </DropDownButton>

      {isOpenId !== "" && <StyledMenu>Menu</StyledMenu>}
    </StyledDiv>
  );
}
