import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero siteShell">
          <div className="heroCopy">
            <div className="eyebrow">Decision tools, not generic calculators</div>
            <h1>Make better decisions with the right numbers.</h1>
            <p>
              Compare real-world options, uncover hidden costs, and see what
              would actually change the answer.
            </p>
            <div className="heroActions">
              <Link className="primary big" href="/career/job-offer-comparison">
                Compare a job offer
              </Link>
              <Link className="secondary big" href="/methodology">
                See how it works
              </Link>
            </div>
            <div className="trustRow">
              <span>No signup</span>
              <span>Browser-side calculations</span>
              <span>Transparent assumptions</span>
            </div>
          </div>

          <div className="heroCard">
            <div className="eyebrow">Example decision</div>
            <h3>Is a $105K offer actually better?</h3>
            <div className="heroStat">
              <span>Headline raise</span>
              <strong>+$15,000</strong>
            </div>
            <div className="heroStat">
              <span>Extra committed time</span>
              <strong>+548 hrs/yr</strong>
            </div>
            <div className="heroStat">
              <span>Break-even salary</span>
              <strong>$103,941</strong>
            </div>
            <div className="heroCallout">
              <span>The Number That Matters</span>
              <strong>What would make the switch worth it?</strong>
            </div>
          </div>
        </section>

        <section className="siteShell sectionBlock">
          <div className="sectionIntro">
            <div className="eyebrow">Popular decision tool</div>
            <h2>Start with the decision you actually need to make.</h2>
          </div>
          <div className="toolFeatureCard">
            <div>
              <span className="pill">Career</span>
              <h3>Job Offer Decision & Negotiation Simulator</h3>
              <p>
                Compare compensation, commute, time, direct costs, benefits,
                PTO and negotiation scenarios in one place.
              </p>
            </div>
            <Link className="primary" href="/career/job-offer-comparison">
              Open tool
            </Link>
          </div>
        </section>

        <section className="softBand">
          <div className="siteShell">
            <div className="sectionIntro">
              <div className="eyebrow">How InteractionTool works</div>
              <h2>From inputs to a decision you can act on.</h2>
            </div>
            <div className="grid3 publicGrid">
              <article className="publicCard">
                <span>01</span>
                <h3>Enter the real situation</h3>
                <p>Use the numbers that matter for your actual decision.</p>
              </article>
              <article className="publicCard">
                <span>02</span>
                <h3>See hidden trade-offs</h3>
                <p>Costs, time, effective value, and break-even points become visible.</p>
              </article>
              <article className="publicCard">
                <span>03</span>
                <h3>Test what changes the answer</h3>
                <p>Adjust the variables and see which lever matters most.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="siteShell numberSection">
          <div>
            <div className="eyebrow">The Number That Matters™</div>
            <h2>Every tool should surface one number worth remembering.</h2>
            <p>
              Instead of dumping dozens of outputs on you, InteractionTool
              emphasizes the break-even point or threshold that helps move the
              decision forward.
            </p>
          </div>
          <div className="numberCard">
            <span>Example</span>
            <strong>$103,941</strong>
            <p>Modeled break-even base salary</p>
          </div>
        </section>

        <section className="siteShell finalCta">
          <h2>Don’t just calculate it. Decide it.</h2>
          <p>Start with the job offer simulator and see what the switch is really worth.</p>
          <Link className="primary big" href="/career/job-offer-comparison">
            Start comparing
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
