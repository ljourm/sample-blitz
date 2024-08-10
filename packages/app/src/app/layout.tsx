import "./styles/globals.css";
import { BlitzProvider } from "./blitz-client";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: { title: "New Blitz App", template: "%s – Blitz" },
  description: "Generated by blitz new ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BlitzProvider>
          <Providers>{children}</Providers>
        </BlitzProvider>
      </body>
    </html>
  );
}
