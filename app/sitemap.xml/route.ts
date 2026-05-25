import { NextResponse } from "next/server";

/**
 * Dynamic XML sitemap route generator.
 */
export async function GET() {
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fastcvpk.online/</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/templates</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/create</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog</loc>
    <lastmod>2026-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog/cv-kaise-banate-hain</loc>
    <lastmod>2026-05-25</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog/ats-friendly-cv-kya-hota-hai</loc>
    <lastmod>2026-05-25</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog/student-cv-guide-pakistan</loc>
    <lastmod>2026-05-25</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog/biodata-format-pakistan</loc>
    <lastmod>2026-05-25</lastmod>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://fastcvpk.online/blog/freelancer-cv-tips-pakistan</loc>
    <lastmod>2026-05-25</lastmod>
    <priority>0.6</priority>
  </url>
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate"
    },
  });
}
