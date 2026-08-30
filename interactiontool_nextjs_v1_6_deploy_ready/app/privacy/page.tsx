import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: 'Privacy',
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="siteShell legalPage">
        <h1>Privacy</h1>
        <div className="legalCopy">
          <p>InteractionTool is built to minimize the amount of personal information required to use its tools. The Job Offer Decision & Negotiation Simulator currently performs its calculations in your browser.</p>
<p>Comparison inputs can be saved in browser localStorage so the tool can restore your work on the same device. This data remains in your browser unless you clear it or use the tool’s reset function.</p>
<p>The current calculator does not require an account. Salary and job comparison inputs are not intentionally sent to a server by the calculator engine itself.</p>
<p>If analytics, advertising, error monitoring, or other third-party services are added later, this policy should be updated before those services are enabled. Users should also be informed of any cookies or data collection that those services introduce.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
