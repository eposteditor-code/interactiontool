import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/career/job-offer-comparison",
    "/guides/how-to-compare-two-job-offers",
    "/guides/how-much-raise-is-worth-switching-jobs",
    "/guides/remote-vs-office-hidden-costs",
    "/methodology",
    "/privacy",
    "/disclaimer",
    "/about",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/career/job-offer-comparison"
          ? 0.95
          : route.startsWith("/guides/")
            ? 0.75
            : 0.5,
  }));
}
