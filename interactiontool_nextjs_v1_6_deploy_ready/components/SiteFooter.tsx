import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div className="siteShell footerGrid">
        <div>
          <div className="brand">InteractionTool</div>
          <p>Interactive calculators for real-world decisions.</p>
        </div>
        <div className="footerLinks">
          <Link href="/guides/how-to-compare-two-job-offers">Career Guides</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </footer>
  );
}
