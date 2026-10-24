import type { Metadata } from "next";
import { LegalSection, LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Indian Automobile Doctor",
  description:
    "How Indian Automobile Doctor collects, uses and protects your personal data when you buy a training pack or contact us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="This policy explains what information we collect, why we collect it, and how you can control it. We keep this short and in plain language."
    >
      <LegalSection heading="1. Information we collect">
        <ul className="list-disc space-y-1 pl-5">
          <li>Details you give us at checkout or on WhatsApp: name, phone number, email address.</li>
          <li>Order details: which training pack you bought, amount, payment status and payment reference.</li>
          <li>Support messages you send us, so we can answer your questions.</li>
          <li>Basic technical data such as browser type and pages visited, if analytics is enabled.</li>
        </ul>
        <p>
          Card, UPI and netbanking details are entered directly on the payment gateway. We do not
          receive or store your full card number or UPI PIN.
        </p>
      </LegalSection>

      <LegalSection heading="2. Payment processing">
        <p>
          Online payments are processed by Razorpay. Their systems handle your payment instrument
          data under their own privacy policy and PCI-DSS obligations. We only receive the payment
          status, amount and a payment identifier so we can confirm your access.
        </p>
      </LegalSection>

      <LegalSection heading="3. How we use your information">
        <ul className="list-disc space-y-1 pl-5">
          <li>To deliver the training access you purchased and confirm your payment.</li>
          <li>To provide support on WhatsApp, phone or email.</li>
          <li>To send access links, receipts and important service updates.</li>
          <li>To prevent fraud, duplicate payments and misuse of course material.</li>
        </ul>
        <p>We do not sell your personal data to anyone.</p>
      </LegalSection>

      <LegalSection heading="4. Sharing">
        <p>
          We share only what is necessary with service providers who help us run the business:
          the payment gateway, our email and WhatsApp communication tools, and hosting providers.
          We may also disclose information if required by law.
        </p>
      </LegalSection>

      <LegalSection heading="5. Cookies and analytics">
        <p>
          We use essential cookies needed for the site and checkout to work. If we enable analytics
          or advertising measurement, it is loaded only with your consent where consent is required.
          You can block or clear cookies in your browser settings at any time.
        </p>
      </LegalSection>

      <LegalSection heading="6. How long we keep data">
        <p>
          Order and payment records are kept as long as required for accounting, tax and dispute
          resolution. Support conversations are kept only as long as needed to help you. You can ask
          us to delete data that we are not legally required to keep.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your choices">
        <p>
          You can ask us for a copy of the personal data we hold about you, ask us to correct it, or
          ask us to delete it. Write to us from the email or phone number you used at checkout so we
          can verify the request.
        </p>
      </LegalSection>

      <LegalSection heading="8. Children">
        <p>
          Our training is intended for adults and for students who are 16 years or older with the
          knowledge of a parent or guardian. We do not knowingly collect data from children below 13.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to this policy">
        <p>
          If we update this policy we will change the date at the top of this page. Continued use of
          the site after an update means you accept the revised policy.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
