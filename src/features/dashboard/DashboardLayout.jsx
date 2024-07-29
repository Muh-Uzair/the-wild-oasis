import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

// COMPONENT START///////////////////////////////////////////////
export default function DashboardLayout() {
  // STATE & VARIABLES
  const { bookings, isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays, isLoading: isLoading2 } = useRecentStays();

  // FUNCTIONS

  // JSX//////////////////////////////////////////
  if (isLoading1 || isLoading2) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} />
    </StyledDashboardLayout>
  );
  // JSX//////////////////////////////////////////
}
// COMPONENT END/////////////////////////////////////////////////
