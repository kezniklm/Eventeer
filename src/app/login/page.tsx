import { type Metadata } from "next";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = () => (
  <div>
    <Button>Button</Button>
  </div>
);

export default LoginPage;
