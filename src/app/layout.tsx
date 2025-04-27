import "./globals.css";

import { PrivateLayout } from "@/components/layout/private-layout";
import { PublicLayout } from "@/components/layout/public-layout";

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isLoggedIn = false; //Session verification,...

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="min-h-full flex flex-col">
        {isLoggedIn ? <PrivateLayout>{children}</PrivateLayout> : <PublicLayout>{children}</PublicLayout>}
      </body>
    </html>
  );
};

export default RootLayout;
