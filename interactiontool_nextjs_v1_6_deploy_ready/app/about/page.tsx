import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: 'About',
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="siteShell legalPage">
        <h1>About InteractionTool</h1>
        <div className="legalCopy">
          <p>InteractionTool is a focused collection of interactive decision tools built around a simple idea: people usually do not need another generic calculator. They need help understanding what a number means for a real choice.</p>
<p>Each tool is designed to move from a question to relevant inputs, transparent calculations, hidden costs or time trade-offs, a break-even threshold, and scenarios that show what could change the answer.</p>
<p>The first flagship tool focuses on job-offer comparison and negotiation. Future tools can apply the same framework to money, home, car, business and creator decisions while keeping the experience focused, transparent and practical.</p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
