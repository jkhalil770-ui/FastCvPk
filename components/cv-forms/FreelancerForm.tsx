"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import VoiceInput from "@/components/ui/VoiceInput";
import { Trash2, Sparkles, Plus } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface FreelancerFormProps {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
}

/**
 * Freelancer CV input form. Focuses on portfolios, tech stack tags, and projects.
 */
export default function FreelancerForm({ formData, setFormData, step }: FreelancerFormProps) {
  const { toast } = useToast();
  const [aiLoadingIdx, setAiLoadingIdx] = useState<number | null>(null);
  const [aiFilling, setAiFilling] = useState(false);

  const handleSmartAIFill = async () => {
    const jobTitle = formData.personalInfo.profTitle;
    if (!jobTitle) {
      toast("Professional Service title is required!", "warning", "Please specify your specialized freelance domain first (e.g. Web Developer) before calling AI.");
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

      // Divide half of the skills for services offered, and the rest for tech stack / tools
      const generatedSkills = result.skills || [];
      const servicesHalf = generatedSkills.slice(0, Math.ceil(generatedSkills.length / 2));
      const techStackHalf = generatedSkills.slice(Math.ceil(generatedSkills.length / 2));

      setFormData({
        ...formData,
        generatedSummary: result.summary || "",
        generatedObjective: result.summary || "",
        skills: {
          ...formData.skills,
          services: servicesHalf,
          servicesRaw: servicesHalf.join(", "),
          techStack: techStackHalf,
          techStackRaw: techStackHalf.join(", "),
          techSkills: generatedSkills,
          techSkillsRaw: generatedSkills.join(", "),
        },
        projects: formData.projects.map((proj: any, idx: number) => {
          if (idx === 0) {
            return {
              ...proj,
              projectName: proj.projectName || `Premium ${jobTitle} Solution`,
              expandedBulletPoints: result.responsibilities || [],
              projDesc: (result.responsibilities || []).join("\n"),
            };
          }
          return proj;
        }),
      });

      toast("AI se details fill ho chuki hain!", "success", "AI has beautifully pre-filled your summary profile, services offered, tech tools, and notable freelance accomplishments.");
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

  // Expand Freelancer project accomplishments via AI
  const expandProjectWithAI = async (index: number) => {
    const proj = formData.projects[index];
    if (!proj.projectName || !proj.projDesc) {
      toast("Project Name and Brief Description are required!", "warning");
      return;
    }

    setAiLoadingIdx(index);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "responsibilities",
          jobTitle: `Lead developer for ${proj.projectName}`,
          company: "Freelance Project",
          briefText: proj.projDesc,
          lang: "en",
        }),
      });

      const result = await response.json();
      if (result.error) throw new Error(result.error);

      const expanded = result.expandedResponsibilities || [];
      handleProjectChange(index, "expandedBulletPoints", expanded);
      
      toast("AI project expansion finished!", "success", "Highlights loaded with quantifiable freelance outcome statements.");
    } catch (error: any) {
      console.error(error);
      toast("AI project expansion failed", "error", error.message);
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

  // STEP 1: Personal Info
  if (step === 1) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Freelancer Profile Info</h3>
        <Input
          label="Full Name"
          value={formData.personalInfo.fullName || ""}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          required
        />
        <div>
          <Input
            label="Professional Service (e.g. Full Stack Web Developer)"
            value={formData.personalInfo.profTitle || ""}
            onChange={(e) => updatePersonalInfo("profTitle", e.target.value)}
            required
          />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="City, Pakistan"
            value={formData.personalInfo.city || ""}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
            required
          />
          <Input
            label="Portfolio Website URL"
            value={formData.personalInfo.portfolio || ""}
            onChange={(e) => updatePersonalInfo("portfolio", e.target.value)}
          />
          <Input
            label="LinkedIn URL"
            value={formData.personalInfo.linkedin || ""}
            onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
          />
        </div>
        <Input
          label="GitHub Profile URL (optional)"
          value={formData.personalInfo.github || ""}
          onChange={(e) => updatePersonalInfo("github", e.target.value)}
        />
      </div>
    );
  }

  // STEP 2: Services, Tech Stack & Projects
  if (step === 2) {
    return (
      <div className="space-y-8">
        {/* Services & Tech Stacks Tag Blocks */}
        <div className="glass-panel p-5 rounded-xl border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white mb-2">Services & Tech Stack Specifications</h3>
          <div className="relative">
            <Input
              label="Services Offered (Comma separated)"
              value={formData.skills.servicesRaw || ""}
              onChange={(e) => handleTagChange("services", e.target.value)}
              placeholder="Frontend Development, UI Design, API Integration"
            />
            <VoiceInput 
              onResult={(text) => handleTagChange("services", (formData.skills.servicesRaw ? formData.skills.servicesRaw + ", " : "") + text)}
              className="bottom-6"
            />
          </div>
          
          <Input
            label="Tech Stack / Core Tools (Comma separated)"
            value={formData.skills.techStackRaw || ""}
            onChange={(e) => handleTagChange("techStack", e.target.value)}
            placeholder="React, Next.js, Node.js, Tailwind, MongoDB"
          />
        </div>

        {/* Projects block */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Notable Freelance Projects</h3>
            <Button variant="secondary" onClick={addProject} className="px-3 py-1.5 touch-btn text-xs gap-1">
              <Plus size={14} /> Add Project
            </Button>
          </div>

          {formData.projects.map((proj: any, idx: number) => (
            <div key={proj.id} className="glass-panel p-5 rounded-xl mb-4 border-white/5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-blue-400">Project #{idx + 1}</span>
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
                />
                <Input
                  label="Project Live / Code URL"
                  value={proj.projUrl}
                  onChange={(e) => handleProjectChange(idx, "projUrl", e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs text-textSecondary mb-1.5">Project Description & Achieved Results (AI will rewrite)</label>
                <div className="relative">
                  <textarea
                    value={proj.projDesc}
                    onChange={(e) => handleProjectChange(idx, "projDesc", e.target.value)}
                    rows={3}
                    placeholder="e.g. Built a custom e-commerce dashboard using Next.js. Increased sales conversions by 20%."
                    className="w-full rounded-lg bg-surface border border-white/10 px-4 py-3 text-white text-sm outline-none focus:border-blue-500 transition-all font-inter leading-relaxed"
                  />
                  <VoiceInput 
                    onResult={(text) => handleProjectChange(idx, "projDesc", (proj.projDesc ? proj.projDesc + " " : "") + text)}
                  />
                </div>
                
                <div className="mt-2 flex justify-end">
                  <Button
                    variant="secondary"
                    isLoading={aiLoadingIdx === idx}
                    onClick={() => expandProjectWithAI(idx)}
                    className="px-3 py-1.5 text-xs text-blue-400 gap-1"
                  >
                    <Sparkles size={13} />
                    Polish Project details with AI ✨
                  </Button>
                </div>

                {proj.expandedBulletPoints?.length > 0 && (
                  <div className="mt-3 bg-white/5 border border-white/5 p-3 rounded-lg">
                    <p className="text-[10px] uppercase font-bold text-blue-400 mb-1 tracking-wider">AI Quantified Achievements:</p>
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

  // STEP 3: Skills & Soft Skills
  if (step === 3) {
    return (
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white mb-2">Additional Freelance Competencies</h3>
        
        <Input
          label="Professional Soft Skills (Comma separated)"
          value={formData.skills.softSkillsRaw || ""}
          onChange={(e) => handleTagChange("softSkills", e.target.value)}
          placeholder="Client Communication, Project Management, Agile, Remote Cooperation"
        />

        <Input
          label="Spoken Languages (Comma separated)"
          value={formData.skills.languagesRaw || ""}
          onChange={(e) => handleTagChange("languages", e.target.value)}
          placeholder="English, Urdu, Arabic"
        />
      </div>
    );
  }

  return null;
}
