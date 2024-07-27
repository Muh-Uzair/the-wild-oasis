import styled from "styled-components";
import ButtonIcon from "../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import LogOut from "../features/authentication/LogOut";

const StyledHeaderMenu = styled.ul`
  display: flex;
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
