import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="min-h-full flex flex-col">
        <nav className="bg-amber-500">
          <div className="max-w-4/5 mx-auto px-2 sm:px-4 py-2 md:py-6">
            <div className="relative flex h-16 items-center justify-between">
              <p>Eventeer</p>
              <div className="flex gap-x-4">
                <button className="btn btn-primary">Button</button>
                <button className="btn btn-primary">Button</button>
              </div>
            </div>
          </div>
        </nav>
        <main className="container max-w-4/5 mx-auto px-2 py-10">{children}</main>
      </body>
    </html>
  );
}
