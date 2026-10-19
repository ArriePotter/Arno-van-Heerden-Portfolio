import type { Metadata } from "next";
import { Geist, Geist_Mono, Mrs_Saint_Delafield, STIX_Two_Text } from "next/font/google";
import "./globals.css";

const stix = STIX_Two_Text({
  variable: "--font-stix",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Placeholder until Arno's own signature is scanned (decision 0011).
const signature = Mrs_Saint_Delafield({
  variable: "--font-signature",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Arno van Heerden · Product Designer who proves the why",
  description: "I research, design and ship products end to end, with AI-assisted code.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${stix.variable} ${geist.variable} ${geistMono.variable} ${signature.variable} antialiased`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
