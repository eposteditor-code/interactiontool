import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function GuideLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="siteShell guidePage">
        <div className="eyebrow">Career guide</div>
        <h1>{title}</h1>
        <p className="guideIntro">{intro}</p>
        <div className="guideBody">{children}</div>
        <div className="guideCta">
          <h2>Compare the numbers with your actual offer.</h2>
          <p>
            Use the Job Offer Decision & Negotiation Simulator to model salary,
            time, commute, benefits, PTO and break-even scenarios.
          </p>
          <Link className="primary big" href="/career/job-offer-comparison">
            Open the job offer simulator
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
