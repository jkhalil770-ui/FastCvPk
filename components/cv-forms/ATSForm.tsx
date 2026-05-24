"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import VoiceInput from "@/components/ui/VoiceInput";
import { Trash2, Sparkles, Plus } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const months = [
  { value: "Jan", label: "Jan" },
  { value: "Feb", label: "Feb" },
  { value: "Mar", label: "Mar" },
  { value: "Apr", label: "Apr" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "Jul", label: "Jul" },
  { value: "Aug", label: "Aug" },
  { value: "Sep", label: "Sep" },
  { value: "Oct", label: "Oct" },
  { value: "Nov", label: "Nov" },
  { value: "Dec", label: "Dec" }
];

const expYears = Array.from({ length: 2026 - 2000 + 1 }, (_, i) => {
  const y = String(2000 + i);
  return { value: y, label: y };
}).reverse();

const eduYears = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => {
  const y = String(1990 + i);
  return { value: y, label: y };
}).reverse();

const getMonthAndYear = (dateStr: string) => {
  if (!dateStr) return { month: "", year: "" };
  const parts = dateStr.trim().split(" ");
  return {
    month: parts[0] || "",
    year: parts[1] || ""
  };
};

interface ATSFormProps {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
}

/**
 * Form inputs for ATS-friendly standard corporate resume.
 */
