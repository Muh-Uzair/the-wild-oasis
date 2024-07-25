import { useState } from "react";
import { Button } from "../../ui/Button";
import Form from "../../ui/Form";
import { Input } from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

// COMPONENT START///////////////////////////////////////////////
function LoginForm() {
  // STATE & VARIABLES
  const { login, status } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FUNCTIONS
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    // apiLogin({ email, password });
    login({ email, password });
  }

  // JSX//////////////////////////////////////////
  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={status === "pending"}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">
          {status === "pending" ? <SpinnerMini /> : "Log in"}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
