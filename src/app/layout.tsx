import "./globals.css";

import { Web3Modal } from "@/context/Web3Modal";

export const metadata = {
  title: "Raffle game",
  description: "Web3Modal Example",
};

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
