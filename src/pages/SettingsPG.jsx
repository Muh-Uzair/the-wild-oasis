import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import { Heading } from "../ui/Heading";

export default function SettingsPG() {
  return (
    <div>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </div>
  );
}
