"use client";

import { useState } from "react";
import Link from "next/link";

const LEARN = [
  { href: "/beginners", label: "Beginners Guide" },
  { href: "/identify", label: "Identification Guide" },
  { href: "/fakes", label: "Spot Fakes" },
  { href: "/water-safe", label: "Water Safety" },
];

const REFERENCE = [
  { href: "/collections", label: "Collections" },
  { href: "/groups", label: "Mineral Groups" },
  { href: "/colors", label: "Browse by Color" },
  { href: "/birthstones", label: "Birthstones" },
  { href: "/hardness", label: "Hardness Scale" },
  { href: "/care", label: "Crystal Care" },
];

const BOTTOM = [
  { href: "/blog", label: "Blog" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about", label: "About" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  const linkClass =
    "text-brand-muted hover:text-white font-body text-sm py-2 px-3 rounded-lg hover:bg-brand-surface transition-colors";
  const sectionClass =
    "text-brand-accent text-[10px] uppercase tracking-[0.15em] font-body px-3 pt-3 pb-1";

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
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* Browse */}
            <Link
              href="/?browse=all"
              onClick={() => setOpen(false)}
              className={linkClass}
            >
              Browse All
            </Link>

            {/* Learn section */}
            <p className={sectionClass}>Learn</p>
            {LEARN.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block ${linkClass}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Reference section */}
            <p className={sectionClass}>Reference</p>
            {REFERENCE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block ${linkClass}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Divider + bottom row */}
            <div className="border-t border-brand-border/40 mx-2 mt-3 mb-2" />
            <div className="flex gap-1">
              {BOTTOM.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex-1 text-center ${linkClass}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
