export default function PrivacyPolicy() {
  return (
    <section className="pt-32 pb-20 px-6 bg-parchment-50">
      <div className="max-w-3xl mx-auto prose prose-ink">
        <h1 className="font-serif text-4xl font-bold text-ink-900 mb-2">Privacy Policy</h1>
        <p className="text-ink-400 text-sm mb-8">Last updated: 2 June 2026</p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Who we are</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          AI Integrity is operated by Rajiv Abeysinghe trading as Antigravity Consulting.
          Contact: <a href="mailto:raj@ai-integ.com" className="text-gold-600 hover:text-gold-700">raj@ai-integ.com</a>.
          Website: <a href="https://ai-integ.com" className="text-gold-600 hover:text-gold-700">ai-integ.com</a>.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">What data we collect</h2>
        <p className="text-ink-600 leading-relaxed mb-2">When you use the founding member signup form, we collect:</p>
        <ul className="list-disc pl-5 text-ink-600 space-y-1 mb-4">
          <li>Your name (optional)</li>
          <li>Your work email address</li>
          <li>Your professional sector</li>
          <li>Your firm size (optional)</li>
        </ul>
        <p className="text-ink-600 leading-relaxed mb-4">
          This data is sent directly to our email inbox via your device's email client.
          We do not use cookies, tracking pixels, or analytics scripts on this site.
          No data is stored in a database or sent to third-party processors.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">How we use your data</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          We use your email address solely to notify you when the AI Integrity community
          opens, and to send you founding member information. We will not share your data
          with third parties, sell it, or use it for purposes other than those stated.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Lawful basis</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          Our lawful basis for processing your data is legitimate interest (Article 6(1)(f)
          UK GDPR) — you have expressed interest in our community by completing the signup form.
          You may withdraw at any time by emailing{" "}
          <a href="mailto:raj@ai-integ.com" className="text-gold-600">raj@ai-integ.com</a>.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Your rights</h2>
        <p className="text-ink-600 leading-relaxed mb-2">Under UK GDPR you have the right to:</p>
        <ul className="list-disc pl-5 text-ink-600 space-y-1 mb-4">
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Object to processing</li>
          <li>Lodge a complaint with the ICO (ico.org.uk)</li>
        </ul>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Data retention</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          We retain your data only for as long as necessary to communicate about the community launch.
          If you request deletion, we will remove your data within 30 days.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Cookies</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          This site does not use cookies. No analytics, no tracking, no third-party scripts.
        </p>

        <h2 className="font-serif text-xl font-bold text-ink-900 mt-8 mb-3">Changes to this policy</h2>
        <p className="text-ink-600 leading-relaxed mb-4">
          We will update this page if our data practices change. The "last updated" date
          at the top reflects the most recent revision.
        </p>
      </div>
    </section>
  );
}
