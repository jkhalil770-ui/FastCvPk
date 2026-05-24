"use client";

import React from "react";

interface StudentTemplateProps {
  data: any;
  hasWatermark?: boolean;
}

/**
 * Clean Academic Student CV template layout.
 * Supports LTR/RTL switching based on the student's chosen language.
 */
export default function StudentTemplate({ data, hasWatermark = false }: StudentTemplateProps) {
  const p = data.personalInfo || {};
  const internships = data.internships || [];
  const projects = data.projects || [];
  const skills = data.skills || {};

  const isUrdu = p.languageChoice === "ur";
  const dir = isUrdu ? "rtl" : "ltr";
  const alignClass = isUrdu ? "text-right font-urdu" : "text-left font-inter";

  return (
    <div 
      id="cv-print-area" 
      className={`pdf-page-container text-slate-800 relative bg-white shadow-2xl p-10 transition-all duration-300 ${alignClass}`}
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
      dir={dir}
    >
      {/* Top Banner Stripe */}
      <div className="h-1.5 w-full bg-blue-600 -mt-[15mm] -mx-[15mm] mb-8" style={{ width: "calc(100% + 30mm)" }} />

      {/* Title / Name Header */}
      <div className={`border-b border-slate-200 pb-4 mb-6 ${isUrdu ? "leading-loose" : ""}`}>
        <h1 className="text-3xl font-extrabold text-slate-900 leading-none mb-2">
          {p.fullName || (isUrdu ? "آپ کا نام" : "Your Name")}
        </h1>
        <p className="text-sm font-bold text-blue-600 uppercase ">
          {p.classProgram || (isUrdu ? "موجودہ ڈگری / کلاس" : "Current Degree / Class")} 
          {p.schoolName && <span className="text-slate-400 font-medium font-inter"> @ </span>}
          {p.schoolName || (isUrdu ? "ادارے کا نام" : "Institution Name")}
        </p>
        
        {/* Contact Strip */}
        <div className={`flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500 font-medium ${isUrdu ? "justify-start font-urdu" : "justify-start"}`}>
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
        </div>
      </div>

      {/* Summary Objective */}
      {data.generatedObjective && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 border-b border-blue-600 pb-1 mb-2.5">
            {isUrdu ? "کیریئر کا مقصد" : "Career Objective"}
          </h2>
          <p className="text-[11.5px] text-slate-600 leading-relaxed text-left whitespace-pre-line">
            {data.generatedObjective}
          </p>
        </div>
      )}

      {/* Education block */}
      {p.studentEducation && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 border-b border-blue-600 pb-1 mb-2.5">
            {isUrdu ? "تعلیمی ریکارڈ" : "Education & Academic Profile"}
          </h2>
          <p className="text-[11.5px] text-slate-600 leading-relaxed whitespace-pre-line text-left pl-1">
            {p.studentEducation}
          </p>
        </div>
      )}

      {/* Internships */}
      {internships.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 border-b border-blue-600 pb-1 mb-3.5">
            {isUrdu ? "انٹرنشپ کی تفصیلات" : "Internships & Experience"}
          </h2>
          
          {internships.map((intern: any, index: number) => {
            const hasDetails = intern.expandedDetails?.length > 0 || intern.details;
            if (!intern.role && !intern.company && !hasDetails) return null;
            return (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-slate-800">
                  <span className="text-slate-900">
                    {intern.role || "Intern Role"} <span className="font-medium text-slate-500">{isUrdu ? "بمقام" : "at"}</span> {intern.company || "Company"}
                  </span>
                  {intern.duration && (
                    <span className="text-slate-500 font-semibold text-[10.5px] font-inter">
                      {intern.duration}
                    </span>
                  )}
                </div>
                
                {intern.expandedDetails && intern.expandedDetails.length > 0 ? (
                  <ul className={`list-disc mt-2 text-[11px] text-slate-600 space-y-1.5 leading-relaxed ${isUrdu ? "pr-4" : "pl-4"}`}>
                    {intern.expandedDetails.map((bullet: string, bIdx: number) => (
                      <li key={bIdx} className="text-left">{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  intern.details && (
                    <p className="text-[11px] text-slate-600 pl-1 mt-1.5 leading-relaxed text-left whitespace-pre-line">
                      {intern.details}
                    </p>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Academic Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 border-b border-blue-600 pb-1 mb-3.5">
            {isUrdu ? "اکیڈمک پروجیکٹس" : "Academic Projects"}
          </h2>
          
          {projects.map((proj: any, index: number) => {
            if (!proj.projectName && !proj.projDesc) return null;
            return (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-baseline text-[11.5px] font-bold text-slate-800">
                  <span className="text-slate-900">{proj.projectName || "Project Title"}</span>
                  {proj.projUrl && (
                    <span className="text-[10px] text-blue-600 font-mono font-semibold hover:underline">
                      {proj.projUrl.replace(/^(https?:\/\/)?(www\.)?/, "")}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-1.5 text-left whitespace-pre-line pl-1">
                  {proj.projDesc}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Skills list */}
      {((skills.techSkills && skills.techSkills.length > 0) || (skills.softSkills && skills.softSkills.length > 0) || skills.studentExtra) && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase text-blue-600 border-b border-blue-600 pb-1 mb-2.5">
            {isUrdu ? "مہارتیں اور کارنامے" : "Skills & Accomplishments"}
          </h2>
          <div className="space-y-2 text-[11px] text-slate-600 leading-relaxed">
            {skills.techSkills && skills.techSkills.length > 0 && (
              <div>
                <strong className="text-slate-800 font-bold uppercase text-[10px]">
                  {isUrdu ? "ٹیکنیکل مہارتیں: " : "Technical Skills: "}
                </strong>
                <span className="ml-1">{skills.techSkills.join(", ")}</span>
              </div>
            )}
            {skills.softSkills && skills.softSkills.length > 0 && (
              <div>
                <strong className="text-slate-800 font-bold uppercase text-[10px]">
                  {isUrdu ? "سافٹ مہارتیں: " : "Soft Skills: "}
                </strong>
                <span className="ml-1">{skills.softSkills.join(", ")}</span>
              </div>
            )}
            {skills.studentExtra && (
              <div>
                <strong className="text-slate-800 font-bold uppercase text-[10px]">
                  {isUrdu ? "اضافی سرگرمیاں: " : "Extracurriculars: "}
                </strong>
                <span className="ml-1">{skills.studentExtra}</span>
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
