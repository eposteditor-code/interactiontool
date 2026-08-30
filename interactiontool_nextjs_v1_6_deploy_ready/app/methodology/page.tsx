import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: 'Methodology',
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="siteShell legalPage">
        <h1>How the numbers are calculated</h1>
        <div className="legalCopy">
          <p>InteractionTool is designed around deterministic calculations, not opaque recommendations. Each tool separates user inputs, assumptions, formulas, and decision-support outputs so you can inspect what drives the result.</p>
<p>For the Job Offer Decision & Negotiation Simulator, recurring compensation includes salary, expected bonus, annual equity, employer retirement value and employer-paid benefits. Direct job costs are subtracted. Work time and commute time are combined into committed time. Effective value per hour is calculated from annual financial value divided by committed time.</p>
<p>The break-even salary is the modeled base salary at which the new offer reaches the current job’s effective financial value per committed hour, using the other offer assumptions entered by the user. One-time signing bonuses are kept separate from ongoing compensation.</p>
<p>Negotiation scenarios rerun the full model when salary, office days, PTO, bonus or retirement value changes. This means a remote-work change can affect commute time, direct costs and committed time at once rather than being treated as a simple shortcut.</p>
<p>The outputs are decision-support estimates. They are only as accurate as the assumptions entered, and they are not a substitute for tax, legal, investment or career advice.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
