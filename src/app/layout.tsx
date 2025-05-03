import "./globals.css";

import { type Metadata } from "next";

import { auth } from "@/auth";
import { PrivateLayout } from "@/components/layout/private-layout";
import { PublicLayout } from "@/components/layout/public-layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://eventeer-woad.vercel.app/"),
  title: {
    default: "Eventeer",
    template: "%s | Eventeer"
  },
  description: "Plan events, manage tasks, and track expenses with Eventeer — collaboration made easy.",
  openGraph: {
    title: "Eventeer",
    description: "Plan events, manage tasks, and track expenses with Eventeer — collaboration made easy.",
    url: "/",
    siteName: "Eventeer",
    images: [
      {
        url: "/preview.png",
        width: 768,
        height: 768,
        alt: "Eventeer - Shared Rooms and Expenses"
      }
    ],
    type: "website"
  }
};

const RootLayout = async ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const isLoggedIn = session?.user ? true : false; //Session verification,...

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="flex min-h-full flex-col">
        {isLoggedIn ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>}
      </body>
    </html>
  );
};

export default RootLayout;
