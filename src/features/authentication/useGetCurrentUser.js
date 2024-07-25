import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

function useGetCurrentUser() {
  const { data: userData, isLoading: isLoadingUserData } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    isLoadingUserData,
    isAuthenticated: userData?.role === "authenticated",
  };
}

export { useGetCurrentUser };
