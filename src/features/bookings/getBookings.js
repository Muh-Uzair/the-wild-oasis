import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // filter logic
  const filterValue = searchParams.get("status")
    ? searchParams.get("status")
    : "all";
  const filterByObj =
    filterValue === "all"
      ? null
      : { method: "eq", field: "status", filterValue };

  // sorting logic
  const sortByValue = searchParams.get("sortBy")
    ? searchParams.get("sortBy")
    : "startDate-desc";
  const [field, direction] = sortByValue.split("-");
  const sortByObj =
    sortByValue === "startDate-desc" ? null : { field, direction };

  // paginatinon logic
  const currentPage = Number(searchParams.get("currPage"))
    ? Number(searchParams.get("currPage"))
    : 1;

  const { data: { data: allBookings, count } = {}, status } = useQuery({
    queryKey: ["bookings", filterByObj, sortByObj, currentPage],
    queryFn: () => getAllBookings(filterByObj, sortByObj, currentPage),
  });

  return { allBookings, status, count };
}
