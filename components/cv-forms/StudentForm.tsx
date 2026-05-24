"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import VoiceInput from "@/components/ui/VoiceInput";
import { Trash2, Sparkles, Plus } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const durationYears = Array.from({ length: 2026 - 2000 + 1 }, (_, i) => {
  const y = String(2000 + i);
  return { value: y, label: y };
}).reverse();

const getDurationYears = (duration: string) => {
  if (!duration) return { fromYear: "", toYear: "", currentlyWorking: false };
  const parts = duration.split(" - ");
  const fromYear = parts[0] || "";
  const toYear = parts[1] || "";
  return {
    fromYear,
    toYear: toYear === "Present" ? "" : toYear,
    currentlyWorking: toYear === "Present"
  };
};

interface StudentFormProps {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
}

/**
 * Student CV Builder Form with language choice (EN / UR) and internship/project tracking.
 */
export default function StudentForm({ formData, setFormData, step }: StudentFormProps) {
  const { toast } = useToast();
  const [aiLoadingIdx, setAiLoadingIdx] = useState<number | null>(null);
  const [aiFilling, setAiFilling] = useState(false);

  // Active student language selection
  const langChoice = formData.personalInfo.languageChoice || "en";
  const isUrdu = langChoice === "ur";

  const handleSmartAIFill = async () => {
    const jobTitle = formData.personalInfo.classProgram;
    if (!jobTitle) {
      toast(isUrdu ? "موجودہ کلاس یا پروگرام لکھیں!" : "Current Program/Class is required!", "warning", isUrdu ? "براہ کرم اے آئی سے بھرنے سے پہلے اپنی کلاس لکھیں۔" : "Please specify your class or degree program first.");
      return;
    }

    setAiFilling(true);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ai-fill",
          jobTitle: `${jobTitle} Student`,
          lang: langChoice,
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      setFormData({
        ...formData,
        generatedSummary: result.summary || "",
        generatedObjective: result.summary || "",
        skills: {
          ...formData.skills,
          techSkills: result.skills || [],
          techSkillsRaw: (result.skills || []).join(", "),
        },
        internships: formData.internships.map((intern: any, idx: number) => {
          if (idx === 0) {
            return {
              ...intern,
              role: intern.role || `${jobTitle} Intern`,
              company: intern.company || (isUrdu ? "تعلیمی پروجیکٹ" : "Academic Project Partner"),
              expandedDetails: result.responsibilities || [],
              details: (result.responsibilities || []).join("\n"),
            };
          }
          return intern;
        }),
      });

      toast(isUrdu ? "اے آئی نے سی وی بھر دیا ہے!" : "AI pre-filled successfully!", "success", isUrdu ? "اے آئی نے آپ کا خلاصہ، مہارتیں اور انٹرنشپ کی تفصیلات بھر دی ہیں!" : "AI has pre-filled your objective, skills, and first internship details.");
    } catch (error: any) {
      console.error(error);
      toast("AI Smart Fill failed", "error", error.message || "Failed to query Gemini.");
    } finally {
      setAiFilling(false);
    }
  };

  const updatePersonalInfo = (field: string, val: string) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [field]: val,
      },
    });
  };

  // Internships array manipulation helpers
  const handleInternshipChange = (index: number, field: string, val: any) => {
    const list = [...formData.internships];
    list[index] = { ...list[index], [field]: val };
    setFormData({ ...formData, internships: list });
  };

  const handleDurationChange = (idx: number, part: "from" | "to" | "current", val: any) => {
    const intern = formData.internships[idx];
    const { fromYear, toYear, currentlyWorking } = getDurationYears(intern.duration);

    let newFrom = fromYear;
    let newTo = toYear;
    let newCurrent = currentlyWorking;

    if (part === "from") {
      newFrom = val;
    } else if (part === "to") {
      newTo = val;
      newCurrent = false;
    } else if (part === "current") {
      newCurrent = val;
      if (newCurrent) {
        newTo = "Present";
      } else {
        newTo = "";
      }
    }

    let newDuration = "";
    if (newCurrent) {
      newDuration = newFrom ? `${newFrom} - Present` : "Present";
    } else {
      if (newFrom && newTo) {
        newDuration = `${newFrom} - ${newTo}`;
      } else if (newFrom) {
        newDuration = newFrom;
      } else if (newTo) {
        newDuration = newTo;
      }
    }

    handleInternshipChange(idx, "duration", newDuration);
  };

  const addInternship = () => {
    setFormData({
      ...formData,
      internships: [
        ...formData.internships,
        { id: Math.random().toString(), company: "", role: "", duration: "", details: "", expandedDetails: [] },
      ],
    });
  };

  const removeInternship = (index: number) => {
    const list = formData.internships.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, internships: list });
  };

  // AI helper for student internships
  const expandInternshipWithAI = async (index: number) => {
    const intern = formData.internships[index];
    if (!intern.role || !intern.details) {
      toast(isUrdu ? "ادارہ اور تفصیل لکھنا ضروری ہے!" : "Role and details notes are required!", "warning");
      return;
    }

    setAiLoadingIdx(index);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "responsibilities",
          jobTitle: `Intern ${intern.role}`,
          company: intern.company || "Academic Partner",
          briefText: intern.details,
          lang: langChoice,
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const expanded = result.expandedResponsibilities || [];
      handleInternshipChange(index, "expandedDetails", expanded);
      
      toast(isUrdu ? "اے آئی نے کامیابی سے تفصیل تیار کر دی!" : "AI expansion finished!", "success");
    } catch (error: any) {
      console.error(error);
      toast("AI failed", "error", error.message);
    } finally {
      setAiLoadingIdx(null);
    }
  };

  // Tag inputs helper
  const handleTagChange = (field: string, val: string) => {
    const list = val.split(",").map(s => s.trim()).filter(Boolean);
    setFormData({
      ...formData,
      skills: {
        ...formData.skills,
        [field]: list,
        [`${field}Raw`]: val
      }
    });
  };

  // Projects array updates
  const handleProjectChange = (index: number, field: string, val: any) => {
    const list = [...formData.projects];
    list[index] = { ...list[index], [field]: val };
    setFormData({ ...formData, projects: list });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { id: Math.random().toString(), projectName: "", projDesc: "", projUrl: "" },
      ],
    });
  };

  const removeProject = (index: number) => {
    const list = formData.projects.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, projects: list });
  };

  // STEP 1: Personal Info
  if (step === 1) {
    return (
      <div className="space-y-4">
        {/* Language selector for student CV */}
        <div className="glass-panel p-4 rounded-xl border-white/10 flex items-center justify-between mb-4">
          <span className="text-xs text-white font-semibold">Choose Student CV Language:</span>
          <div className="flex gap-2">
            <button
              onClick={() => updatePersonalInfo("languageChoice", "en")}
              className={`px-3 py-1 rounded text-xs font-bold font-inter ${langChoice === "en" ? "bg-blue-600 text-white" : "bg-white/5 text-textSecondary"}`}
            >
              English
            </button>
            <button
              onClick={() => updatePersonalInfo("languageChoice", "ur")}
              className={`px-3 py-1 rounded text-xs font-bold font-urdu leading-normal ${langChoice === "ur" ? "bg-blue-600 text-white" : "bg-white/5 text-textSecondary"}`}
            >
              اردو
            </button>
          </div>
        </div>

        <h3 className={`text-base font-bold text-white mb-2 ${isUrdu ? "font-urdu text-right" : "font-inter"}`}>
          {isUrdu ? "ذاتی معلومات" : "Personal Info"}
        </h3>

        <Input
          label={isUrdu ? "نام (مکمل نام)" : "Full Name"}
          value={formData.personalInfo.fullName || ""}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          isUrdu={isUrdu}
          required
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={isUrdu ? "ای میل ایڈریس" : "Email Address"}
            type="email"
            value={formData.personalInfo.email || ""}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            required
          />
          <Input
            label={isUrdu ? "فون نمبر" : "Phone Number"}
            value={formData.personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={isUrdu ? "ادارے کا نام (مثلاً یونیورسٹی کا نام)" : "Institution Name"}
            value={formData.personalInfo.schoolName || ""}
            onChange={(e) => updatePersonalInfo("schoolName", e.target.value)}
            isUrdu={isUrdu}
            required
          />
          <div>
            <div className="relative">
              <Input
                label={isUrdu ? "موجودہ کلاس / پروگرام (جیسے میٹرک یا بی ایس سی ایس)" : "Current Program / Class"}
                value={formData.personalInfo.classProgram || ""}
                onChange={(e) => updatePersonalInfo("classProgram", e.target.value)}
                isUrdu={isUrdu}
              />
              <VoiceInput 
                onResult={(text) => updatePersonalInfo("classProgram", (formData.personalInfo.classProgram ? formData.personalInfo.classProgram + " " : "") + text)}
                className="bottom-6"
              />
            </div>
            {formData.personalInfo.classProgram && (
              <div className={`mt-[-8px] mb-4 flex ${isUrdu ? "justify-end" : "justify-start"}`}>
                <button
                  type="button"
                  onClick={handleSmartAIFill}
                  disabled={aiFilling}
                  className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-950/40 hover:bg-blue-950/70 text-blue-300 hover:text-blue-200 text-xs font-semibold px-3 py-1.5 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/5 select-none disabled:opacity-50"
                >
                  <Sparkles size={13} className={aiFilling ? "animate-spin" : "animate-pulse"} />
                  {aiFilling ? (isUrdu ? "اے آئی لکھ رہا ہے..." : "AI pre-filling CV...") : (isUrdu ? "✨ اے آئی سے بھریں" : "✨ AI se Fill Karwao")}
                </button>
              </div>
            )}
          </div>
        </div>
        <Input
          label={isUrdu ? "شہر، پاکستان" : "City, Pakistan"}
          value={formData.personalInfo.city || ""}
          onChange={(e) => updatePersonalInfo("city", e.target.value)}
          isUrdu={isUrdu}
          required
        />
      </div>
    );
  }

  // STEP 2: Education, Internships & Academic Projects
  if (step === 2) {
    return (
      <div className="space-y-8">
        {/* Academic Profile */}
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-4">
          <h3 className={`text-sm font-bold text-white mb-2 ${isUrdu ? "font-urdu text-right" : ""}`}>
            {isUrdu ? "تعلیمی ریکارڈ (تازہ ترین سے شروع کریں)" : "Academic Record"}
          </h3>
          <Input
            label={isUrdu ? "پچھلا تعلیمی ریکارڈ (جیسے میٹرک، ایف ایس سی، یونیورسٹی، سال اور نمبر)" : "Latest Education Details (e.g. FSc Pre-Eng, 2022, 920/1100)"}
            value={formData.personalInfo.studentEducation || ""}
            onChange={(e) => updatePersonalInfo("studentEducation", e.target.value)}
            isUrdu={isUrdu}
            placeholder="FAST University (BS CS) 2022-2026, FSc Pre-Eng (GC Lahore) 2020-2022"
          />
        </div>

        {/* Internships */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold text-white ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "انٹرنشپ (اگر کوئی ہو)" : "Internships (if any)"}
            </h3>
            <Button variant="secondary" onClick={addInternship} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> {isUrdu ? "انٹرنشپ شامل کریں" : "Add Internship"}
            </Button>
          </div>

          {formData.internships.map((intern: any, idx: number) => (
            <div key={intern.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400">{isUrdu ? `انٹرنشپ #${idx + 1}` : `Internship #${idx + 1}`}</span>
                {formData.internships.length > 1 && (
                  <button onClick={() => removeInternship(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={isUrdu ? "کمپنی / ادارہ" : "Company / Organisation"}
                  value={intern.company}
                  onChange={(e) => handleInternshipChange(idx, "company", e.target.value)}
                  isUrdu={isUrdu}
                />
                <Input
                  label={isUrdu ? "عہدہ (مثلاً گرافک ڈیزائنر انٹرن)" : "Role (e.g. Intern Designer)"}
                  value={intern.role}
                  onChange={(e) => handleInternshipChange(idx, "role", e.target.value)}
                  isUrdu={isUrdu}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Year Dropdown */}
                <Select
                  label={isUrdu ? "کب سے (From Year)" : "From Year"}
                  placeholder={isUrdu ? "سال منتخب کریں" : "Select Year"}
                  value={getDurationYears(intern.duration).fromYear}
                  onChange={(e) => handleDurationChange(idx, "from", e.target.value)}
                  options={durationYears}
                />

                {/* To Year Dropdown or Present */}
                <div>
                  {getDurationYears(intern.duration).currentlyWorking ? (
                    <div className="w-full">
                      <div className="relative">
                        <div className="peer w-full rounded-lg bg-surface/50 border border-white/5 px-4 py-3 text-textSecondary text-sm outline-none font-inter text-left h-[46px] flex items-center select-none">
                          {isUrdu ? "حالیہ (Present)" : "Present"}
                        </div>
                        <label className="absolute text-xs duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface px-2 left-2 text-textSecondary">
                          {isUrdu ? "کب تک (To Year)" : "To Year"}
                        </label>
                      </div>
                    </div>
                  ) : (
                    <Select
                      label={isUrdu ? "کب تک (To Year)" : "To Year"}
                      placeholder={isUrdu ? "سال منتخب کریں" : "Select Year"}
                      value={getDurationYears(intern.duration).toYear}
                      onChange={(e) => handleDurationChange(idx, "to", e.target.value)}
                      options={durationYears}
                    />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${intern.id}`}
                  checked={getDurationYears(intern.duration).currentlyWorking}
                  onChange={(e) => handleDurationChange(idx, "current", e.target.checked)}
                  className="rounded border-white/10 bg-surface text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor={`current-${intern.id}`} className={`text-xs text-textSecondary select-none ${isUrdu ? "font-urdu" : ""}`}>
                  {isUrdu ? "ابھی بھی یہاں کام کر رہے ہیں" : "Currently working in this role"}
                </label>
              </div>

              <div>
                <label className={`block text-xs text-textSecondary mb-1.5 ${isUrdu ? "font-urdu text-right" : ""}`}>
                  {isUrdu ? "کیا کام سیکھا / کیا ذمہ داریاں تھیں (مختصراً لکھیں)" : "Description / Achievements (Brief, AI will expand)"}
                </label>
                <div className="relative">
                  <textarea
                    value={intern.details}
                    onChange={(e) => handleInternshipChange(idx, "details", e.target.value)}
                    rows={3}
                    dir={isUrdu ? "rtl" : "ltr"}
                    placeholder={isUrdu ? "مثال: کسٹمرز کو ہینڈل کیا..." : "e.g. Assisted in organizing events..."}
                    className={`w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all leading-relaxed ${isUrdu ? "font-urdu text-right" : "font-inter"}`}
                  />
                  <VoiceInput 
                    onResult={(text) => handleInternshipChange(idx, "details", (intern.details ? intern.details + " " : "") + text)}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="secondary"
                    isLoading={aiLoadingIdx === idx}
                    onClick={() => expandInternshipWithAI(idx)}
                    className="px-3 py-1.5 text-xs text-blue-400 gap-1"
                  >
                    <Sparkles size={13} className={aiLoadingIdx === idx ? "animate-spin" : ""} />
                    {aiLoadingIdx === idx ? "AI Generating..." : (isUrdu ? "اے آئی سے بہتر بنائیں" : "Improve with AI")}
                  </Button>
                </div>

                {intern.expandedDetails?.length > 0 && (
                  <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">{isUrdu ? "اے آئی کا تیار کردہ نتیجہ:" : "AI Expanded Result:"}</p>
                    <ul className={`list-disc pl-4 text-xs text-textSecondary space-y-1 ${isUrdu ? "font-urdu text-right leading-loose pr-4" : ""}`}>
                      {intern.expandedDetails.map((item: string, rIdx: number) => (
                        <li key={rIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-base font-bold text-white ${isUrdu ? "font-urdu" : ""}`}>
              {isUrdu ? "اکیڈمک پروجیکٹس" : "Academic Projects"}
            </h3>
            <Button variant="secondary" onClick={addProject} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> {isUrdu ? "پروجیکٹ شامل کریں" : "Add Project"}
            </Button>
          </div>

          {formData.projects.map((proj: any, idx: number) => (
            <div key={proj.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400">{isUrdu ? `پروجیکٹ #${idx + 1}` : `Project #${idx + 1}`}</span>
                {formData.projects.length > 1 && (
                  <button onClick={() => removeProject(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={isUrdu ? "پروجیکٹ کا نام" : "Project Name"}
                  value={proj.projectName}
                  onChange={(e) => handleProjectChange(idx, "projectName", e.target.value)}
                  isUrdu={isUrdu}
                />
                <Input
                  label={isUrdu ? "پروجیکٹ کا لنک (اگر ہو)" : "Project URL (optional)"}
                  value={proj.projUrl}
                  onChange={(e) => handleProjectChange(idx, "projUrl", e.target.value)}
                />
              </div>
              <div className="relative">
                <Input
                  label={isUrdu ? "پروجیکٹ کی تفصیل (صرف ایک دو لائنوں میں بتائیں)" : "Brief Project Description"}
                  value={proj.projDesc}
                  onChange={(e) => handleProjectChange(idx, "projDesc", e.target.value)}
                  isUrdu={isUrdu}
                />
                <VoiceInput 
                  onResult={(text) => handleProjectChange(idx, "projDesc", (proj.projDesc ? proj.projDesc + " " : "") + text)}
                  className="bottom-6"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 3: Skills, Awards & Extra
  if (step === 3) {
    return (
      <div className="space-y-4">
        <h3 className={`text-base font-bold text-white mb-2 ${isUrdu ? "font-urdu text-right" : ""}`}>
          {isUrdu ? "مہارتیں اور سرگرمیاں" : "Skills & Extracurriculars"}
        </h3>
        
        <Input
          label={isUrdu ? "ٹیکنیکل مہارتیں (کومہ کے ساتھ الگ کریں)" : "Technical Skills (Comma separated)"}
          value={formData.skills.techSkillsRaw || ""}
          onChange={(e) => handleTagChange("techSkills", e.target.value)}
          isUrdu={isUrdu}
          placeholder="Java, Python, Canva, Video Editing"
        />

        <Input
          label={isUrdu ? "سافٹ مہارتیں (کومہ کے ساتھ الگ کریں)" : "Soft Skills (Comma separated)"}
          value={formData.skills.softSkillsRaw || ""}
          onChange={(e) => handleTagChange("softSkills", e.target.value)}
          isUrdu={isUrdu}
          placeholder="Communication, Teamwork, Presentation"
        />

        <Input
          label={isUrdu ? "اضافی سرگرمیاں اور کامیابیاں" : "Extracurricular Activities / Awards"}
          value={formData.skills.studentExtra || ""}
          onChange={(e) => updatePersonalInfo("studentExtra", e.target.value)}
          isUrdu={isUrdu}
          placeholder="Gold medalist in Badminton 2024, Participant in TechFest"
        />
      </div>
    );
  }

  return null;
}
