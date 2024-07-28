import { useState } from "react";

import { Button } from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateCurrUserData } from "./useUpdateCurrUserData";

// COMPONENT START///////////////////////////////////////////////
function UpdateUserDataForm() {
  // STATE & VARIABLES
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    userData: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();
  const [fullName, setFullName] = useState(currentFullName ?? "");
  const [avatar, setAvatar] = useState(null);
  const { mutateUserData, updationStatus } = useUpdateCurrUserData();

  // FUNCTIONS
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    mutateUserData({ fullName, avatar });
  }

  // JSX//////////////////////////////////////////
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={updationStatus === "pending"}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={updationStatus === "pending"}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={updationStatus === "pending"}
          type="reset"
          variation="secondary"
        >
          Cancel
        </Button>

        <Button disabled={updationStatus === "pending"}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
