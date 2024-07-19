import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useGetBookings() {
  const { data: allBookings, status } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
  });

  return { allBookings, status };
}
