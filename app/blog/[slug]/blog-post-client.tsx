"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  List, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  Home
} from "lucide-react";

/**
 * Dynamic SEO Blog Post Reader (/blog/[slug]).
 */
export default function BlogPostReaderPage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Fetch the matched post configuration
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="flex-grow w-full bg-[#0F172A] flex flex-col justify-center items-center p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2 font-inter">Article Not Found</h2>
        <p className="text-xs text-textSecondary mb-6">The blog post you requested does not exist or has been moved.</p>
        <Link href="/blog">
          <Button variant="secondary">Back to Blog list</Button>
        </Link>
      </div>
    );
  }

  // SEO Schema scripts
  const schemaBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fastcvpk.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://fastcvpk.online/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://fastcvpk.online/blog/${post.slug}`
      }
    ]
  };

  const schemaArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": `https://fastcvpk.online${post.image}`,
    "datePublished": "2026-05-23",
    "author": {
      "@type": "Organization",
      "name": "FastCV PK",
      "url": "https://fastcvpk.online"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FastCV PK",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fastcvpk.online/favicon.ico"
      }
    },
    "description": post.description
  };

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-12 px-4 sm:px-6 lg:px-8">
      <title>{language === "ur" ? `${post.titleUr} — FastCV PK` : `${post.title} — FastCV PK`}</title>
      <meta name="description" content={post.description} />
      {/* Dynamic SEO JSON-LD scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaBreadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaArticle) }}
      />

      <div className="mx-auto max-w-4xl relative z-10 space-y-8">
        
        {/* Breadcrumb Strip */}
        <div className="flex items-center gap-2 text-xs text-textSecondary select-none">
          <Link href="/" className="hover:text-white flex items-center gap-1">
            <Home size={12} />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{post.slug}</span>
        </div>

        {/* Hero Section of Article */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="accent">{post.category}</Badge>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
              {language === "ur" ? post.titleUr : post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-textSecondary font-mono border-y border-white/5 py-3">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </span>
            </div>
          </div>
          
          <div className="w-full aspect-[21/9] sm:aspect-[2.3/1] relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src={post.image} 
              alt={post.title} 
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/10 pointer-events-none mix-blend-overlay" />
          </div>
        </div>

        {/* Main Content Layout with Sidebar Table of Contents */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Article Body (Left 70%) */}
          <article className="w-full lg:w-3/4 glass-panel p-6 sm:p-8 rounded-2xl border-white/10 space-y-6">
            
            {/* Table of contents responsive listing on mobile viewports */}
            <div className="lg:hidden bg-slate-950/40 p-4 border border-white/5 rounded-xl mb-6">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1">
                <List size={13} /> Table of Contents
              </h4>
              <ul className="space-y-1.5 text-xs text-textSecondary">
                {post.toc.map((t, idx) => (
                  <li key={idx}>• {t}</li>
                ))}
              </ul>
            </div>

            {/* Injected HTML Body Content */}
            <div 
              className="prose prose-invert prose-sm text-textSecondary leading-relaxed space-y-4 prose-headings:text-white prose-headings:font-bold prose-h3:text-sm prose-h3:uppercase prose-h3:tracking-wide prose-h3:text-blue-400 prose-ul:list-disc prose-ul:pl-6 prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Direct builders trigger card */}
            <div className="mt-8 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">Ready to create your resume now?</h4>
                <p className="text-xs text-textSecondary">Let Gemini AI polish and format your details in under a minute.</p>
              </div>
              <Link href="/create">
                <Button className="px-5 py-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 select-none">
                  Build Free CV
                  <ArrowRight size={13} />
                </Button>
              </Link>
            </div>
          </article>

          {/* Table of Contents Sticky Sidebar (Right 30%) */}
          <aside className="hidden lg:block w-1/4 sticky top-24 space-y-6">
            <Card className="p-5 border-white/5 bg-slate-900/20 select-none">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1">
                <List size={14} className="text-blue-400" />
                Index Contents
              </h3>
              
              <ul className="space-y-3 text-xs text-textSecondary">
                {post.toc.map((t, idx) => (
                  <li key={idx} className="leading-snug hover:text-white transition-colors duration-300">
                    <span className="text-blue-500 font-semibold mr-1">{idx + 1}.</span>
                    {t}
                  </li>
                ))}
              </ul>
            </Card>

            <div className="p-4 rounded-xl border border-white/5 text-center space-y-2">
              <Sparkles size={18} className="text-blue-400 mx-auto animate-pulse" />
              <p className="text-[10px] text-textSecondary uppercase font-mono tracking-wider font-bold">FastCV PK AI</p>
              <p className="text-[11px] text-textSecondary/80">Pakistan's first automated local resume tool.</p>
            </div>
          </aside>

        </div>

        {/* Localized FAQ Accordion at the bottom of dynamic reader */}
        {post.faqs.length > 0 && (
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border-white/10 space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-1.5 border-b border-white/5 pb-3">
              <HelpCircle size={18} className="text-blue-400" />
              Frequently Asked Questions (FAQ)
            </h3>
            
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => {
                const active = openFaqIdx === idx;
                return (
                  <div key={idx} className="border-b border-white/5 pb-3 last:border-b-0">
                    <button
                      onClick={() => setOpenFaqIdx(active ? null : idx)}
                      className="w-full text-left flex justify-between items-center text-xs font-semibold text-white hover:text-blue-400 transition-colors py-2 focus:outline-none touch-btn"
                    >
                      <span>{faq.q}</span>
                      <span className="text-blue-400 text-sm font-bold ml-4">{active ? "-" : "+"}</span>
                    </button>
                    
                    {active && (
                      <p className="text-xs text-textSecondary leading-relaxed mt-2 pl-2">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
