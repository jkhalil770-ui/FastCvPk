"use client";

import React from "react";

interface ATSTemplateProps {
  data: any;
  hasWatermark?: boolean;
}

/**
 * Standard Single-Column ATS corporate CV template layout.
 * Runs in client-side HTML context. Color themes are tailored for high contrast scanners.
 */
export default function ATSTemplate({ data, hasWatermark = false }: ATSTemplateProps) {
  const p = data.personalInfo || {};
  const experiences = data.experience || [];
  const education = data.education || [];
  const skills = data.skills || {};

  return (
    <div 
      id="cv-print-area" 
      className="pdf-page-container font-inter text-slate-800 relative bg-white shadow-2xl transition-all duration-300"
      style={{ fontFamily: "'Inter', sans-serif" }}
      dir="ltr"
    >
      {/* Premium Header Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 to-indigo-800 -mt-[15mm] -mx-[15mm] mb-8" style={{ width: "calc(100% + 30mm)" }} />

      {/* Name and Professional Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold uppercase tracking-wide text-slate-900 mb-2">
          {p.fullName || "Your Full Name"}
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600 border-b border-slate-200 pb-3 max-w-md mx-auto">
          {p.profTitle || "Your Professional Title"}
        </p>
        
        {/* Contact Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 mt-3.5 text-xs text-slate-500 font-medium">
          {p.phone && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {p.phone}
            </span>
          )}
          {p.phone && p.email && <span className="text-slate-300">|</span>}
          {p.email && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {p.email}
            </span>
          )}
          {p.email && p.city && <span className="text-slate-300">|</span>}
          {p.city && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {p.city}
            </span>
          )}
          {p.city && p.linkedin && <span className="text-slate-300">|</span>}
          {p.linkedin && (
            <span className="flex items-center gap-1 text-slate-700 hover:text-blue-600">
              <svg className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              {p.linkedin.replace(/^(https?:\/\/)?(www\.)?/, "")}
            </span>
          )}
        </div>
      </div>

      {/* Summary Section */}
      {data.generatedSummary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 mb-3">
            Professional Summary
          </h2>
          <p className="text-[11.5px] text-slate-600 leading-relaxed text-left whitespace-pre-line">
            {data.generatedSummary}
          </p>
        </div>
      )}

      {/* Experience Section */}
      {experiences.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 mb-4">
            Work Experience
          </h2>
          
          {experiences.map((exp: any, index: number) => {
            const hasDetails = exp.expandedResponsibilities?.length > 0 || exp.responsibilities;
            if (!exp.jobTitle && !exp.company && !hasDetails) return null;
            return (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline text-[12px] font-bold text-slate-800">
                  <span className="text-slate-900">
                    {exp.jobTitle || "Job Role"} <span className="font-medium text-slate-500">at</span> {exp.company || "Company"}
                  </span>
                  <span className="text-slate-500 font-semibold text-[10.5px]">
                    {exp.fromDate || "From"} — {exp.currentlyWorking ? "Present" : exp.toDate || "To"}
                  </span>
                </div>
                
                {/* Job duties list */}
                {exp.expandedResponsibilities?.length > 0 ? (
                  <ul className="list-disc pl-4 mt-2 text-[11px] text-slate-600 space-y-1.5 leading-relaxed">
                    {exp.expandedResponsibilities.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="text-left">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  exp.responsibilities && (
                    <p className="text-[11px] text-slate-600 pl-1 mt-1.5 leading-relaxed text-left whitespace-pre-line">
                      {exp.responsibilities}
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
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 mb-4">
            Education History
          </h2>
          
          {education.map((edu: any, index: number) => {
            if (!edu.degreeName && !edu.institution) return null;
            return (
              <div key={index} className="flex justify-between items-baseline text-[11.5px] text-slate-600 mb-2.5 last:mb-0">
                <div>
                  <span className="font-bold text-slate-800">{edu.degreeName || "Degree / Qualification"}</span>
                  <span className="text-slate-500"> — {edu.institution || "Institution"}</span>
                </div>
                <div className="text-right flex-shrink-0 font-medium">
                  <span className="font-semibold text-slate-700">{edu.grade || "Grade"}</span>
                  <span className="text-slate-400 text-[10px] ml-2">({edu.year || "Year"})</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills Section */}
      {((skills.techSkills && skills.techSkills.length > 0) || (skills.softSkills && skills.softSkills.length > 0) || (skills.languages && skills.languages.length > 0)) && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-1.5 mb-4">
            Core Skills & Languages
          </h2>
          <div className="space-y-4">
            {skills.techSkills && skills.techSkills.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-2">Technical Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.techSkills.map((skill: string, index: number) => (
                    <span key={index} className="bg-slate-50 border border-slate-200 text-slate-800 px-2.5 py-1 text-[10px] font-semibold rounded tracking-wide shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {skills.softSkills && skills.softSkills.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-2">Soft Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.softSkills.map((skill: string, index: number) => (
                    <span key={index} className="bg-slate-50 border border-slate-200 text-slate-800 px-2.5 py-1 text-[10px] font-semibold rounded tracking-wide shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.languages && skills.languages.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700 block mb-2">Languages Spoken:</span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.languages.map((lang: string, index: number) => (
                    <span key={index} className="bg-slate-50 border border-slate-200 text-slate-800 px-2.5 py-1 text-[10px] font-semibold rounded tracking-wide shadow-sm">
                      {lang}
                    </span>
                  ))}
                </div>
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
