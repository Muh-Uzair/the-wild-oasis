import { Heading } from "../ui/Heading";
import { Row } from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";

export default function BookingsPG() {
  return (
    <div>
      <>
        <Row type="horizontal">
          <Heading as="h1">All bookings</Heading>
          <p>TEST</p>
        </Row>

        <BookingTable />
      </>
    </div>
  );
}
