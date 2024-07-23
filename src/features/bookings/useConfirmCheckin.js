import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useConfirmCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: mutateCheckin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingStatus(bookingId, { status: "checked-in", isPaid: true }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("Unable to update booking");
    },
  });

  return { mutateCheckin, isCheckingIn };
}

export default useConfirmCheckin;
