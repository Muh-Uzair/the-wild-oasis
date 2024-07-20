import { Heading } from "../ui/Heading";
import { Row } from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import styled from "styled-components";
// import BookingTableOperations from "../features/bookings/BookingTableOperations";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default function BookingsPG() {
  return (
    <StyledContainer>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <BookingTable />
    </StyledContainer>
  );
}
