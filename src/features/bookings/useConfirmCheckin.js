import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBookingStatus } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// FUNCTIONS
function useConfirmCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const x = useMutation({
    mutationFn: ({ bookingId, breakfastObj }) =>
      updateBookingStatus(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfastObj,
      }),

    onSuccess: (data) => {
      // console.log(data);
      toast.success(`Booking #${data.data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("Unable to update booking");
    },
  });

  const { mutate: mutateCheckin, isLoading: isCheckingIn } = x;

  return { mutateCheckin, isCheckingIn };
}

export default useConfirmCheckin;
