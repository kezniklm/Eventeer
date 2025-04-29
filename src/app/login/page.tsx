import { type Metadata } from "next";

import { LoginForm } from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = () => (
  <div>
    <LoginForm />
  </div>
);

export default LoginPage;
