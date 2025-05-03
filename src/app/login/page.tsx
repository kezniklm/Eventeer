import { type Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/components/forms/LoginForm";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = async (props: Promise<{ searchParams: { callbackUrl: string | undefined } }>) => {
  const callbackUrl = (await props).searchParams.callbackUrl;

  return (
    <div className="m-auto container flex flex-col text-center items-center w-full h-[80vh]">
      <PageHeading>Sign in</PageHeading>

      <div className="flex flex-col md:flex-row-reverse text-center items-center justify-center md:w-[80vw] md:h-[40vw] w-[50vw] h-[100vw] lg:w-[50vw] lg:h-[25vw]">
        <div className="relative w-full md:w-1/2 h-full">
          <Image
            src="/preview.png"
            alt="Eventeer logo"
            fill
            className="rounded-t-2xl md:rounded-tl-none md:rounded-br-2xl object-fit"
          />
        </div>
        <LoginForm
          callbackUrl={callbackUrl}
          className="md:w-1/2 w-full h-full bg-tertiary rounded-b-2xl md:rounded-tl-2xl md:rounded-br-none"
        />
      </div>
    </div>
  );
};

export default LoginPage;
