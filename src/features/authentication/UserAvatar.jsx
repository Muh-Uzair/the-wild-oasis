import styled from "styled-components";
import { useUser } from "./useUser";

const DivNamePlusImg = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const DivImg = styled.div`
  width: 40px;
  height: 40px;
  background-color: red;
  border-radius: 30px;
`;

// COMPONENT START///////////////////////////////////////////////
export default function UserAvatar() {
  // STATE & VARIABLES
  const { userData } = useUser();
  const { user_metadata } = userData;

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <DivNamePlusImg>
      <DivImg>
        <img src="src/data/img/default-user.jpg" alt="img" />
      </DivImg>
      <span>{user_metadata?.fullName}</span>
    </DivNamePlusImg>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
