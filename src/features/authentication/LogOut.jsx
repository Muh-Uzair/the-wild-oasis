import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

// COMPONENT START///////////////////////////////////////////////
export default function LogOut() {
  // STATE & VARIABLES

  const { logout, logingOutStatus } = useLogout();

  // console.log(isLogingOut);

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <ButtonIcon
      disabled={logingOutStatus === "pending"}
      onClick={() => logout()}
    >
      {logingOutStatus === "pending" ? (
        <SpinnerMini />
      ) : (
        <HiArrowRightOnRectangle />
      )}
    </ButtonIcon>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
