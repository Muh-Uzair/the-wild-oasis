import styled from "styled-components";
import LogOut from "../features/authentication/LogOut";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 20px 20px;
  border-bottom: 1px solid var(--color-grey-300);
`;

export default function Header() {
  return (
    <StyledHeader>
      <LogOut />
    </StyledHeader>
  );
}
