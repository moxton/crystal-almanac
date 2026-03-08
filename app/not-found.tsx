import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-brand-accent text-sm uppercase tracking-[0.2em] font-body mb-4">
          404
        </p>
        <h1 className="font-heading text-4xl md:text-5xl text-white">
          Crystal Not <em>Found</em>
        </h1>
        <p className="text-brand-muted font-body mt-4 max-w-md mx-auto">
          This mineral doesn't exist in our database yet. But we're always adding more.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-brand-accent/10 border border-brand-accent/30 rounded-lg text-brand-accent font-body text-sm hover:bg-brand-accent/20 transition-colors"
        >
          Browse All Crystals
        </Link>
      </div>
    </div>
  );
}
