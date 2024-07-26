import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLogout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  let x = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Unable to logout");
    },
  });

  const { mutate: logout, status: logingOutStatus } = x;

  return { logout, logingOutStatus };
}

export { useLogout };
