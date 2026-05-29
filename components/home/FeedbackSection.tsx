"use client";

import React, { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import Button from "@/components/ui/Button";

export default function FeedbackSection() {
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cvType, setCvType] = useState("ATS CV");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name.trim() || !rating || !message.trim()) {
      toast(
        "Please fill all required fields.",
        "warning",
        "براہ کرم تمام ضروری خانے پُر کریں۔",
        3000
      );
      return;
    }

    if (message.trim().length < 10) {
      toast(
        "Message must be at least 10 characters.",
        "warning",
        "پیغام کم از کم 10 حروف کا ہونا چاہیے۔",
        3000
      );
      return;
    }

    if (message.trim().length > 500) {
      toast(
        "Message cannot exceed 500 characters.",
        "warning",
        "پیغام 500 حروف سے زیادہ نہیں ہو سکتا۔",
        3000
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/save-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          cvType,
          rating,
          message: message.trim()
        })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Server error");
      }

      toast(
        "Thank you! Your feedback has been received. ✓",
        "success",
        "شکریہ! آپ کا فیڈ بیک مل گیا۔ ✓",
        3000
      );

      setName(""); setEmail(""); setCvType("ATS CV"); setRating(0); setHoverRating(0); setMessage("");
    } catch (error: any) {
      console.error("Error saving feedback:", error);
      toast(
        "Something went wrong. Please try again.",
        "error",
        "کچھ مسئلہ ہوا۔ دوبارہ کوشش کریں۔",
        3000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full max-w-4xl px-4 py-24 sm:px-6 lg:px-8 mx-auto relative">
      <div className="absolute top-0 right-1/4 w-[30vw] h-[30vw] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />
      
      {/* Title block strictly following two lines language rule */}
      <div className="text-center mb-12">
        <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl text-blue-400 mb-4 select-none">
          <MessageSquare size={28} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
          Share Your Feedback
        </h2>
        <h3 className="text-xl sm:text-2xl font-bold text-blue-400 font-urdu leading-relaxed mt-1">
          اپنی رائے ہمیں بتائیں
        </h3>
        
        <p className="text-xs sm:text-sm text-textSecondary mt-3 max-w-xl mx-auto leading-relaxed">
          Feedback, suggestions, or any question — we want to hear from you!
        </p>
        <p className="text-xs sm:text-sm text-blue-300 font-urdu leading-normal mt-1 max-w-xl mx-auto">
          فیڈ بیک، تجاویز، یا کوئی سوال — ہم سننا چاہتے ہیں!
        </p>
      </div>

      {/* Dark Glassmorphic Card Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border-white/5 bg-slate-900/40 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Name Input */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-white leading-relaxed">
                Your Name <span className="text-blue-400">|</span> <span className="font-urdu text-[11px] text-blue-300">آپ کا نام</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammad Ahmed"
                required
                className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all leading-normal"
              />
            </div>

            {/* 2. Email Input */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-white leading-relaxed">
                Email (Optional) <span className="text-blue-400">|</span> <span className="font-urdu text-[11px] text-blue-300">ای میل (اختیاری)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all leading-normal font-mono"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 3. CV Type Dropdown */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-white leading-relaxed">
                CV Type Used <span className="text-blue-400">|</span> <span className="font-urdu text-[11px] text-blue-300">استعمال کی گئی سی وی</span>
              </label>
              <div className="relative">
                <select
                  value={cvType}
                  onChange={(e) => setCvType(e.target.value)}
                  className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer leading-normal"
                >
                  <option value="ATS CV">ATS CV</option>
                  <option value="Simple Biodata | سادہ بایوڈیٹا">Simple Biodata | سادہ بایوڈیٹا</option>
                  <option value="Student CV | طالب علم سی وی">Student CV | طالب علم سی وی</option>
                  <option value="Freelancer CV">Freelancer CV</option>
                  <option value="Global Pro">Global Pro</option>
                  <option value="Not tried yet | ابھی نہیں بنائی">Not tried yet | ابھی نہیں بنائی</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-blue-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* 4. Interactive 5-Star Rating System */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-white leading-relaxed">
                Rating <span className="text-blue-400">|</span> <span className="font-urdu text-[11px] text-blue-300">ریٹنگ</span> <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-1.5 h-[46px] select-none">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = (hoverRating || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 cursor-pointer transition-transform duration-200 hover:scale-125 focus:outline-none"
                    >
                      <Star
                        size={26}
                        fill={isActive ? "#F59E0B" : "transparent"}
                        stroke={isActive ? "#F59E0B" : "#4B5563"}
                        strokeWidth={2}
                      />
                    </button>
                  );
                })}
                {rating > 0 && (
                  <span className="text-xs font-bold text-amber-500 ml-2">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* 5. Feedback Message Input */}
          <div className="space-y-1.5 text-left">
            <div className="flex justify-between items-baseline">
              <label className="block text-xs font-bold text-white leading-relaxed">
                Your Feedback <span className="text-blue-400">|</span> <span className="font-urdu text-[11px] text-blue-300">آپ کا فیڈ بیک</span> <span className="text-red-500">*</span>
              </label>
              <span className={`text-[10px] ${message.trim().length >= 10 && message.trim().length <= 500 ? "text-blue-400" : "text-gray-500"} font-mono`}>
                {message.trim().length}/500
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              required
              minLength={10}
              maxLength={500}
              placeholder="Write your feedback here... | یہاں اپنا فیڈ بیک لکھیں..."
              className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all leading-relaxed"
            />
            <p className="text-[10px] text-textSecondary italic">
              Min 10 characters, max 500 characters. | کم از کم 10 اور زیادہ سے زیادہ 500 حروف۔
            </p>
          </div>

          {/* 6. Submit Button */}
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold touch-btn py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-blue-500/10 transition-colors cursor-pointer leading-normal text-sm"
          >
            <span>Send Feedback | فیڈ بیک بھیجیں ✓</span>
          </Button>

        </form>
      </div>
    </section>
  );
}
