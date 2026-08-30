import type { Metadata } from "next";
import JobOfferWizard from "@/components/JobOfferWizard";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Job Offer Decision & Negotiation Simulator",
  description:
    "Compare job offers using compensation, commute, time, direct costs, benefits, PTO, effective value per hour, break-even salary and negotiation scenarios.",
};

export default function JobOfferComparisonPage() {
  return (
    <>
      <SiteHeader />
      <main className="toolPage">
        <JobOfferWizard />
      </main>
      <SiteFooter />
    </>
  );
}
