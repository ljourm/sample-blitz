/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useMutation } from "@blitzjs/rpc";
import { AuthenticationError, PromiseReturnType } from "blitz";
import type { Route } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import login from "../mutations/login";
import { Login } from "../validations";
import { Form, FORM_ERROR } from "src/app/components/Form";
import { LabeledTextField } from "src/app/components/LabeledTextField";

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login);
  const router = useRouter();
  const next = useSearchParams()?.get("next");
  return (
    <>
      <h1>Login</h1>

      <Form
        submitText="Login"
        schema={Login}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values);
            router.refresh();
            if (next) {
              router.push(next as Route);
            } else {
              router.push("/");
            }
          } catch (error: any) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" };
            } else {
              return {
                [FORM_ERROR]: "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              };
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href={"/forgot-password"}>Forgot your password?</Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href="/signup">Sign Up</Link>
      </div>
    </>
  );
};
