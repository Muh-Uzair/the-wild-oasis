import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useContext } from "react";
import { DarkModeContext } from "../ui/DarkModeProvider";

// COMPONENT START///////////////////////////////////////////////
export default function DarkModeToggle() {
  // STATE & VARIABLES
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <ButtonIcon onClick={() => toggleDarkMode()}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
