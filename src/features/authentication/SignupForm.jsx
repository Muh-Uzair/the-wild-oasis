import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import { Input } from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

// COMPONENT START///////////////////////////////////////////////
function SignupForm() {
  // STATE & VARIABLES
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  //FUNCTIONS
  function handleSignUpSubmit(data) {
    console.log(data);
  }

  // JSX//////////////////////////////////////////
  return (
    <Form onSubmit={handleSubmit(handleSignUpSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid form of email",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 characters",
            },
            validate: (value) => {
              return (
                value === getValues().password ||
                "Re-enter the correct password"
              );
            },
          })}
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
