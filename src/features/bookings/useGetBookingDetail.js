import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export default function useGetBookingDetail() {
  // STATE & VARIABLES
  const { id: bookingId } = useParams();

  const {
    data: bookingData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  // FUNCTIONS

  return { bookingData, isLoading, isError };
}
