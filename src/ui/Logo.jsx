import { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "./DarkModeProvider";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <StyledLogo>
      <Img
        src={
          isDarkMode
            ? "../.././public/sidebar/logo-dark.png"
            : "../.././public/sidebar/logo-light.png"
        }
        alt="Logo"
      />
    </StyledLogo>
  );
}

export default Logo;
