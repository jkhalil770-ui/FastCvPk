"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight,
  Sparkles
} from "lucide-react";

/**
 * Premium SEO Blog Listing page (/blog).
 */
export default function BlogListingPage() {
  const { language } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "ATS CV", "Biodata", "Student", "Tips"];

  // Filter logic
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleUr.includes(searchQuery) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-grow w-full bg-[#0F172A] relative py-16 px-4 sm:px-6 lg:px-8">
      <title>{language === "ur" ? "بلاگ اور ٹپس — FastCV PK" : "Job CV & Professional Tips Blog — FastCV PK"}</title>
      <meta name="description" content="FastCV PK professional career guide. Learn ATS optimization checklists, matrimony Biodata instructions, and interview prep in Urdu & English." />
      
      {/* Back glow */}
      <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10 space-y-12">
        
        {/* Title / Headline */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-semibold mb-2">
            <BookOpen size={13} />
            {language === "ur" ? "پیشہ ورانہ رہنمائی اور بلاگ" : "FastCV PK Career Hub"}
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {language === "ur" ? "سی وی بنانے کے طریقے اور ٹپس" : "Professional CV & Job Tips"}
          </h1>
          <p className="text-xs sm:text-sm text-textSecondary max-w-xl mx-auto leading-relaxed">
            Discover local employment checklists, ATS optimization keywords, and matrimony Biodata instructions curated by Pakistani industry HR writers.
          </p>
        </div>

        {/* Search & Category Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/60 p-4 border border-white/5 rounded-2xl backdrop-blur-md">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all touch-btn border ${
                  activeCategory === cat
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                    : "bg-white/5 border-white/5 text-textSecondary hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-textSecondary">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder={language === "ur" ? "سرچ کریں..." : "Search articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/10 focus:border-blue-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white outline-none transition-all placeholder-textSecondary"
            />
          </div>
        </div>

        {/* Card Grid List with Skeletons fallback */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div 
                key={n} 
                className="glass-panel rounded-xl overflow-hidden border-white/5 flex flex-col justify-between p-6 space-y-5 animate-pulse"
              >
                <div className="w-full aspect-[1.8/1] bg-white/5 rounded-lg" />
                <div className="space-y-3">
                  <div className="h-3 w-1/3 bg-white/5 rounded" />
                  <div className="h-5 w-5/6 bg-white/10 rounded" />
                  <div className="h-3.5 w-full bg-white/5 rounded" />
                  <div className="h-3.5 w-4/5 bg-white/5 rounded" />
                </div>
                <div className="h-9 w-full bg-white/5 rounded-lg mt-4" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-xs text-textSecondary italic text-center py-16">No articles matching your search filters.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div 
                key={post.slug}
                className="glass-panel rounded-xl overflow-hidden border-white/5 flex flex-col justify-between hover:scale-[1.01] hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                {/* Visual cover box rendering actual generated image */}
                <div className="w-full aspect-[1.8/1] border-b border-white/5 relative select-none overflow-hidden group">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Subtle dark gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent pointer-events-none" />
                  
                  <div className="absolute inset-0 p-4 flex flex-col justify-end pointer-events-none">
                    <span className="relative z-10 w-fit">
                      <Badge variant="secondary" className="bg-slate-950/70 border-white/20 text-white font-semibold uppercase tracking-wider text-[9px] backdrop-blur-md">
                        {post.category}
                      </Badge>
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Date and read stamp */}
                    <div className="flex items-center gap-3 text-[10px] text-textSecondary font-mono mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-base font-bold text-white leading-snug hover:text-blue-400 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {language === "ur" ? post.titleUr : post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-xs text-textSecondary mt-3 leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] text-textSecondary">
                      <Sparkles size={11} className="text-blue-400" />
                      SEO Verified
                    </span>
                    
                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-1 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">
                      {language === "ur" ? "پڑھیں" : "Read Post"}
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
