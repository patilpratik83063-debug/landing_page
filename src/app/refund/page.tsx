import type { Metadata } from "next";
import { LEGAL_EMAIL, LEGAL_PHONE, LegalSection, LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Refund Policy | Indian Automobile Doctor",
  description:
    "Refund policy for Indian Automobile Doctor training packs, including how to request a refund and how long it takes.",
  alternates: { canonical: "/refund" },
};

export default function RefundPolicyPage() {
  return (
    <LegalShell
      title="Refund Policy"
      intro="We want you to know exactly what you are buying. Because our training is digital and access is delivered immediately, this policy explains when a refund is possible."
    >
      <LegalSection heading="1. Request window">
        <p>
          You may request a refund within <strong>7 days</strong> of your payment, provided you have
          not consumed a substantial part of the course. For this policy, watching more than 20% of
          the modules is treated as substantial use.
        </p>
      </LegalSection>

      <LegalSection heading="2. How to request">
        <p>
          Write to <a className="font-semibold underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>{" "}
          or WhatsApp <a className="font-semibold underline" href="tel:+918093777701">{LEGAL_PHONE}</a>{" "}
          with your name, payment reference and the reason for the request. Please send it from the
          number or email you used at checkout.
        </p>
      </LegalSection>

      <LegalSection heading="3. What is refundable">
        <ul className="list-disc space-y-1 pl-5">
          <li>Duplicate or accidental double payments: refunded in full.</li>
          <li>Payment made but access not delivered: refunded in full.</li>
          <li>Refund request within 7 days with minimal use of the course: refunded after verification.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. What is not refundable">
        <ul className="list-disc space-y-1 pl-5">
          <li>Requests made after the 7-day window.</li>
          <li>Cases where a substantial part of the course has already been watched.</li>
          <li>Accounts suspended for sharing, reselling or redistributing the material.</li>
          <li>Change of mind after completing the training.</li>
        </ul>
        <p>
          We do not promise job placement or income, so not getting a job or an expected income is not
          by itself a valid ground for a refund.
        </p>
      </LegalSection>

      <LegalSection heading="5. Processing time">
        <p>
          Approved refunds are initiated within 2 working days. The amount is credited back to the
          original payment method, and the time it takes depends on your bank or UPI provider, usually
          5 to 7 working days.
        </p>
      </LegalSection>

      <LegalSection heading="6. Failed payments">
        <p>
          If money was debited but the order shows as failed or pending, it is usually auto-reversed
          by the bank. If it is not reversed within 7 working days, contact us with the payment
          reference and we will follow up with the payment gateway.
        </p>
      </LegalSection>

      <LegalSection heading="7. Cancellation by us">
        <p>
          If we cancel a batch or are unable to deliver access for any reason, you will receive a full
          refund of the amount paid, or a replacement batch if you prefer.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
