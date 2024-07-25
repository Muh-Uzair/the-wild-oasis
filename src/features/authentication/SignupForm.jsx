import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

// COMPONENT START///////////////////////////////////////////////
function SignupForm() {
  // STATE & VARIABLES
  const { register, handleSubmit } = useForm();

  //FUNCTIONS
  function handleSignUpSubmit(data) {
    console.log(data);
  }

  // JSX//////////////////////////////////////////
  return (
    <Form onSubmit={handleSubmit(handleSignUpSubmit)}>
      <FormRow label="Full name" error={""}>
        <Input type="text" id="fullName" {...register("fullName")} />
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Input type="email" id="email" {...register("email")} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Input type="password" id="password" {...register("password")} />
      </FormRow>

      <FormRow label="Repeat password" error={""}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
