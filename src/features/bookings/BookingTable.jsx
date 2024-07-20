import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useGetBookings } from "./getBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { allBookings, status, count } = useGetBookings();

  if (status === "pending") return <Spinner />;

  if (!allBookings?.length || !allBookings)
    return <Empty message="No bookings data" />;

  return (
    <Menus>
      <Table columns={"0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"}>
        <Table.TableHeader>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div>extra</div>
        </Table.TableHeader>

        <Table.TableBody
          data={allBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination totalResults={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
