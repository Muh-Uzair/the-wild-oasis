import PropTypes from "prop-types";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
};
// COMPONENT START///////////////////////////////////////////////
export default function Stats({ bookings, confirmedStays }) {
  // STATE & VARIABLES

  const totalSales = bookings?.reduce((acc, val) => {
    return acc + (val.totalPrice + val.extrasPrice);
  }, 0);

  let occupation = confirmedStays.reduce((acc, currVal) => {
    return acc + currVal.numNights;
  }, 0);

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title={"Bookings"}
        value={bookings?.length}
        color={"blue"}
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title={"Sales"}
        value={formatCurrency(totalSales)}
        color={"green"}
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title={"Check ins"}
        value={confirmedStays?.length}
        color={"indigo"}
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title={"Occupancy"}
        value={Math.round(occupation * 100) + "%"}
        color={"yellow"}
      />
    </>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
