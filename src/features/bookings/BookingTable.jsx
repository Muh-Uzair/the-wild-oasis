// import BookingRow from "./BookingRow";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";

import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useGetBookings } from "./getBookings";

function BookingTable() {
  const { allBookings, status } = useGetBookings();

  if (status === "pending") return <Spinner />;

  if (!allBookings?.length || !allBookings)
    return <Empty message="No bookings data" />;

  return <div>All Bookings</div>;

  // return (
  //   <Menus>
  //     <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
  //       <Table.Header>
  //         <div>Cabin</div>
  //         <div>Guest</div>
  //         <div>Dates</div>
  //         <div>Status</div>
  //         <div>Amount</div>
  //         <div></div>
  //       </Table.Header>

  //       {/* <Table.Body
  //         data={allBookings ? allBookings : []}
  //         render={(booking) => (
  //           <BookingRow key={booking.id} booking={booking} />
  //         )}
  //       /> */}
  //     </Table>
  //   </Menus>
  // );
}

export default BookingTable;
