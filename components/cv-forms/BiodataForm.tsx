"use client";

import React, { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import VoiceInput from "@/components/ui/VoiceInput";
import { useToast } from "@/components/ui/Toast";
import { Sparkles } from "lucide-react";

interface BiodataFormProps {
  formData: any;
  setFormData: (data: any) => void;
  step: number;
}

/**
 * Matrimonial & general-use Urdu Biodata Form. Runs in full RTL/Urdu mode.
 */
export default function BiodataForm({ formData, setFormData, step }: BiodataFormProps) {
  const { toast } = useToast();
  const [aiFilling, setAiFilling] = useState(false);

  const handleSmartAIFill = async () => {
    const jobTitle = formData.personalInfo.profTitle;
    if (!jobTitle) {
      toast("پیشہ لکھنا لازمی ہے!", "warning", "اے آئی سے معلومات بھرنے کے لیے پہلے اپنا پیشہ لکھیں۔");
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
          lang: "ur",
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
      });

      toast("معلومات کامیابی سے درج کر دی گئیں!", "success", "اے آئی نے آپ کا پیشہ ورانہ خلاصہ اور مہارتیں لکھ دی ہیں۔");
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

  const handleEducationChange = (level: string, field: string, val: string) => {
    setFormData({
      ...formData,
      biodataEducation: {
        ...formData.biodataEducation,
        [level]: {
          ...formData.biodataEducation[level],
          [field]: val
        }
      }
    });
  };

  const handleReferenceChange = (index: number, field: string, val: string) => {
    const list = [...formData.biodataReferences];
    list[index] = { ...list[index], [field]: val };
    setFormData({
      ...formData,
      biodataReferences: list
    });
  };

  // STEP 1: Urdu Personal Details
  if (step === 1) {
    return (
      <div className="space-y-4 font-urdu text-right" dir="rtl">
        <h3 className="text-base font-bold text-white mb-2">شخصی معلومات (ذاتی کوائف)</h3>
        
        <Input
          label="مکمل نام"
          value={formData.personalInfo.fullName || ""}
          onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
          isUrdu={true}
          required
        />
        
        <div>
          <Input
            label="پیشہ / ملازمت / موجودہ کام (مثلاً ڈرائیور، ٹیچر، ہاؤس وائف)"
            value={formData.personalInfo.profTitle || ""}
            onChange={(e) => updatePersonalInfo("profTitle", e.target.value)}
            isUrdu={true}
          />
          {formData.personalInfo.profTitle && (
            <div className="mt-[-8px] mb-4 flex justify-start">
              <button
                type="button"
                onClick={handleSmartAIFill}
                disabled={aiFilling}
                className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-950/40 hover:bg-emerald-950/70 text-emerald-300 hover:text-emerald-200 text-xs font-semibold px-3 py-1.5 transition-all duration-300 active:scale-95 shadow-lg shadow-emerald-500/5 select-none disabled:opacity-50"
              >
                <Sparkles size={13} className={aiFilling ? "animate-spin" : "animate-pulse"} />
                {aiFilling ? "اے آئی لکھ رہا ہے..." : "✨ اے آئی سے بھریں"}
              </button>
            </div>
          )}
        </div>

        <Input
          label="والد کا نام"
          value={formData.personalInfo.fatherName || ""}
          onChange={(e) => updatePersonalInfo("fatherName", e.target.value)}
          isUrdu={true}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="تاریخ پیدائش (مثلاً 15 اگست 1998)"
            value={formData.personalInfo.dob || ""}
            onChange={(e) => updatePersonalInfo("dob", e.target.value)}
            isUrdu={true}
            required
          />
          <Input
            label="شناختی کارڈ نمبر (CNIC)"
            value={formData.personalInfo.cnic || ""}
            onChange={(e) => updatePersonalInfo("cnic", e.target.value)}
            isUrdu={true}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="مذہب"
            value={formData.personalInfo.religion || ""}
            onChange={(e) => updatePersonalInfo("religion", e.target.value)}
            isUrdu={true}
            required
          />
          <Input
            label="شہر"
            value={formData.personalInfo.city || ""}
            onChange={(e) => updatePersonalInfo("city", e.target.value)}
            isUrdu={true}
            required
          />
        </div>

        <div className="relative">
          <Input
            label="مکمل پتہ"
            value={formData.personalInfo.address || ""}
            onChange={(e) => updatePersonalInfo("address", e.target.value)}
            isUrdu={true}
            required
          />
          <VoiceInput 
            onResult={(text) => updatePersonalInfo("address", (formData.personalInfo.address ? formData.personalInfo.address + " " : "") + text)}
            className="bottom-6"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="فون نمبر"
            value={formData.personalInfo.phone || ""}
            onChange={(e) => updatePersonalInfo("phone", e.target.value)}
            isUrdu={true}
            required
          />
          <Input
            label="ای میل (اختیاری)"
            value={formData.personalInfo.email || ""}
            onChange={(e) => updatePersonalInfo("email", e.target.value)}
            isUrdu={true}
          />
        </div>
      </div>
    );
  }

  // STEP 2: Matric, Inter, Graduation Marks
  if (step === 2) {
    const edu = formData.biodataEducation || {
      matric: { board: "", year: "", marks: "" },
      inter: { board: "", year: "", marks: "" },
      graduation: { university: "", year: "", cgpa: "" },
      masters: { university: "", year: "", cgpa: "" }
    };

    return (
      <div className="space-y-6 font-urdu text-right" dir="rtl">
        <h3 className="text-base font-bold text-white mb-2">تعلیمی کوائف (تعلیمی ریکارڈ)</h3>

        {/* Matric */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">میٹرک کی تفصیلات</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="بورڈ / اسکول"
              value={edu.matric?.board || ""}
              onChange={(e) => handleEducationChange("matric", "board", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سال"
              value={edu.matric?.year || ""}
              onChange={(e) => handleEducationChange("matric", "year", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="نمبر / فیصد"
              value={edu.matric?.marks || ""}
              onChange={(e) => handleEducationChange("matric", "marks", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>

        {/* Inter */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">انٹر کی تفصیلات (ایف اے، ایف ایس سی)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="بورڈ / کالج"
              value={edu.inter?.board || ""}
              onChange={(e) => handleEducationChange("inter", "board", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سال"
              value={edu.inter?.year || ""}
              onChange={(e) => handleEducationChange("inter", "year", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="نمبر / فیصد"
              value={edu.inter?.marks || ""}
              onChange={(e) => handleEducationChange("inter", "marks", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>

        {/* Graduation */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">گریجویشن (بی اے، بی ایس سی، بی ایس)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="یونیورسٹی"
              value={edu.graduation?.university || ""}
              onChange={(e) => handleEducationChange("graduation", "university", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سال"
              value={edu.graduation?.year || ""}
              onChange={(e) => handleEducationChange("graduation", "year", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سی جی پی اے / نمبر"
              value={edu.graduation?.cgpa || ""}
              onChange={(e) => handleEducationChange("graduation", "cgpa", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>

        {/* Masters */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">ماسٹرز (اگر کیا ہو)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="یونیورسٹی"
              value={edu.masters?.university || ""}
              onChange={(e) => handleEducationChange("masters", "university", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سال"
              value={edu.masters?.year || ""}
              onChange={(e) => handleEducationChange("masters", "year", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="سی جی پی اے / نمبر"
              value={edu.masters?.cgpa || ""}
              onChange={(e) => handleEducationChange("masters", "cgpa", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Skills & References in Urdu
  if (step === 3) {
    const handleSkillsRawChange = (val: string) => {
      const list = val.split(",").map(s => s.trim()).filter(Boolean);
      setFormData({
        ...formData,
        skills: {
          ...formData.skills,
          techSkills: list,
          techSkillsRaw: val
        }
      });
    };

    const refs = formData.biodataReferences || [
      { name: "", relation: "", phone: "" },
      { name: "", relation: "", phone: "" }
    ];

    return (
      <div className="space-y-6 font-urdu text-right" dir="rtl">
        <h3 className="text-base font-bold text-white mb-2">مہارتیں اور حوالہ جات</h3>

        {/* Skills */}
        <Input
          label="اہم مہارتیں (کومہ کے ساتھ الگ کریں، جیسے سلائی کڑھائی، کمپیوٹر، ڈرائیونگ)"
          value={formData.skills.techSkillsRaw || ""}
          onChange={(e) => handleSkillsRawChange(e.target.value)}
          isUrdu={true}
          placeholder="گرافک ڈیزائن، ایم ایس ورڈ، انگلش بول چال"
        />

        {/* Reference 1 */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">پہلا حوالہ (Reference 1)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="حوالہ دینے والے کا نام"
              value={refs[0]?.name || ""}
              onChange={(e) => handleReferenceChange(0, "name", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="تعلق / رشتہ"
              value={refs[0]?.relation || ""}
              onChange={(e) => handleReferenceChange(0, "relation", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="رابطہ نمبر"
              value={refs[0]?.phone || ""}
              onChange={(e) => handleReferenceChange(0, "phone", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>

        {/* Reference 2 */}
        <div className="glass-panel p-4 rounded-xl border-white/5 space-y-4">
          <h4 className="text-xs font-bold text-blue-400">دوسرا حوالہ (Reference 2)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="حوالہ دینے والے کا نام"
              value={refs[1]?.name || ""}
              onChange={(e) => handleReferenceChange(1, "name", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="تعلق / رشتہ"
              value={refs[1]?.relation || ""}
              onChange={(e) => handleReferenceChange(1, "relation", e.target.value)}
              isUrdu={true}
            />
            <Input
              label="رابطہ نمبر"
              value={refs[1]?.phone || ""}
              onChange={(e) => handleReferenceChange(1, "phone", e.target.value)}
              isUrdu={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
}
