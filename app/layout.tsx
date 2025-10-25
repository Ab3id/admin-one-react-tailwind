import { Metadata } from "next";
import "../css/main.css";
import StoreProvider from "./_stores/StoreProvider";
import { getPageTitle } from "./_lib/config";
import PageGuard from "./_lib/pageGuard";


export const metadata: Metadata = {
  title: getPageTitle("Dashboard"),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <PageGuard>
      <html lang="en" className="style-basic">
        <body className="bg-black text-white antialiased">
          {children}
        </body>
      </html>
      </PageGuard>
    </StoreProvider>
  );
}
