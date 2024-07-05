import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledAside = styled.aside`
  background-color: var(--color-grey-0);
  padding: 10px;
  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function Sidebar() {
  return (
    <StyledAside>
      <Logo />
      <MainNav />
    </StyledAside>
  );
}
