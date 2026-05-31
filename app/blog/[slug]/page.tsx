import type { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import BlogPostReaderPage from "./blog-post-client";

interface Props {
  params: {
    slug: string;
  };
}

/**
 * Server-side dynamic SEO metadata generator for dynamic articles.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found — FastCV PK",
      description: "The requested article was not found on FastCV PK.",
    };
  }

  return {
    title: `${post.title} — FastCV PK`,
    description: post.description,
    alternates: {
      canonical: `https://fastcvpk.online/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — FastCV PK`,
      description: post.description,
      url: `https://fastcvpk.online/blog/${post.slug}`,
      siteName: "FastCV PK",
      images: [
        {
          url: post.image,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
      locale: "en_PK",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — FastCV PK`,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function Page() {
  return <BlogPostReaderPage />;
}