export default function ATSForm({ formData, setFormData, step }: ATSFormProps) {
  const { toast } = useToast();
  const [aiLoadingIdx, setAiLoadingIdx] = useState<number | null>(null);
  const [aiFilling, setAiFilling] = useState(false);

  const handleSmartAIFill = async () => {
    const jobTitle = formData.personalInfo.profTitle;
    if (!jobTitle) {
      toast("Professional Title is required!", "warning", "Please type your profession first (e.g. Software Engineer) before calling AI.");
      return;
    }

    setAiFilling(true);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ai-fill",
          jobTitle,
          lang: "en",
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
        experience: formData.experience.map((exp: any, idx: number) => {
          if (idx === 0) {
            return {
              ...exp,
              jobTitle: exp.jobTitle || jobTitle,
              expandedResponsibilities: result.responsibilities || [],
              responsibilities: (result.responsibilities || []).join("\n"),
            };
          }
          return exp;
        }),
      });

      toast("AI se details fill ho chuki hain!", "success", "Gemini has pre-filled your summary, technical skills tags, and first job responsibilities. You can review them in the next steps!");
    } catch (error: any) {
      console.error(error);
      toast("AI Smart Fill failed", "error", error.message || "Failed to query Gemini. Please try again.");
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

  // Experience array manipulation helpers
  const handleExperienceChange = (index: number, field: string, val: any) => {
    const list = [...formData.experience];
    list[index] = { ...list[index], [field]: val };
    setFormData({ ...formData, experience: list });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { id: Math.random().toString(), company: "", jobTitle: "", fromDate: "", toDate: "", currentlyWorking: false, responsibilities: "", expandedResponsibilities: [] },
      ],
    });
  };

  const removeExperience = (index: number) => {
    const list = formData.experience.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, experience: list });
  };

  // AI expansion hook
  const expandWithAI = async (index: number) => {
    const exp = formData.experience[index];
    if (!exp.jobTitle || !exp.responsibilities) {
      toast("Job Title and Key Responsibilities are required!", "warning", "Please provide a job title and some brief notes before calling AI.");
      return;
    }

    setAiLoadingIdx(index);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "responsibilities",
          jobTitle: exp.jobTitle,
          company: exp.company,
          briefText: exp.responsibilities,
          lang: "en",
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const expanded = result.expandedResponsibilities || [];
      handleExperienceChange(index, "expandedResponsibilities", expanded);
      
      toast("AI expansion completed successfully!", "success", "Your job duties were written with action-driven corporate verbs.");
    } catch (error: any) {
      console.error(error);
      toast("AI expansion failed", "error", error.message || "Timeout or system overload. Please try again.");
    } finally {
      setAiLoadingIdx(null);
    }
  };

  // Education array manipulation helpers
  const handleEducationChange = (index: number, field: string, val: string) => {
    const list = [...formData.education];
    list[index] = { ...list[index], [field]: val };
    setFormData({ ...formData, education: list });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { id: Math.random().toString(), degreeName: "", institution: "", year: "", grade: "" },
      ],
    });
  };

  const removeEducation = (index: number) => {
    const list = formData.education.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, education: list });
  };

  // STEP 1: Personal Info
  if (step === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Personal Information</h3>
        <Input
          label="Full Name"
          value={formData.personalInfo.fullName || ""}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          required
        />
        <div>
        <div className="relative">
          <Input
            label="Professional Title (e.g. Senior Software Engineer)"
            value={formData.personalInfo.profTitle || ""}
            onChange={(e) => updatePersonalInfo("profTitle", e.target.value)}
            required
          />
          <VoiceInput 
            onResult={(text) => updatePersonalInfo("profTitle", (formData.personalInfo.profTitle ? formData.personalInfo.profTitle + " " : "") + text)}
            className="bottom-6"
          />
        </div>
          {formData.personalInfo.profTitle && (
            <div className="mt-[-8px] mb-4 flex justify-start">
              <button
                type="button"
                onClick={handleSmartAIFill}
                disabled={aiFilling}
                className="flex items-center gap-1.5 rounded-lg border border-blue-500/20 bg-blue-950/40 hover:bg-blue-950/70 text-blue-300 hover:text-blue-200 text-xs font-semibold px-3 py-1.5 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-500/5 select-none disabled:opacity-50"
              >
                <Sparkles size={13} className={aiFilling ? "animate-spin" : "animate-pulse"} />
                {aiFilling ? "AI pre-filling CV details..." : "✨ AI se Fill Karwao"}
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            value={formData.personalInfo.email || ""}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            required
          />
          <Input
            label="Phone Number"
            value={formData.personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City, Pakistan"
            value={formData.personalInfo.city || ""}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
            required
          />
          <Input
            label="LinkedIn Profile URL (optional)"
            value={formData.personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          />
        </div>
      </div>
    );
  }

  // STEP 2: Experience & Education
  if (step === 2) {
    return (
      <div className="space-y-8">
        {/* Experience Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Work Experience</h3>
            <Button variant="secondary" onClick={addExperience} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Job
            </Button>
          </div>

          {formData.experience.map((exp: any, idx: number) => (
            <div key={exp.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400">Position #{idx + 1}</span>
                {formData.experience.length > 1 && (
                  <button onClick={() => removeExperience(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                />
                <Input
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleExperienceChange(idx, "jobTitle", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Date Dropdowns */}
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      label="From Month"
                      placeholder="Month"
                      value={getMonthAndYear(exp.fromDate).month}
                      onChange={(e) => handleExperienceChange(idx, "fromDate", `${e.target.value} ${getMonthAndYear(exp.fromDate).year}`.trim())}
                      options={months}
                    />
                    <Select
                      label="From Year"
                      placeholder="Year"
                      value={getMonthAndYear(exp.fromDate).year}
                      onChange={(e) => handleExperienceChange(idx, "fromDate", `${getMonthAndYear(exp.fromDate).month} ${e.target.value}`.trim())}
                      options={expYears}
                    />
                  </div>
                </div>

                {/* To Date Dropdowns or Present */}
                <div>
                  {exp.currentlyWorking ? (
                    <div className="w-full">
                      <div className="relative">
                        <div className="peer w-full rounded-lg bg-surface/50 border border-white/5 px-4 py-3 text-textSecondary text-sm outline-none font-inter text-left h-[46px] flex items-center select-none">
                          Present
                        </div>
                        <label className="absolute text-xs duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-surface px-2 left-2 text-textSecondary">
                          To Date
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Select
                        label="To Month"
                        placeholder="Month"
                        value={getMonthAndYear(exp.toDate).month}
                        onChange={(e) => handleExperienceChange(idx, "toDate", `${e.target.value} ${getMonthAndYear(exp.toDate).year}`.trim())}
                        options={months}
                      />
                      <Select
                        label="To Year"
                        placeholder="Year"
                        value={getMonthAndYear(exp.toDate).year}
                        onChange={(e) => handleExperienceChange(idx, "toDate", `${getMonthAndYear(exp.toDate).month} ${e.target.value}`.trim())}
                        options={expYears}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.currentlyWorking}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    handleExperienceChange(idx, "currentlyWorking", checked);
                    if (checked) {
                      handleExperienceChange(idx, "toDate", "Present");
                    } else {
                      handleExperienceChange(idx, "toDate", "");
                    }
                  }}
                  className="rounded border-white/10 bg-surface text-blue-600 focus:ring-0 focus:ring-offset-0"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs text-textSecondary select-none">
                  Currently working in this role
                </label>
              </div>

                <div>
                  <label className="block text-xs text-textSecondary mb-1.5">Responsibilities Notes (Brief words, then let AI polish)</label>
                  <div className="relative">
                    <textarea
                      value={exp.responsibilities}
                      onChange={(e) => handleExperienceChange(idx, "responsibilities", e.target.value)}
                      rows={3}
                      placeholder="e.g. Managed team of 4, rebuilt dashboard with React, reduced loading times by 40%."
                      className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all font-inter leading-relaxed"
                    />
                    <VoiceInput 
                      onResult={(text) => handleExperienceChange(idx, "responsibilities", (exp.responsibilities ? exp.responsibilities + " " : "") + text)}
                    />
                  </div>
                  <div className="mt-2 flex justify-end">
                  <Button
                    variant="secondary"
                    isLoading={aiLoadingIdx === idx}
                    onClick={() => expandWithAI(idx)}
                    className="px-3 py-1.5 text-xs text-blue-400 gap-1"
                  >
                    <Sparkles size={13} />
                    Expand Duties with AI ✨
                  </Button>
                </div>

                {exp.expandedResponsibilities?.length > 0 && (
                  <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">AI Expanded Result:</p>
                    <ul className="list-disc pl-4 text-xs text-textSecondary space-y-1">
                      {exp.expandedResponsibilities.map((item: string, rIdx: number) => (
                        <li key={rIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Education Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Education History</h3>
            <Button variant="secondary" onClick={addEducation} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Degree
            </Button>
          </div>

          {formData.education.map((edu: any, idx: number) => (
            <div key={edu.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400">Degree #{idx + 1}</span>
                {formData.education.length > 1 && (
                  <button onClick={() => removeEducation(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree / Certificate (e.g. BS Software Engineering)"
                  value={edu.degreeName}
                  onChange={(e) => handleEducationChange(idx, "degreeName", e.target.value)}
                />
                <Input
                  label="Institution Name (e.g. FAST NUCES)"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Passing Year"
                  placeholder="Select Year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                  options={eduYears}
                />
                <Input
                  label="Grade / CGPA (e.g. 3.4 CGPA or 85%)"
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(idx, "grade", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 3: Skills
  if (step === 3) {
    const handleSkillChange = (field: string, val: string) => {
      // Split by commas and trim items
      const arr = val.split(",").map(s => s.trim()).filter(Boolean);
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          [field]: arr,
          [`${field}Raw`]: val // Store raw text for input retention
        }
      });
    };

    return (
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Skills & Certifications</h3>
        
        <div className="space-y-1">
          <Input
            label="Technical Skills (Comma separated)"
            value={formData.skills.techSkillsRaw || ""}
            onChange={(e) => handleSkillChange("techSkills", e.target.value)}
            placeholder="React, TypeScript, SQL, Excel, Git"
          />
          <p className="text-[10px] text-textSecondary italic">Separate skills with commas (e.g., Node.js, Python, Figma)</p>
        </div>

        <div className="space-y-1 mt-4">
          <Input
            label="Soft Skills (Comma separated)"
            value={formData.skills.softSkillsRaw || ""}
            onChange={(e) => handleSkillChange("softSkills", e.target.value)}
            placeholder="Communication, Teamwork, Leadership, Problem Solving"
          />
        </div>

        <div className="space-y-1 mt-4">
          <Input
            label="Languages Known (Comma separated)"
            value={formData.skills.languagesRaw || ""}
            onChange={(e) => handleSkillChange("languages", e.target.value)}
            placeholder="English, Urdu, Punjabi"
          />
        </div>
      </div>
    );
  }

  return null;
}
