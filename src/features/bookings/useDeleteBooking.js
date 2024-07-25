import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => {
      apiDeleteBooking(bookingId);
    },
    onSuccess: () => {
      toast.success(`Successfully deleted booking`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => {
      toast.error("Unable to delete booking");
    },
  });
  return { deleteBooking, isDeletingBooking };
}

export default useDeleteBooking;
