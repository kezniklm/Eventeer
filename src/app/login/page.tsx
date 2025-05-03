import { type Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import PreviewImage from "@/../public/preview.png";
import { auth, providerMap } from "@/auth";
import { LoginForm } from "@/components/forms/login-form";
import { PageHeading } from "@/components/ui/page-heading";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to Eventeer and start organizing your events, tasks, and expenses with ease."
};

const LoginPage = async (props: { searchParams: Promise<{ callbackUrl?: string; error?: string }> }) => {
  const session = await auth();
  const { callbackUrl, error } = await props.searchParams;

  if (session?.user) {
    return redirect("/profile");
  }
  return (
    <div className="container m-auto flex h-[80vh] w-full flex-col items-center text-center">
      <PageHeading>Sign In to Your Account</PageHeading>

      <div className="flex h-[100vw] w-[50vw] flex-col items-center justify-center text-center md:h-[40vw] md:w-[80vw] md:flex-row-reverse lg:h-[25vw] lg:w-[50vw]">
        <div className="relative h-full w-full md:w-1/2">
          <Image
            src={PreviewImage}
            alt="Eventeer logo"
            fill
            className="object-fit rounded-t-2xl md:rounded-tl-none md:rounded-br-2xl"
          />
        </div>
        <LoginForm
          callbackUrl={callbackUrl}
          providerMap={providerMap}
          errorType={error}
          className="bg-tertiary h-full w-full rounded-b-2xl md:w-1/2 md:rounded-tl-2xl md:rounded-br-none"
        />
      </div>
    </div>
  );
};

export default LoginPage;
