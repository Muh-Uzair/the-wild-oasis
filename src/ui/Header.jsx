import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";

const StyledHeader = styled.div`
  background-color: var(--color-grey-50);
  padding: 20px 20px;
  border-bottom: 1px solid var(--color-grey-300);

  display: flex;
  justify-content: end;
  align-items: center;
`;

export default function Header() {
  return (
    <StyledHeader>
      <ul>
        <HeaderMenu />
      </ul>
    </StyledHeader>
  );
}
