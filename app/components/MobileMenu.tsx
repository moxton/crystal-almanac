"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/?browse=all", label: "Browse" },
  { href: "/beginners", label: "Beginners Guide" },
  { href: "/identify", label: "Identification Guide" },
  { href: "/fakes", label: "Spot Fakes" },
  { href: "/water-safe", label: "Water Safety" },
  { href: "/collections", label: "Collections" },
  { href: "/groups", label: "Mineral Groups" },
  { href: "/colors", label: "Browse by Color" },
  { href: "/birthstones", label: "Birthstones" },
  { href: "/hardness", label: "Hardness Scale" },
  { href: "/care", label: "Crystal Care" },
  { href: "/blog", label: "Blog" },
  { href: "/quiz", label: "Crystal Quiz" },
  { href: "/about", label: "About" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-brand-muted hover:text-white p-2 transition-colors"
        aria-label="Menu"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9h16.5m-16.5 6.75h16.5" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-16 left-0 right-0 bg-brand-bg border-b border-brand-border shadow-xl shadow-black/30">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-brand-muted hover:text-white font-body text-base py-2.5 px-2 rounded-lg hover:bg-brand-surface transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
