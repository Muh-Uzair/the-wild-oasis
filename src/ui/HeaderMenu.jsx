import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../features/authentication/LogOut";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeaderMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 10px;
`;

// COMPONENT START///////////////////////////////////////////////
export default function HeaderMenu() {
  // STATE & VARIABLES
  const navigate = useNavigate();

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <StyledHeaderMenu>
      <li>
        <UserAvatar />
      </li>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>

      <li>
        <LogOut />
      </li>
    </StyledHeaderMenu>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
