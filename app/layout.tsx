import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Crystal Almanac - Encyclopedia of Crystals & Minerals",
    template: "%s | Crystal Almanac",
  },
  description:
    "The modern encyclopedia of crystals and minerals. Scientific identification, formation stories, fake-spotting guides, and cultural traditions for every stone.",
  metadataBase: new URL("https://crystalalmanac.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Crystal Almanac",
  },
};

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M32 4L58 20V46L32 60L6 46V20L32 4Z"
          stroke="#A78BFA"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M32 12L50 24V42L32 52L14 42V24L32 12Z"
          stroke="#A78BFA"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M32 20L42 28V38L32 44L22 38V28L32 20Z"
          stroke="#A78BFA"
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
      </svg>
      <div className="flex flex-col">
        <span className="font-heading text-lg leading-tight">
          <span className="text-white">Crystal </span>
          <span className="text-white italic">Almanac</span>
        </span>
      </div>
    </Link>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6 text-sm font-body">
          <Link
            href="/"
            className="text-brand-muted hover:text-white transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-brand-muted hover:text-white transition-colors"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-brand-border mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <Logo />
        <p className="text-brand-muted text-sm mt-4 font-body max-w-md mx-auto">
          A modern encyclopedia bridging geological science and crystal
          traditions. Scientific accuracy meets editorial storytelling.
        </p>
        <p className="text-brand-muted/50 text-xs mt-8 font-body">
          &copy; {new Date().getFullYear()} Crystal Almanac. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-brand-bg text-white font-body antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
