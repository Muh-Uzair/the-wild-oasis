import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export default function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSettings, status: editingStatus } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings successfully updated ");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editSettings, editingStatus };
}
