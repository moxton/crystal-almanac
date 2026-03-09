"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const GUIDES = [
  { href: "/collections", label: "Collections", sub: "Curated by tradition" },
  { href: "/colors", label: "Browse by Color", sub: "The geology of color" },
  { href: "/birthstones", label: "Birthstones", sub: "Stones by month" },
  { href: "/hardness", label: "Hardness Scale", sub: "Mohs scale mapped" },
  { href: "/care", label: "Crystal Care", sub: "Water, sun & handling" },
];

export function GuidesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-brand-muted hover:text-white transition-colors flex items-center gap-1"
      >
        Guides
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-3 w-56 bg-brand-surface border border-brand-border rounded-xl shadow-xl shadow-black/30 overflow-hidden z-50">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 hover:bg-brand-border/30 transition-colors border-b border-brand-border/30 last:border-0"
            >
              <span className="text-white text-sm font-body font-medium">
                {guide.label}
              </span>
              <span className="text-brand-muted text-xs font-body block mt-0.5">
                {guide.sub}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
