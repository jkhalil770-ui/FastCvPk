"use client";

import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import VoiceInput from "@/components/ui/VoiceInput";
import { Trash2, Sparkles, Plus, X } from "lucide-react";
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

interface GlobalProFormProps {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
}

/**
  * Form inputs for Premium International & Remote "Global Pro" CV Template.
  */
export default function GlobalProForm({ formData, setFormData, step }: GlobalProFormProps) {
  const { toast } = useToast();
  const [aiLoadingIdx, setAiLoadingIdx] = useState<number | null>(null);
  const [aiProjLoadingIdx, setAiProjLoadingIdx] = useState<number | null>(null);
  const [aiFilling, setAiFilling] = useState(false);

  // Prefill prefilled values if empty
  useEffect(() => {
    const p = formData.personalInfo;
    let changed = false;
    const updatedPersonalInfo = { ...p };

    if (!p.timeZone) {
      updatedPersonalInfo.timeZone = "PKT (UTC+5)";
      changed = true;
    }
    if (!p.workAuth) {
      updatedPersonalInfo.workAuth = "Eligible to work remotely for international companies";
      changed = true;
    }
    if (!p.availability) {
      updatedPersonalInfo.availability = "[Full-time Remote]";
      changed = true;
    }

    if (changed) {
      setFormData({
        ...formData,
        personalInfo: updatedPersonalInfo
      });
    }
  }, []);

  const handleSmartAIFill = async () => {
    const jobTitle = formData.personalInfo.profTitle;
    if (!jobTitle) {
      toast("Professional Title is required!", "warning", "Please type your profession first (e.g. Senior Backend Engineer) before calling AI.");
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
          cvType: "global-pro" // Ensure Global Pro context
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      // Distribute tags nicely
      const allSkills = result.skills || [];
      const techSkills = allSkills.slice(0, Math.ceil(allSkills.length / 2));
      const tools = allSkills.slice(Math.ceil(allSkills.length / 2));

      setFormData({
        ...formData,
        generatedSummary: result.summary || "",
        generatedObjective: result.summary || "",
        skills: {
          ...formData.skills,
          techSkills: techSkills,
          techSkillsRaw: techSkills.join(", "),
          tools: tools,
          toolsRaw: tools.join(", "),
          languages: ["Urdu", "English"],
          languagesRaw: "Urdu, English",
          certifications: ["Google Project Management Certificate", "AWS Certified Cloud Practitioner"],
          certificationsRaw: "Google Project Management Certificate, AWS Certified Cloud Practitioner"
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

      toast("AI se details fill ho chuki hain!", "success", "Gemini has pre-filled remote-optimized summary, skills, tools, and experience bullet points.");
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

  // AI expansion for job responsibilities
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
          cvType: "global-pro" // Optimize for remote/int'l jobs
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const expanded = result.expandedResponsibilities || [];
      handleExperienceChange(index, "expandedResponsibilities", expanded);
      
      toast("AI expansion completed!", "success", "Responsibilities enhanced with action verbs and remote-first metrics.");
    } catch (error: any) {
      console.error(error);
      toast("AI expansion failed", "error", error.message || "Timeout or system overload. Please try again.");
    } finally {
      setAiLoadingIdx(null);
    }
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
        { id: Math.random().toString(), projectName: "", projDesc: "", projUrl: "", resultsAchieved: "", expandedBulletPoints: [] },
      ],
    });
  };

  const removeProject = (index: number) => {
    const list = formData.projects.filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, projects: list });
  };

  // Expand key projects via AI
  const expandProjectWithAI = async (index: number) => {
    const proj = formData.projects[index];
    if (!proj.projectName || !proj.projDesc) {
      toast("Project Name and Brief Description are required!", "warning", "Provide name and notes first.");
      return;
    }

    setAiProjLoadingIdx(index);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "responsibilities",
          jobTitle: `Lead developer for ${proj.projectName}`,
          company: "Remote Key Project",
          briefText: proj.projDesc,
          lang: "en",
          cvType: "global-pro"
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const expanded = result.expandedResponsibilities || [];
      handleProjectChange(index, "expandedBulletPoints", expanded);
      
      toast("AI project expansion finished!", "success", "Key results updated successfully.");
    } catch (error: any) {
      console.error(error);
      toast("AI project expansion failed", "error", error.message);
    } finally {
      setAiProjLoadingIdx(null);
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

  // STEP 1: Personal Info & Remote Settings
  if (step === 1) {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-white">Global Pro: Profile & Remote Settings</h3>
          <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black uppercase px-2 py-0.5 rounded tracking-widest animate-pulse">
            Premium
          </span>
        </div>

        {/* Circular Photo Upload Field (Optional) */}
        <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-dashed border-blue-500/20 bg-blue-950/10 space-y-3">
          <div className="relative w-[120px] h-[120px]">
            {formData.personalInfo.photo ? (
              <div className="relative w-full h-full">
                <img
                  src={formData.personalInfo.photo}
                  alt="Profile Preview"
                  className="w-full h-full rounded-full object-cover border-2 border-[#3B82F6]"
                />
                <button
                  type="button"
                  onClick={() => updatePersonalInfo("photo", "")}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-transform active:scale-90 hover:scale-105"
                  title="Remove Photo"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full rounded-full border-2 border-dashed border-[#3B82F6] hover:border-blue-400 bg-surface/40 hover:bg-surface/70 transition-all cursor-pointer text-center p-2">
                <span className="text-xl">📷</span>
                <span className="text-[10px] font-black text-blue-400 leading-tight mt-1 whitespace-pre-line">
                  {"Photo Upload\n(Optional)"}
                </span>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 2 * 1024 * 1024) {
                      toast("File size too large!", "warning", "Maximum photo upload size is 2MB.");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      updatePersonalInfo("photo", reader.result as string);
                      toast("Photo successfully uploaded!", "success", "Your profile photo is now added to the CV.");
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <span className="text-[10px] font-semibold text-textSecondary text-center leading-normal">
            International jobs mein photo optional hoti hai
          </span>
        </div>

        <Input
          label="Full Name"
          value={formData.personalInfo.fullName || ""}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          required
        />

        <div>
          <div className="relative">
            <Input
              label="Professional Title (e.g. Senior Backend Architect / Lead Product Designer)"
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
            label="Phone Number (e.g., +92 300 1234567)"
            value={formData.personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            placeholder="+92 300 1234567"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City, Pakistan"
            value={formData.personalInfo.city || ""}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
            placeholder="e.g. Islamabad"
            required
          />
          <Input
            label="LinkedIn URL"
            value={formData.personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
            placeholder="linkedin.com/in/username"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Portfolio/Website URL (optional)"
            value={formData.personalInfo.portfolio || ""}
            onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
            placeholder="portfolio.com"
          />
          <Input
            label="GitHub Profile URL (optional)"
            value={formData.personalInfo.github || ""}
            onChange={(e) => updatePersonalInfo("github", e.target.value)}
            placeholder="github.com/username"
          />
        </div>

        {/* Global Pro Specific Fields */}
        <div className="glass-panel p-5 rounded-xl border border-blue-500/20 bg-blue-950/20 space-y-4">
          <h4 className="text-xs font-black uppercase text-blue-400 tracking-wider">Remote & International Settings</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Years of Experience"
              type="number"
              value={formData.personalInfo.yearsOfExp || ""}
              onChange={(e) => updatePersonalInfo("yearsOfExp", e.target.value)}
              placeholder="e.g. 5"
              required
            />
            
            <div className="flex flex-col space-y-1">
              <label className="text-xs text-textSecondary font-semibold">Availability</label>
              <select
                value={formData.personalInfo.availability || "[Full-time Remote]"}
                onChange={(e) => updatePersonalInfo("availability", e.target.value)}
                className="w-full h-[42px] rounded-lg bg-surface border border-white/10 px-4 text-white text-sm outline-none focus:border-blue-500 transition-all font-inter"
              >
                <option value="[Full-time Remote]">Full-time Remote</option>
                <option value="[Part-time Remote]">Part-time Remote</option>
                <option value="[Freelance/Contract]">Freelance/Contract</option>
                <option value="[Open to Relocation]">Open to Relocation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Expected Salary (optional)"
              value={formData.personalInfo.expectedSalary || ""}
              onChange={(e) => updatePersonalInfo("expectedSalary", e.target.value)}
              placeholder="e.g., USD $3,500/month"
            />
            <Input
              label="Time Zone"
              value={formData.personalInfo.timeZone || "PKT (UTC+5)"}
              onChange={(e) => updatePersonalInfo("timeZone", e.target.value)}
              required
            />
          </div>

          <Input
            label="Work Authorization / Status"
            value={formData.personalInfo.workAuth || "Eligible to work remotely for international companies"}
            onChange={(e) => updatePersonalInfo("workAuth", e.target.value)}
            required
          />
        </div>
      </div>
    );
  }

  // STEP 2: Experience & Projects
  if (step === 2) {
    return (
      <div className="space-y-8">
        {/* Work Experience */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Professional Experience</h3>
            <Button variant="secondary" onClick={addExperience} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Job
            </Button>
          </div>

          {formData.experience.map((exp: any, idx: number) => (
            <div key={exp.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400 font-inter">Position #{idx + 1}</span>
                {formData.experience.length > 1 && (
                  <button onClick={() => removeExperience(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company Name | City, Country"
                  value={exp.company}
                  onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                  placeholder="e.g. Acme Corp | San Francisco, USA"
                />
                <Input
                  label="Job Title"
                  value={exp.jobTitle}
                  onChange={(e) => handleExperienceChange(idx, "jobTitle", e.target.value)}
                  placeholder="e.g. Lead Backend Engineer"
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
                <label htmlFor={`current-${exp.id}`} className="text-xs text-textSecondary select-none font-semibold">
                  Currently working in this role
                </label>
              </div>

              <div>
                <label className="block text-xs text-textSecondary mb-1.5 font-semibold">
                  Responsibilities & Quantified Achievements (AI will expand)
                </label>
                <div className="relative">
                  <textarea
                    value={exp.responsibilities}
                    onChange={(e) => handleExperienceChange(idx, "responsibilities", e.target.value)}
                    rows={3}
                    placeholder="e.g. Managed team of 8 people. Increased sales by 40%. Reduced latency by 200ms."
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
                    className="px-3 py-1.5 text-xs text-blue-400 gap-1 font-bold"
                  >
                    <Sparkles size={13} />
                    Expand & Quantify with AI ✨
                  </Button>
                </div>

                {exp.expandedResponsibilities?.length > 0 && (
                  <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">AI Quantified Bullets:</p>
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

        {/* Notable Remote-friendly Projects */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Key Technical Projects</h3>
            <Button variant="secondary" onClick={addProject} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Project
            </Button>
          </div>

          {formData.projects.map((proj: any, idx: number) => (
            <div key={proj.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400 font-inter font-black">Project #{idx + 1}</span>
                {formData.projects.length > 1 && (
                  <button onClick={() => removeProject(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Project Name"
                  value={proj.projectName}
                  onChange={(e) => handleProjectChange(idx, "projectName", e.target.value)}
                  placeholder="e.g. Decentralized File Store"
                />
                <Input
                  label="Live Link / GitHub Repo Link"
                  value={proj.projUrl}
                  onChange={(e) => handleProjectChange(idx, "projUrl", e.target.value)}
                  placeholder="github.com/username/project"
                />
              </div>

              <Input
                label="Tech Stack used (Comma separated or text)"
                value={proj.resultsAchieved || ""}
                onChange={(e) => handleProjectChange(idx, "resultsAchieved", e.target.value)}
                placeholder="e.g. Next.js, Rust, AWS, Web3"
              />

              <div>
                <label className="block text-xs text-textSecondary mb-1.5 font-semibold">
                  What you built, impact, and results (Brief keywords, AI will format to bullet points)
                </label>
                <div className="relative">
                  <textarea
                    value={proj.projDesc}
                    onChange={(e) => handleProjectChange(idx, "projDesc", e.target.value)}
                    rows={3}
                    placeholder="e.g. Built high throughput store. Reduced AWS costs by $10,000. Optimized queries."
                    className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all font-inter leading-relaxed"
                  />
                  <VoiceInput 
                    onResult={(text) => handleProjectChange(idx, "projDesc", (proj.projDesc ? proj.projDesc + " " : "") + text)}
                  />
                </div>
                
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="secondary"
                    isLoading={aiProjLoadingIdx === idx}
                    onClick={() => expandProjectWithAI(idx)}
                    className="px-3 py-1.5 text-xs text-blue-400 gap-1 font-bold"
                  >
                    <Sparkles size={13} />
                    Polish Project with AI ✨
                  </Button>
                </div>

                {proj.expandedBulletPoints?.length > 0 && (
                  <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">AI Formatted Bullet Points:</p>
                    <ul className="list-disc pl-4 text-xs text-textSecondary space-y-1">
                      {proj.expandedBulletPoints.map((bullet: string, bIdx: number) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 3: Education, Skills, Languages, Tools & Certs
  if (step === 3) {
    return (
      <div className="space-y-8">
        {/* Education Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Education</h3>
            <Button variant="secondary" onClick={addEducation} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Education
            </Button>
          </div>

          {formData.education.map((edu: any, idx: number) => (
            <div key={edu.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400 font-inter">Degree #{idx + 1}</span>
                {formData.education.length > 1 && (
                  <button onClick={() => removeEducation(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Degree, Major"
                  value={edu.degreeName}
                  onChange={(e) => handleEducationChange(idx, "degreeName", e.target.value)}
                  placeholder="e.g. BS Computer Science"
                  required
                />
                <Input
                  label="University Name"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(idx, "institution", e.target.value)}
                  placeholder="e.g. FAST-NUCES"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Passing Year"
                  placeholder="Select Year"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                  options={eduYears}
                  required
                />
                <Input
                  label="CGPA (if above 3.0) or Grade"
                  value={edu.grade}
                  onChange={(e) => handleEducationChange(idx, "grade", e.target.value)}
                  placeholder="e.g. 3.65 CGPA"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Skills & Badges */}
        <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Skills & Professional Badges</h3>
          
          <Input
            label="Expertise & Technical Skills (Comma separated)"
            value={formData.skills.techSkillsRaw || ""}
            onChange={(e) => handleTagChange("techSkills", e.target.value)}
            placeholder="React, TypeScript, AWS, Node.js, Kubernetes"
          />

          <Input
            label="Tools & Software (Comma separated)"
            value={formData.skills.toolsRaw || ""}
            onChange={(e) => handleTagChange("tools", e.target.value)}
            placeholder="GitHub, Slack, Jira, Zoom, VS Code"
          />

          <Input
            label="Languages Spoken (Urdu & English pre-filled, add more)"
                    value={formData.skills.languagesRaw || "Urdu, English"}
            onChange={(e) => handleTagChange("languages", e.target.value)}
            placeholder="Urdu, English, Arabic"
          />

          {/* Certifications Dynamic List */}
          <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4 mb-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-blue-400 font-inter">Certifications & Licenses</h4>
              <Button
                variant="secondary"
                type="button"
                onClick={() => {
                  const list = [...(formData.skills.certifications || [])];
                  list.push("New Certificate (Platform, 2024)");
                  setFormData({
                    ...formData,
                    skills: {
                      ...formData.skills,
                      certifications: list,
                      certificationsRaw: list.join(", ")
                    }
                  });
                }}
                className="px-2 py-1.5 touch-btn text-[10px] gap-1 bg-blue-950/20 border-blue-500/20 text-blue-300"
              >
                <Plus size={10} /> Add Cert
              </Button>
            </div>

            {(formData.skills.certifications || []).length === 0 && (
              <p className="text-xs text-textSecondary italic">No certifications added. Click "Add Cert" to add one.</p>
            )}

            {(formData.skills.certifications || []).map((cert: string, idx: number) => {
              const match = cert.match(/^(.*?)\s*\((.*?)\s*,\s*(.*?)\)$/);
              let name = cert;
              let platform = "";
              let year = "";
              if (match) {
                name = match[1];
                platform = match[2];
                year = match[3];
              }

              const updateCert = (field: "name" | "platform" | "year", val: string) => {
                const list = [...formData.skills.certifications];
                let n = name, p = platform, y = year;
                if (field === "name") n = val;
                if (field === "platform") p = val;
                if (field === "year") y = val;

                // Format as "Name (Platform, Year)"
                const formatted = p ? `${n} (${p}, ${y})` : y ? `${n} (${y})` : n;
                list[idx] = formatted;

                setFormData({
                  ...formData,
                  skills: {
                    ...formData.skills,
                    certifications: list,
                    certificationsRaw: list.join(", ")
                  }
                });
              };

              const removeCert = () => {
                const list = formData.skills.certifications.filter((_: any, i: number) => i !== idx);
                setFormData({
                  ...formData,
                  skills: {
                    ...formData.skills,
                    certifications: list,
                    certificationsRaw: list.join(", ")
                  }
                });
              };

              return (
                <div key={idx} className="flex gap-2 items-start border-b border-white/5 pb-3 last:border-0 last:pb-0 mb-3 last:mb-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 flex-1">
                    <Input
                      label="Certificate Name"
                      value={name}
                      onChange={(e) => updateCert("name", e.target.value)}
                      placeholder="e.g. AWS Cloud Practitioner"
                      className="mb-0"
                    />
                    <Input
                      label="Platform / Issuer"
                      value={platform}
                      onChange={(e) => updateCert("platform", e.target.value)}
                      placeholder="e.g. Coursera / AWS"
                      className="mb-0"
                    />
                    <Select
                      label="Year"
                      placeholder="Select Year"
                      value={year}
                      onChange={(e) => updateCert("year", e.target.value)}
                      options={expYears}
                      className="mb-0"
                    />
                  </div>
                  <button type="button" onClick={removeCert} className="text-red-400 hover:text-red-300 mt-3.5">
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>

          <Input
            label="Achievements & Awards (optional, comma-separated)"
            value={formData.skills.achievementsRaw || ""}
            onChange={(e) => handleTagChange("achievements", e.target.value)}
            placeholder="Gold Medalist (FAST University, 2023), Best Innovation Award (2024)"
          />
        </div>
      </div>
    );
  }

  return null;
}
