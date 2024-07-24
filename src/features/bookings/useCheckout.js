import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../../services/apiBookings";
import toast from "react-hot-toast";

// FUNCTIONS
function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: mutateCheckout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingStatus(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => {
      toast.error("Unable to perform checkout");
    },
  });

  return { mutateCheckout, isCheckingOut };
}

export default useCheckout;
