import type { Metadata } from "next";
import Link from "next/link";
import { LegalSection, LegalShell } from "@/components/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | Indian Automobile Doctor",
  description:
    "Terms for using the Indian Automobile Doctor website and buying the Foundation Pack or Mastery Pack training.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms & Conditions"
      intro="These terms apply when you use this website or buy a training pack from us. Please read them before you pay."
    >
      <LegalSection heading="1. What we provide">
        <p>
          We provide recorded and practical automotive training on ECM repair, BS6 diagnostics, EV
          and hybrid systems, and related modules. The Foundation Pack and Mastery Pack differ in the
          depth of EV/hybrid content, as described on their pages.
        </p>
        <p>
          Training is educational. It is not a job placement service, a franchise offer, or
          investment advice.
        </p>
      </LegalSection>

      <LegalSection heading="2. No guarantee of income or placement">
        <p>
          We do not promise a job, a salary, a specific income, or a number of interviews. Any
          example shared on this site, including student messages, is an individual experience and is
          not a promise of the result you will get. Your outcome depends on your practice, skill,
          consistency, location and market conditions.
        </p>
      </LegalSection>

      <LegalSection heading="3. Access and duration">
        <p>
          Access is given to the phone number and email you use at checkout, usually within minutes
          of a successful payment. If access does not arrive, contact us on the number listed below
          and we will resolve it.
        </p>
        <p>
          Access duration is the period communicated to you at the time of purchase. Access is for
          one learner and cannot be transferred or resold.
        </p>
      </LegalSection>

      <LegalSection heading="4. Payments and pricing">
        <p>
          Prices are shown in Indian Rupees and are inclusive of applicable taxes unless stated
          otherwise. Online payments are handled by our payment gateway. A payment is confirmed only
          after the gateway reports success.
        </p>
        <p>
          If a payment fails but money is debited, it is normally reversed by your bank as per their
          timelines. Send us the payment reference and we will help follow up.
        </p>
      </LegalSection>

      <LegalSection heading="5. Course material and intellectual property">
        <p>
          All videos, notes, diagrams and other material are owned by us or licensed to us. Your
          purchase gives you a personal, non-exclusive licence to learn from the material. You may not
          record, download for redistribution, re-upload, resell, or share the material publicly or in
          any group. Sharing access can lead to immediate suspension without refund.
        </p>
      </LegalSection>

      <LegalSection heading="6. Acceptable use">
        <ul className="list-disc space-y-1 pl-5">
          <li>Do not attempt to break, scrape or overload this website.</li>
          <li>Do not misuse our name, logos or student content.</li>
          <li>Do not use the training to misrepresent yourself as a certified professional where a formal certification is legally required.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Safety and practical work">
        <p>
          Automotive and high-voltage EV work can be dangerous. Always follow manufacturer
          procedures, use proper safety gear, and work under qualified supervision. You are
          responsible for how you apply what you learn.
        </p>
      </LegalSection>

      <LegalSection heading="8. Limitation of liability">
        <p>
          To the extent permitted by law, our total liability for any claim related to a purchase is
          limited to the amount you paid for that purchase. We are not liable for indirect losses such
          as lost business, lost opportunity or damage to property arising from how you apply the
          training.
        </p>
      </LegalSection>

      <LegalSection heading="9. Refunds">
        <p>
          Refunds are governed by our <Link className="font-semibold underline" href="/refund">Refund Policy</Link>.
        </p>
      </LegalSection>

      <LegalSection heading="10. Governing law">
        <p>
          These terms are governed by the laws of India. Disputes are subject to the jurisdiction of
          the courts at Bhubaneswar, Odisha.
        </p>
      </LegalSection>
    </LegalShell>
  );
}
