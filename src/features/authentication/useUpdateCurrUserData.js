import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrUserData } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateCurrUserData() {
  const queryClient = useQueryClient();
  const {
    mutate: mutateUserData,
    data: updatedUserData,
    status: updationStatus,
  } = useMutation({
    mutationFn: updateCurrUserData,
    onSuccess: ({ user: { user_metadata } }) => {
      toast.success(
        `User full name and avatar successfully updated to ${user_metadata?.fullName}`
      );
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { mutateUserData, updatedUserData, updationStatus };
}
