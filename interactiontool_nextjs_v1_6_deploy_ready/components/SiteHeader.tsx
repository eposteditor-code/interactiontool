import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="siteShell headerInner">
        <Link href="/" className="brand">InteractionTool</Link>
        <nav className="nav">
          <Link href="/career/job-offer-comparison">Career</Link>
          <Link href="/methodology">Methodology</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="primary headerCta" href="/career/job-offer-comparison">
          Try the tool
        </Link>
      </div>
    </header>
  );
}
