"use client";

import React from "react";

interface GlobalProTemplateProps {
  data: any;
  hasWatermark?: boolean;
}

/**
 * Premium International & Remote "Global Pro" CV Template.
 * Features a modern two-column layout, left accent bar, profile image placeholder,
 * and comprehensive sidebar details tailored for foreign and remote applications.
 */
export default function GlobalProTemplate({ data, hasWatermark = false }: GlobalProTemplateProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <div 
      id="cv-print-area" 
      className="pdf-page-container font-inter text-slate-800 relative bg-white shadow-2xl p-10 transition-all duration-300"
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
      dir="ltr"
    >
      {/* Left Full-Height Accent Bar (Electric Blue) */}
      <div className="absolute left-0 top-0 w-1.5 h-full bg-[#3B82F6] pointer-events-none" />

      {/* Main Header Container */}
      <div className="border-b border-slate-200 pb-5 mb-6 flex justify-between items-start pl-2">
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black tracking-tight text-[#0F172A] uppercase">
            {p.fullName || "Your Full Name"}
          </h1>
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#3B82F6]">
            {p.profTitle || "Remote Operations Specialist"}
          </p>
          
          {/* Top Quick Badges */}
          <div className="flex flex-wrap gap-2 mt-2 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
            {p.availability && (
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                ⚡ {p.availability.replace(/[\[\]]/g, "")}
              </span>
            )}
            {p.timeZone && (
              <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                🌐 {p.timeZone}
              </span>
            )}
            {p.expectedSalary && (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded">
                💰 {p.expectedSalary}
              </span>
            )}
          </div>
        </div>

        {/* Work Authorization Notice */}
        <div className="text-right max-w-[200px]">
          <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">Work Status</span>
          <span className="text-[10px] font-bold text-slate-600 block mt-0.5 leading-tight">
            {p.workAuth || "Eligible to work remotely for international companies"}
          </span>
        </div>
      </div>

      {/* Two-Column Body Grid */}
      <div className="flex gap-8 pl-2">
        
        {/* ================= LEFT SIDEBAR (35%) ================= */}
        <div className="w-[32%] space-y-5 flex-shrink-0">
          
          {/* Profile Photo Placeholder */}
          <div className="flex flex-col items-center text-center p-3 bg-slate-50 border border-slate-200/60 rounded-xl shadow-sm">
            <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center text-slate-400 text-[10px] font-black uppercase tracking-wider shadow-inner">
              Photo
            </div>
            <span className="text-[8px] font-semibold text-slate-400 mt-2 block leading-tight">
              Photo optional for international jobs
            </span>
          </div>

          {/* Contact Information */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] border-b border-slate-200 pb-1">
              Contact & Socials
            </h3>
            <div className="space-y-2 text-[10.5px] text-slate-600 leading-relaxed font-medium">
              {p.email && (
                <div className="truncate flex items-center gap-1.5">
                  <span className="text-[#3B82F6]">✉️</span> {p.email}
                </div>
              )}
              {p.phone && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3B82F6]">📱</span> {p.phone.startsWith("+") ? p.phone : `+92 ${p.phone.replace(/^0/, "")}`}
                </div>
              )}
              {p.city && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[#3B82F6]">📍</span> {p.city}, Pakistan
                </div>
              )}
              {p.linkedin && (
                <div className="truncate flex items-center gap-1.5 text-slate-700 hover:text-blue-600">
                  <span className="text-[#3B82F6]">💼</span> {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}
                </div>
              )}
              {p.portfolio && (
                <div className="truncate flex items-center gap-1.5 text-slate-700 hover:text-blue-600">
                  <span className="text-[#3B82F6]">🔗</span> {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}
                </div>
              )}
              {p.github && (
                <div className="truncate flex items-center gap-1.5 text-slate-700 hover:text-blue-600">
                  <span className="text-[#3B82F6]">🐙</span> {p.github.replace(/^(https?:\/\/)?(www\.)?/, "")}
                </div>
              )}
            </div>
          </div>

          {/* Technical Skills Badges */}
          {skills.techSkills && skills.techSkills.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] border-b border-slate-200 pb-1">
                Expertise & Skills
              </h3>
              <div className="flex flex-wrap gap-1">
                {skills.techSkills.map((skill: string, idx: number) => (
                  <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-800 px-2 py-0.5 text-[9px] font-semibold rounded tracking-wide shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Software Badges */}
          {skills.tools && skills.tools.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] border-b border-slate-200 pb-1">
                Tools & Software
              </h3>
              <div className="flex flex-wrap gap-1">
                {skills.tools.map((tool: string, idx: number) => (
                  <span key={idx} className="bg-blue-50/50 border border-blue-100 text-blue-800 px-2 py-0.5 text-[9px] font-bold rounded tracking-wide">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] border-b border-slate-200 pb-1">
              Spoken Languages
            </h3>
            <div className="space-y-1.5 text-[10.5px] text-slate-600 font-medium">
              <div className="flex justify-between">
                <span>Urdu</span>
                <span className="text-slate-400 font-bold">Native</span>
              </div>
              <div className="flex justify-between">
                <span>English</span>
                <span className="text-[#3B82F6] font-bold">Professional</span>
              </div>
              {skills.languages && skills.languages.map((lang: string, idx: number) => {
                if (lang.toLowerCase().includes("urdu") || lang.toLowerCase().includes("english")) return null;
                return (
                  <div key={idx} className="flex justify-between">
                    <span className="capitalize">{lang}</span>
                    <span className="text-slate-400 font-semibold">Conversational</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Short Certifications List */}
          {skills.certifications && skills.certifications.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#0F172A] border-b border-slate-200 pb-1">
                Licenses & Certs
              </h3>
              <ul className="space-y-1.5 text-[9.5px] text-slate-600 font-medium list-disc pl-3">
                {skills.certifications.map((cert: string, idx: number) => (
                  <li key={idx} className="leading-tight">{cert}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* ================= RIGHT MAIN CONTENT (65%) ================= */}
        <div className="w-[68%] space-y-6">
          
          {/* Professional Summary */}
          {data.generatedSummary && (
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Executive Profile
              </h2>
              <p className="text-[11.5px] text-slate-600 leading-relaxed text-left whitespace-pre-line">
                {data.generatedSummary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Professional Experience
              </h2>
              
              {experiences.map((exp: any, index: number) => {
                const hasDetails = exp.expandedResponsibilities?.length > 0 || exp.responsibilities;
                if (!exp.jobTitle && !exp.company && !hasDetails) return null;
                return (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-baseline text-[11.5px] font-bold text-slate-800">
                      <span className="text-slate-900">
                        {exp.jobTitle || "Job Role"} <span className="font-medium text-slate-500">at</span> {exp.company || "Company"}
                      </span>
                      <span className="text-slate-500 font-semibold text-[10.5px]">
                        {exp.fromDate || "From"} — {exp.currentlyWorking ? "Present" : exp.toDate || "To"}
                      </span>
                    </div>
                    
                    {exp.expandedResponsibilities?.length > 0 ? (
                      <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-1 leading-relaxed">
                        {exp.expandedResponsibilities.map((bullet: string, bIdx: number) => (
                          <li key={bIdx} className="text-left">{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      exp.responsibilities && (
                        <p className="text-[11px] text-slate-600 pl-1 leading-relaxed text-left whitespace-pre-line">
                          {exp.responsibilities}
                        </p>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Key Projects */}
          {projects.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Key Technical Projects
              </h2>
              
              {projects.map((proj: any, idx: number) => {
                const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
                if (!proj.projectName && !proj.projDesc && !hasBullets) return null;
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline text-[11.5px] font-bold text-slate-800">
                      <span className="text-[#3B82F6]">{proj.projectName || "Project Title"}</span>
                      {proj.projUrl && (
                        <span className="text-[10px] font-mono text-[#3B82F6] font-semibold hover:underline">
                          🔗 {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, "")}
                        </span>
                      )}
                    </div>
                    
                    {proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0 ? (
                      <ul className="list-disc pl-4 text-[10.5px] text-slate-600 space-y-1 leading-relaxed">
                        {proj.expandedBulletPoints.map((bullet: string, bIdx: number) => (
                          <li key={bIdx} className="text-left">{bullet}</li>
                        ))}
                      </ul>
                    ) : (
                      proj.projDesc && (
                        <p className="text-[10.5px] text-slate-600 leading-relaxed text-left whitespace-pre-line pl-1">
                          {proj.projDesc}
                        </p>
                      )
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Education & Credentials
              </h2>
              
              {education.map((edu: any, index: number) => {
                if (!edu.degreeName && !edu.institution) return null;
                return (
                  <div key={index} className="flex justify-between items-baseline text-[11px] text-slate-600">
                    <div>
                      <span className="font-bold text-slate-800">{edu.degreeName || "Degree"}</span>
                      <span className="text-slate-500"> — {edu.institution || "University"}</span>
                    </div>
                    <div className="text-right flex-shrink-0 font-medium">
                      <span className="font-semibold text-slate-700">{edu.grade || "GPA"}</span>
                      <span className="text-slate-400 text-[10px] ml-2">({edu.year || "Year"})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Certifications & Training */}
          {skills.certifications && skills.certifications.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Certifications & Training
              </h2>
              <div className="space-y-2">
                {skills.certifications.map((cert: string, idx: number) => {
                  const match = cert.match(/^(.*?)\s*\((.*?)\s*,\s*(.*?)\)$/);
                  if (match) {
                    const [_, name, platform, year] = match;
                    return (
                      <div key={idx} className="flex justify-between items-baseline text-[11px] text-slate-600">
                        <div>
                          <span className="font-bold text-slate-800">{name}</span>
                          <span className="text-slate-500"> — {platform}</span>
                        </div>
                        <span className="text-slate-400 text-[10px] ml-2 font-medium">({year})</span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="text-[11px] text-slate-600 font-medium text-left">
                      • <span className="font-bold text-slate-800">{cert}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements & Awards */}
          {skills.achievements && skills.achievements.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#0F172A] border-b-2 border-slate-900 pb-1 mb-2">
                Achievements & Awards
              </h2>
              <ul className="list-disc pl-4 text-[11px] text-slate-600 space-y-1 font-medium">
                {skills.achievements.map((ach: string, idx: number) => (
                  <li key={idx} className="text-left">{ach}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>

      {/* Subtle bottom Watermark */}
      {hasWatermark && (
        <div className="absolute bottom-4 left-0 w-full text-center border-t border-slate-100 pt-2.5 pointer-events-none">
          <p className="text-[8px] font-semibold text-slate-400 uppercase font-inter">
            Created free at FastCV.PK — Remove watermark: fastcvpk.online
          </p>
        </div>
      )}
    </div>
  );
}
