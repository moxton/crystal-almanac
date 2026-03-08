import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Crystal Almanac privacy policy - how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <p className="text-brand-accent text-sm uppercase tracking-[0.15em] font-body mb-4">
        Legal
      </p>
      <h1 className="font-heading text-4xl md:text-5xl text-white">
        Privacy <em>Policy</em>
      </h1>
      <p className="text-brand-muted text-sm font-body mt-4">
        Last updated: March 2026
      </p>

      <div className="mt-10 space-y-8 text-white/85 font-body leading-relaxed">
        <section>
          <h2 className="font-heading text-xl text-white mb-3">Who We Are</h2>
          <p>
            Crystal Almanac is an online encyclopedia of crystals and minerals
            operated at crystalalmanac.com. This policy explains how we collect,
            use, and protect information when you visit our site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Information We Collect
          </h2>
          <p>
            We collect minimal data. When you visit Crystal Almanac, our hosting
            provider (Vercel) automatically collects standard server log
            information including your IP address, browser type, referring page,
            and pages visited. This data is used solely for site performance and
            security purposes.
          </p>
          <p className="mt-3">
            If we implement analytics (such as Google Analytics), we will use it
            to understand aggregate traffic patterns - which pages are popular,
            how visitors find us, and how we can improve the site. Analytics data
            is anonymized where possible.
          </p>
          <p className="mt-3">
            We do not collect personal information such as names, email
            addresses, or payment details unless you voluntarily provide them
            (for example, by contacting us via email).
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">Cookies</h2>
          <p>
            Crystal Almanac may use cookies for analytics and, if applicable,
            advertising purposes. Cookies are small text files stored on your
            device. You can control cookie behavior through your browser
            settings. Disabling cookies will not affect your ability to browse
            the site.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Third-Party Services
          </h2>
          <p>
            We may use third-party services including analytics providers (such
            as Google Analytics), advertising networks (such as Google AdSense
            or Mediavine), and affiliate programs. These services may collect
            information about your browsing activity across websites using
            cookies and similar technologies. Each service operates under its
            own privacy policy.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Affiliate Links
          </h2>
          <p>
            Crystal Almanac may contain affiliate links to third-party
            retailers. When you click an affiliate link and make a purchase, we
            may earn a commission at no additional cost to you. Affiliate
            relationships never influence our editorial content, identification
            guides, or fake-spotting advice.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Data Security
          </h2>
          <p>
            Crystal Almanac is served over HTTPS. We do not store personal data
            in databases. Our site is statically generated, meaning there are no
            server-side applications processing user data in real time.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Children&apos;s Privacy
          </h2>
          <p>
            Crystal Almanac is not directed at children under 13. We do not
            knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this policy from time to time. Changes will be posted
            on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl text-white mb-3">Contact</h2>
          <p>
            Questions about this privacy policy can be directed to{" "}
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
