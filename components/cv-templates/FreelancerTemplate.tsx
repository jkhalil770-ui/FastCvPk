"use client";

import React from "react";

interface FreelancerTemplateProps {
  data: any;
  hasWatermark?: boolean;
}

/**
 * Modern tech-oriented Freelancer CV template layout.
 * Optimized for portfolio URLs, services, and live project achievements.
 */
export default function FreelancerTemplate({ data, hasWatermark = false }: FreelancerTemplateProps) {
  const p = data.personalInfo || {};
  const projects = data.projects || [];
  const skills = data.skills || {};

  return (
    <div 
      id="cv-print-area" 
      className="pdf-page-container font-inter text-slate-800 relative bg-white shadow-2xl p-10 transition-all duration-300"
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
      dir="ltr"
    >
      {/* Top Banner Stripe */}
      <div className="h-1.5 w-full bg-blue-600 -mt-[15mm] -mx-[15mm] mb-8" style={{ width: "calc(100% + 30mm)" }} />

      {/* Top Banner / Core Header */}
      <div className="border-l-4 border-blue-600 pl-4 mb-6 py-1">
        <h1 className="text-3xl font-extrabold text-slate-900 leading-none mb-2 uppercase">
          {p.fullName || "Your Full Name"}
        </h1>
        <p className="text-sm font-bold text-blue-600 uppercase ">
          {p.profTitle || "Freelance Specialist"}
        </p>
        
        {/* Links grid */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3.5 text-xs text-slate-500 font-medium">
          {p.email && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {p.email}
            </span>
          )}
          {p.email && p.phone && <span className="text-slate-300">|</span>}
          {p.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {p.phone}
            </span>
          )}
          {p.phone && p.city && <span className="text-slate-300">|</span>}
          {p.city && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {p.city}
            </span>
          )}
          {p.city && p.portfolio && <span className="text-slate-300">|</span>}
          {p.portfolio && (
            <span className="flex items-center gap-1 text-blue-600 font-semibold">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              {p.portfolio.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
          )}
        </div>
      </div>

      {/* Summary Profile */}
      {data.generatedSummary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-2.5 border-b border-slate-200 pb-1">
            Professional Profile
          </h2>
          <p className="text-[11.5px] text-slate-600 leading-relaxed text-left whitespace-pre-line">
            {data.generatedSummary}
          </p>
        </div>
      )}

      {/* Services and Tech Stack */}
      {((skills.services && skills.services.length > 0) || (skills.techStack && skills.techStack.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
          {skills.services && skills.services.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase text-slate-700 mb-2">
                Services Offered
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.services.map((serv: string, idx: number) => (
                  <span key={idx} className="bg-white px-2.5 py-1 border border-slate-200 text-[10px] text-slate-600 font-semibold rounded shadow-sm">
                    {serv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skills.techStack && skills.techStack.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase text-slate-700 mb-2">
                Tech Stack & Tools
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.techStack.map((tool: string, idx: number) => (
                  <span key={idx} className="bg-blue-50 border border-blue-100 text-blue-700 px-2.5 py-1 text-[10px] font-bold rounded shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Projects list */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-3.5 border-b border-slate-200 pb-1">
            Notable Projects
          </h2>
          
          {projects.map((proj: any, idx: number) => {
            const hasBullets = proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0;
            if (!proj.projectName && !proj.projDesc && !hasBullets) return null;
            return (
              <div key={idx} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-slate-800">
                  <span className="text-slate-900">{proj.projectName || "Project Title"}</span>
                  {proj.projUrl && (
                    <span className="text-[10px] font-mono text-blue-600 font-semibold hover:underline">
                      {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </span>
                  )}
                </div>
                
                {/* Project accomplishment bullet details */}
                {proj.expandedBulletPoints && proj.expandedBulletPoints.length > 0 ? (
                  <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-600 space-y-1.5 leading-relaxed">
                    {proj.expandedBulletPoints.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="text-left">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  proj.projDesc && (
                    <p className="text-[11px] text-slate-600 pl-1 mt-1.5 leading-relaxed text-left whitespace-pre-line">
                      {proj.projDesc}
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Skills list */}
      {((skills.softSkills && skills.softSkills.length > 0) || (skills.languages && skills.languages.length > 0)) && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 mb-2.5 border-b border-slate-200 pb-1">
            Skills & Languages
          </h2>
          <div className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
            {skills.softSkills && skills.softSkills.length > 0 && (
              <div>
                <strong className="text-slate-800 font-bold uppercase text-[10px]">Core Competencies: </strong>
                <span className="ml-1">{skills.softSkills.join(", ")}</span>
              </div>
            )}
            {skills.languages && skills.languages.length > 0 && (
              <div>
                <strong className="text-slate-800 font-bold uppercase text-[10px]">Spoken Languages: </strong>
                <span className="ml-1">{skills.languages.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

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
