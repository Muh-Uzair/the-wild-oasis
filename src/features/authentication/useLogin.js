import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, status } = useMutation({
    mutationFn: ({ email, password }) => apiLogin({ email, password }),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (errorObj) => {
      console.error(errorObj);
      toast.error("Incorrect email or password");
    },
  });

  return { login, status };
}
