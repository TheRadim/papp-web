import type { Metadata } from "next";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pappmobility.com"),
  title: {
    default: "Papp Mobility",
    template: "%s"
  },
  description: "Mobility intelligence for cities, operators and partners."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
