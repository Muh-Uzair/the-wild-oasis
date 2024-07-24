import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as apiDeleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useDeleteBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => {
      apiDeleteBooking(bookingId);
    },
    onSuccess: () => {
      toast.success(`Successfully deleted booking`);
      navigate("/bookings");
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error("Unable to delete booking");
    },
  });
  return { deleteBooking, isDeletingBooking };
}

export default useDeleteBooking;
