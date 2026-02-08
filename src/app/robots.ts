import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Since this is a landing-only page, we allow all search engines access!
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
