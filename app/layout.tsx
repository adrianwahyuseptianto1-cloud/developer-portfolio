import type { Metadata } from "next";
import Cursor from "./Cursor";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://adrianwahyuseptianto.vercel.app";
const title = "Adrian Wahyu Septianto - Full Stack Developer";
const description =
  "Portfolio of Adrian Wahyu Septianto, a Full Stack Developer from Surabaya, Indonesia who builds custom systems, admin dashboards, automation tools, and full-stack applications by request.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Adrian Wahyu Portfolio",
  authors: [{ name: "Adrian Wahyu Septianto" }],
  creator: "Adrian Wahyu Septianto",
  keywords: [
    "Adrian Wahyu Septianto",
    "Full Stack Developer Surabaya",
    "Developer Indonesia",
    "custom software developer",
    "Node.js developer",
    "React developer",
    "Laravel developer",
    "automation developer",
    "portfolio developer"
  ],
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Adrian Wahyu Septianto",
    images: [
      {
        url: "/og-preview.png",
        width: 1440,
        height: 1100,
        alt: "Portfolio preview for Adrian Wahyu Septianto"
      }
    ],
    locale: "en_ID",
    type: "profile"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-preview.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Adrian Wahyu Septianto",
  jobTitle: "Full Stack Developer",
  email: "mailto:adrianwahyuseptianto1@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Surabaya",
    addressRegion: "Jawa Timur",
    addressCountry: "ID"
  },
  url: siteUrl,
  sameAs: [
    "https://github.com/adrianwahyuseptianto1-cloud",
    "https://discord.com/users/adrcwy"
  ],
  knowsAbout: [
    "Full stack development",
    "Node.js",
    "React",
    "Laravel",
    "Express",
    "Expo",
    "Automation",
    "Data scraping",
    "Admin dashboards"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
