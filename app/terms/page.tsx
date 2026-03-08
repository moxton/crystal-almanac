import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Crystal Almanac terms of use.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Legal
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Terms of <em>Use</em>
      </h1>
      <p className="text-brand-muted text-sm font-body mt-4">
        Last updated: March 2026
      </p>

      <div className="mt-10 space-y-8 text-white/85 font-body leading-relaxed">
        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing and using Crystal Almanac (crystalalmanac.com), you
            agree to these Terms of Use. If you do not agree, please do not use
            the site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Educational Content Only
          </h2>
          <p>
            All content on Crystal Almanac is provided for informational and
            educational purposes only. Our mineralogical data is researched for
            accuracy, but we make no guarantees regarding completeness or
            suitability for any specific purpose.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Not Medical or Professional Advice
          </h2>
          <p>
            Crystal Almanac presents metaphysical and healing traditions as
            cultural beliefs, not scientific or medical claims. Nothing on this
            site should be interpreted as medical advice, diagnosis, or
            treatment. Always consult a qualified healthcare provider for health
            concerns. Crystals are not substitutes for professional medical care.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Intellectual Property
          </h2>
          <p>
            All original text content, design elements, and the Crystal Almanac
            brand are the intellectual property of Crystal Almanac. You may
            reference and link to our content, but reproduction of substantial
            portions without permission is prohibited.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Accuracy and Liability
          </h2>
          <p>
            While we strive for scientific accuracy in all mineralogical data,
            Crystal Almanac is provided &quot;as is&quot; without warranties of
            any kind. We are not liable for any decisions made based on
            information found on this site, including but not limited to
            purchasing decisions, identification of minerals, or health-related
            decisions.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Third-Party Links
          </h2>
          <p>
            Crystal Almanac may contain links to third-party websites, including
            affiliate links to retailers. We are not responsible for the content,
            accuracy, or practices of external sites. Inclusion of a link does
            not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. Continued
            use of the site following changes constitutes acceptance of the
            revised terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">Contact</h2>
          <p>
            Questions about these terms can be directed to{" "}
            <a
              href="mailto:hello@crystalalmanac.com"
              className="text-brand-accent hover:underline"
            >
              hello@crystalalmanac.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
