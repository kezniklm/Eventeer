import { type Metadata } from "next";

import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = async (props: Promise<{ searchParams: { callbackUrl: string | undefined } }>) => {
  const callbackUrl = (await props).searchParams.callbackUrl;

  return (
    <div>
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
};

export default LoginPage;
