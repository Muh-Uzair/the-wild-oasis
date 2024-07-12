import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";
import { getSettings } from "../../services/apiSettings";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const {
    data: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    status: settingsStatus,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  const { editSettings, editingStatus } = useUpdateSettings();

  function handleInputChange(e, changedField) {
    if (!e.target.value) return;
    editSettings({ [changedField]: e.target.value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={settingsStatus === "pending" || editingStatus === "pending"}
          onBlur={(e) => handleInputChange(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={settingsStatus === "pending" || editingStatus === "pending"}
          onBlur={(e) => handleInputChange(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={settingsStatus === "pending" || editingStatus === "pending"}
          onBlur={(e) => handleInputChange(e, "maxGuestsPerBooking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={settingsStatus === "pending" || editingStatus === "pending"}
          onBlur={(e) => handleInputChange(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
