import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

// COMPONENT START///////////////////////////////////////////////
export default function LogOut() {
  // STATE & VARIABLES

  const { logout, isLogingOut } = useLogout();

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <ButtonIcon disabled={isLogingOut} onClick={() => logout()}>
      {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
