import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = () => (
  <div>
    <button className="btn btn-primary">Button</button>
  </div>
);

export default LoginPage;
