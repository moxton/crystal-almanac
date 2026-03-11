import type { Metadata } from "next";
import Link from "next/link";
import { getAllCrystals } from "@/app/lib/crystals";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Crystal Almanac - Encyclopedia of Crystals, Minerals & Stones",
    template: "%s | Crystal Almanac",
  },
  description:
    "The modern encyclopedia of crystals and minerals. Scientific identification, formation stories, fake-spotting guides, and cultural traditions for every stone.",
  metadataBase: new URL("https://crystalalmanac.com"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
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

import { GuidesDropdown } from "@/app/components/GuidesDropdown";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-8">
        <Logo />
        <div className="flex items-center gap-4 md:gap-6 text-sm font-body">
          <Link
            href="/?browse=all"
            className="text-brand-muted hover:text-white transition-colors"
          >
            Browse
          </Link>
          <GuidesDropdown />
          <Link
            href="/blog"
            className="text-brand-muted hover:text-white transition-colors"
          >
            Blog
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
  const crystalCount = getAllCrystals().length;
  return (
    <footer className="border-t border-brand-border mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="md:max-w-sm">
            <Logo />
            <p className="text-brand-muted text-sm mt-4 font-body">
              A modern encyclopedia of crystals, minerals, and stones.
              Scientific accuracy meets editorial storytelling.
            </p>
            <p className="text-brand-muted/60 text-xs mt-2 font-body">
              {crystalCount} minerals and counting.
            </p>
          </div>
          <div className="flex gap-8 sm:gap-12 text-sm font-body flex-wrap">
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Explore</span>
              <Link href="/?browse=all" className="text-brand-muted hover:text-white transition-colors">Browse All</Link>
              <Link href="/blog" className="text-brand-muted hover:text-white transition-colors">Blog</Link>
              <Link href="/about" className="text-brand-muted hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="text-brand-muted hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Guides</span>
              <Link href="/collections" className="text-brand-muted hover:text-white transition-colors">Collections</Link>
              <Link href="/groups" className="text-brand-muted hover:text-white transition-colors">Mineral Groups</Link>
              <Link href="/colors" className="text-brand-muted hover:text-white transition-colors">By Color</Link>
              <Link href="/birthstones" className="text-brand-muted hover:text-white transition-colors">Birthstones</Link>
              <Link href="/hardness" className="text-brand-muted hover:text-white transition-colors">Hardness Scale</Link>
              <Link href="/care" className="text-brand-muted hover:text-white transition-colors">Crystal Care</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium mb-1">Legal</span>
              <Link href="/privacy" className="text-brand-muted hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-brand-muted hover:text-white transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 text-brand-muted/50 text-xs mt-10 font-body">
          <p>
            &copy; {new Date().getFullYear()} Crystal Almanac. All rights
            reserved.
          </p>
          <span>·</span>
          <span>v1.7</span>
        </div>
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-G3CEP7FNYL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-G3CEP7FNYL');`,
          }}
        />
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
