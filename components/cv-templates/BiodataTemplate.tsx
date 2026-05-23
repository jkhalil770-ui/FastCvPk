"use client";

import React from "react";

interface BiodataTemplateProps {
  data: any;
  hasWatermark?: boolean; // Included for interface compatibility but defaults to false
}

/**
 * Matrimonial / General Urdu Nastaliq Biodata template.
 * Renders entirely in Urdu script with custom table structures.
 */
export default function BiodataTemplate({ data, hasWatermark = false }: BiodataTemplateProps) {
  const p = data.personalInfo || {};
  const edu = data.biodataEducation || {};
  const refs = data.biodataReferences || [];
  const skills = data.skills || {};

  return (
    <div 
      id="cv-print-area" 
      className="pdf-page-container font-urdu text-right text-slate-800 bg-white relative p-10 shadow-2xl transition-all duration-300 border-[6px] border-double border-emerald-600"
      style={{ minHeight: "297mm", boxSizing: "border-box" }}
      dir="rtl"
    >
      {/* Top Header Section */}
      <div className="text-center border-b-2 border-emerald-600 pb-3 mb-6 mt-2">
        <span className="text-[10px] uppercase font-bold text-emerald-600 font-inter block mb-1">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        <h1 className="text-3xl font-black text-emerald-800 drop-shadow-sm leading-normal">{p.fullName || "نام درج کریں"}</h1>
        <p className="text-sm font-bold text-slate-500 mt-1">سوانح حیات (بائیو ڈیٹا)</p>
      </div>

      {/* Personal Info Section */}
      <div className="mb-6">
        <h2 className="text-base font-black text-emerald-700 border-b-2 border-emerald-100 pb-1 mb-4">ذاتی تفصیلات</h2>
        
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-8 text-[12px] text-slate-700 leading-relaxed pr-2">
          <div><strong className="text-slate-900">مکمل نام: </strong>{p.fullName || "—"}</div>
          <div><strong className="text-slate-900">والد کا نام: </strong>{p.fatherName || "—"}</div>
          <div><strong className="text-slate-900">تاریخ پیدائش: </strong>{p.dob || "—"}</div>
          <div><strong className="text-slate-900">شناختی کارڈ نمبر: </strong>{p.cnic || "—"}</div>
          <div><strong className="text-slate-900">مذہب: </strong>{p.religion || "—"}</div>
          <div><strong className="text-slate-900">شہر: </strong>{p.city || "—"}</div>
          <div><strong className="text-slate-900">رابطہ نمبر: </strong>{p.phone || "—"}</div>
          {p.email && <div><strong className="text-slate-900">ای میل: </strong>{p.email}</div>}
          <div className="col-span-2"><strong className="text-slate-900">مکمل پتہ: </strong>{p.address || "—"}</div>
        </div>
      </div>

      {/* Education Grid (Table) */}
      <div className="mb-6">
        <h2 className="text-base font-black text-emerald-700 border-b-2 border-emerald-100 pb-1 mb-4">تعلیمی کوائف</h2>
        
        <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
          <table className="w-full text-center border-collapse text-[11px] text-slate-700">
            <thead>
              <tr className="bg-emerald-50/80 border-b border-emerald-600/30 font-bold text-slate-900">
                <th className="py-2.5 px-2 border-l border-slate-200">کلاس / ڈگری</th>
                <th className="py-2.5 px-2 border-l border-slate-200">ادارہ / بورڈ / یونیورسٹی</th>
                <th className="py-2.5 px-2 border-l border-slate-200">پاس کرنے کا سال</th>
                <th className="py-2.5 px-2">نمبر / سی جی پی اے</th>
              </tr>
            </thead>
            <tbody>
              {edu.matric?.board && (
                <tr className="border-b border-slate-200 hover:bg-slate-50/50">
                  <td className="py-2.5 px-2 border-l border-slate-200 font-bold text-slate-900">میٹرک</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.matric.board}</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.matric.year}</td>
                  <td className="py-2.5 px-2">{edu.matric.marks}</td>
                </tr>
              )}
              {edu.inter?.board && (
                <tr className="border-b border-slate-200 hover:bg-slate-50/50">
                  <td className="py-2.5 px-2 border-l border-slate-200 font-bold text-slate-900">انٹر (FA / FSc)</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.inter.board}</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.inter.year}</td>
                  <td className="py-2.5 px-2">{edu.inter.marks}</td>
                </tr>
              )}
              {edu.graduation?.university && (
                <tr className="border-b border-slate-200 hover:bg-slate-50/50">
                  <td className="py-2.5 px-2 border-l border-slate-200 font-bold text-slate-900">گریجویشن</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.graduation.university}</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.graduation.year}</td>
                  <td className="py-2.5 px-2">{edu.graduation.cgpa}</td>
                </tr>
              )}
              {edu.masters?.university && (
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-2 border-l border-slate-200 font-bold text-slate-900">ماسٹرز</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.masters.university}</td>
                  <td className="py-2.5 px-2 border-l border-slate-200">{edu.masters.year}</td>
                  <td className="py-2.5 px-2">{edu.masters.cgpa}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Skills list */}
      {skills.techSkills && skills.techSkills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-black text-emerald-700 border-b-2 border-emerald-100 pb-1 mb-3.5">مہارتیں</h2>
          <div className="flex flex-wrap gap-2.5 text-[11px] text-slate-700 pr-2">
            {skills.techSkills.map((sk: string, index: number) => (
              <span key={index} className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3.5 py-1 rounded-full font-semibold transition-all">
                {sk}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {refs.length > 0 && (refs[0]?.name || refs[1]?.name) && (
        <div className="mb-6">
          <h2 className="text-base font-black text-emerald-700 border-b-2 border-emerald-100 pb-1 mb-4">حوالہ جات</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-700 pr-2">
            {refs.map((ref: any, idx: number) => {
              if (!ref.name) return null;
              return (
                <div key={idx} className="bg-emerald-50/30 border border-emerald-100/50 p-4 rounded-xl shadow-sm transition-all hover:bg-emerald-50/50">
                  <div className="font-bold text-emerald-800 text-[12px] mb-2 border-b border-emerald-100 pb-1">{ref.name}</div>
                  <div className="space-y-1">
                    <div><strong>تعلق / عہدہ: </strong>{ref.relation}</div>
                    <div><strong>رابطہ نمبر: </strong>{ref.phone}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Watermark is always hidden for matrimonial biodata */}
    </div>
  );
}
