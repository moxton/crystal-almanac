import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Crystal Almanac.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Contact
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Get in <em>Touch</em>
      </h1>

      <div className="mt-10 space-y-6 text-white/85 font-body leading-relaxed">
        <p>
          Have a question about a mineral identification? Spotted an error in
          one of our profiles? Want to suggest a crystal we should cover next?
          We'd love to hear from you.
        </p>

        <div className="bg-brand-surface border border-brand-border rounded-xl p-8 mt-8">
          <h2 className="font-heading text-xl text-white mb-2">Email Us</h2>
          <a
            href="mailto:hello@crystalalmanac.com"
            className="text-brand-accent text-lg hover:underline font-body"
          >
            hello@crystalalmanac.com
          </a>
          <p className="text-brand-muted text-sm mt-3 font-body">
            We typically respond within a few days.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="font-heading text-xl text-white mb-4">
            Common Reasons People Write
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-brand-accent mt-1">→</span>
              <p>
                <strong className="text-white">Crystal suggestions</strong> -
                Tell us which mineral you want to see added next. We prioritize
                based on reader interest.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-accent mt-1">→</span>
              <p>
                <strong className="text-white">Corrections</strong> -
                If you spot an error in our mineralogical data, formation
                stories, or locality information, please let us know. We take
                accuracy seriously.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-brand-accent mt-1">→</span>
              <p>
                <strong className="text-white">Partnerships</strong> -
                Interested in working together? We're open to collaborations
                with mineral dealers, museums, and educational organizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
