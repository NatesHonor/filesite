import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://files.natemarcellus.com"),
  title: {
    default: "Files | Nate Marcellus",
    template: "%s | Files",
  },
  description:
    "Official file distribution and resource portal for files.natemarcellus.com. Secure access to hosted files, releases, and digital resources.",
  applicationName: "Files",
  referrer: "origin-when-cross-origin",
  keywords: [
    "files",
    "downloads",
    "resources",
    "file hosting",
    "releases",
    "natemarcellus",
  ],
  authors: [{ name: "Nate Marcellus", url: "https://natemarcellus.com" }],
  creator: "Nate Marcellus",
  publisher: "Nate Marcellus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://files.natemarcellus.com",
  },
  openGraph: {
    type: "website",
    url: "https://files.natemarcellus.com",
    title: "Files | Nate Marcellus",
    description:
      "Official file distribution and resource portal for files.natemarcellus.com.",
    siteName: "files.natemarcellus.com",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Files | Nate Marcellus",
    description:
      "Official file distribution and resource portal for files.natemarcellus.com.",
    creator: "@natemarcellus",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Files",
    url: "https://files.natemarcellus.com",
    description:
      "Official file distribution and resource portal for files.natemarcellus.com.",
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} scroll-smooth`}
    >
      <body className="relative min-h-screen bg-neutral-950 text-neutral-100 antialiased selection:bg-indigo-500/30 selection:text-white">

        <div className="pointer-events-none fixed inset-0 -z-20 bg-neutral-950" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_60%)]" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />

        <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              files.natemarcellus.com
            </Link>

            <nav className="hidden gap-8 text-sm text-neutral-300 md:flex">
              <Link href="/downloads" className="transition hover:text-white">
                Downloads
              </Link>
              <Link href="/resources" className="transition hover:text-white">
                Resources
              </Link>
              <Link
                href="https://status.natemarcellus.com"
                className="transition hover:text-white"
              >
                Status
              </Link>
            </nav>

            <Link
              href="/downloads"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Browse Files
            </Link>
          </div>
        </header>

        <main className="relative flex flex-1 flex-col">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-neutral-950">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-neutral-400 md:flex-row">
            <p>© {new Date().getFullYear()} Nate Marcellus. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="https://www.natemarcellus.com/privacypolicy"
                className="transition hover:text-white"
              >
                Privacy
              </Link>
              <Link
                href="https://www.natemarcellus.com/termsandconditions"
                className="transition hover:text-white"
              >
                Terms
              </Link>
            </div>
          </div>
        </footer>

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}