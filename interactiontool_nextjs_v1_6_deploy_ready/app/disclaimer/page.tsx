import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: 'Disclaimer',
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="siteShell legalPage">
        <h1>Disclaimer</h1>
        <div className="legalCopy">
          <p>InteractionTool provides calculators and decision-support estimates for general informational purposes. Results depend on the values and assumptions entered and may not reflect taxes, employer-plan rules, contract terms, local law, investment outcomes, inflation, future compensation changes, or other circumstances relevant to a real decision.</p>
<p>The Job Offer Decision & Negotiation Simulator does not provide legal, tax, financial, investment, employment or career advice. A modeled break-even salary or negotiation scenario is an estimate, not a recommendation to accept, reject, or negotiate an offer.</p>
<p>Before making a material financial or employment decision, verify important figures independently and consider obtaining qualified professional advice when appropriate.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
