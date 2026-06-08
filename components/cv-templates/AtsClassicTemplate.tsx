"use client";

import React from "react";

interface AtsClassicTemplateProps {
  data: any;
  hasWatermark?: boolean;
}

/**
 * ATS Classic Resume Template — Strict single-column, high-contrast, minimalist structure.
 * Designed for perfect compliance with corporate applicant tracking systems (like Workday, Taleo).
 */
export default function AtsClassicTemplate({ data, hasWatermark = false }: AtsClassicTemplateProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <div 
      id="cv-print-area" 
      className="pdf-page-container font-serif text-black relative bg-white shadow-2xl transition-all duration-300"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      dir="ltr"
    >
      {/* Centered Name and Contact Block */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-black mb-1.5 uppercase">
          {p.fullName || "Your Full Name"}
        </h1>
        
        {/* Subtitle / Prof Title */}
        {p.profTitle && (
          <p className="text-xs font-semibold tracking-wider text-neutral-700 italic mb-2">
            {p.profTitle}
          </p>
        )}

        {/* Contact Info Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mt-2 text-[10.5px] text-neutral-600 font-medium">
          {p.email && <span>{p.email}</span>}
          {p.email && p.phone && <span className="text-neutral-300">•</span>}
          {p.phone && <span>{p.phone}</span>}
          {p.phone && p.city && <span className="text-neutral-300">•</span>}
          {p.city && <span>{p.city}, Pakistan</span>}
          
          {/* Socials */}
          {p.linkedin && (p.email || p.phone || p.city) && <span className="text-neutral-300">•</span>}
          {p.linkedin && (
            <span className="font-semibold text-black">
              LinkedIn: {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
          )}
          {p.github && <span className="text-neutral-300">•</span>}
          {p.github && (
            <span className="font-semibold text-black">
              GitHub: {p.github.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
          )}
          {p.portfolio && <span className="text-neutral-300">•</span>}
          {p.portfolio && (
            <span className="font-semibold text-black">
              Portfolio: {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.generatedSummary && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
            Professional Summary
          </h2>
          <p className="text-[11px] text-neutral-800 leading-relaxed text-left whitespace-pre-line">
            {data.generatedSummary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-3">
            Professional Experience
          </h2>
          
          {experiences.map((exp: any, index: number) => {
            const hasDetails = exp.expandedResponsibilities?.length > 0 || exp.responsibilities;
            if (!exp.jobTitle && !exp.company && !hasDetails) return null;
            return (
              <div key={index} className="mb-3.5 last:mb-0">
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-black">
                  <span>
                    {exp.jobTitle || "Job Title"} <span className="font-normal text-neutral-600">at</span> {exp.company || "Company"}
                  </span>
                  <span className="text-neutral-700 font-semibold text-[10px]">
                    {exp.fromDate || "From"} — {exp.currentlyWorking ? "Present" : exp.toDate || "To"}
                  </span>
                </div>
                
                {/* Bullets */}
                {exp.expandedResponsibilities?.length > 0 ? (
                  <ul className="list-disc pl-4 mt-1.5 text-[10.5px] text-neutral-800 space-y-1 leading-relaxed">
                    {exp.expandedResponsibilities.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="text-left">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  exp.responsibilities && (
                    <p className="text-[10.5px] text-neutral-800 pl-1 mt-1 leading-relaxed text-left whitespace-pre-line">
                      {exp.responsibilities}
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-3">
            Key Technical Projects
          </h2>
          
          {projects.map((proj: any, idx: number) => {
            const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
            if (!proj.projectName && !proj.projDesc && !hasBullets) return null;
            return (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-black">
                  <span>{proj.projectName || "Project Title"}</span>
                  {proj.projUrl && (
                    <span className="text-neutral-500 font-medium text-[9.5px]">
                      {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </span>
                  )}
                </div>
                
                {proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0 ? (
                  <ul className="list-disc pl-4 mt-1 text-[10.5px] text-neutral-800 space-y-0.5 leading-relaxed">
                    {proj.expandedBulletPoints.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="text-left">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  proj.projDesc && (
                    <p className="text-[10.5px] text-neutral-800 pl-1 mt-1 leading-relaxed text-left whitespace-pre-line">
                      {proj.projDesc}
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-3">
            Education History
          </h2>
          
          {education.map((edu: any, index: number) => {
            if (!edu.degreeName && !edu.institution) return null;
            return (
              <div key={index} className="flex justify-between items-baseline text-[11px] text-neutral-800 mb-2 last:mb-0">
                <div>
                  <span className="font-bold text-black">{edu.degreeName || "Degree"}</span>
                  <span className="text-neutral-600"> — {edu.institution || "Institution"}</span>
                </div>
                <div className="text-right flex-shrink-0 font-medium text-[10px]">
                  <span className="font-bold text-black">{edu.grade || "Grade"}</span>
                  <span className="text-neutral-500 ml-2">({edu.year || "Year"})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills Section */}
      {((skills.techSkills && skills.techSkills.length > 0) || (skills.softSkills && skills.softSkills.length > 0) || (skills.languages && skills.languages.length > 0)) && (
        <div className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-3">
            Skills & Expertise
          </h2>
          <div className="space-y-1.5 text-[10.5px] text-neutral-800">
            {skills.techSkills && skills.techSkills.length > 0 && (
              <p className="text-left">
                <strong className="text-black font-bold uppercase text-[9.5px] tracking-wide block sm:inline mr-1">Technical Skills:</strong>
                {skills.techSkills.join(", ")}
              </p>
            )}
            
            {skills.softSkills && skills.softSkills.length > 0 && (
              <p className="text-left">
                <strong className="text-black font-bold uppercase text-[9.5px] tracking-wide block sm:inline mr-1">Soft Competencies:</strong>
                {skills.softSkills.join(", ")}
              </p>
            )}

            {skills.languages && skills.languages.length > 0 && (
              <p className="text-left">
                <strong className="text-black font-bold uppercase text-[9.5px] tracking-wide block sm:inline mr-1">Languages:</strong>
                {skills.languages.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Subtle bottom Watermark */}
      {hasWatermark && (
        <div className="absolute bottom-4 left-0 w-full text-center border-t border-neutral-100 pt-2.5 pointer-events-none">
          <p className="text-[8px] font-semibold text-neutral-400 uppercase font-inter">
            Created free at FastCV.PK — Remove watermark: fastcvpk.online
          </p>
        </div>
      )}
    </div>
  );
}
