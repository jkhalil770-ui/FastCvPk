"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useToast } from "@/components/ui/Toast";

interface VoiceInputProps {
  onResult: (text: string) => void;
  className?: string;
}

export default function VoiceInput({ onResult, className = "" }: VoiceInputProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
      } else {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        
        recognition.onresult = (event: any) => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + " ";
            }
          }
          if (finalTranscript.trim()) {
            onResult(finalTranscript.trim());
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error === 'not-allowed') {
            toast("Microphone access denied. Please allow in browser settings.", "error");
            setIsRecording(false);
          } else if (event.error === 'no-speech') {
            toast(language === 'ur' ? "Koi awaaz nahi suni — dobara try karein" : "No speech detected — please try again", "error");
            setIsRecording(false);
          }
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, [language, toast, onResult]);

  if (!isSupported) return null;

  const toggleRecording = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === "ur" ? "ur-PK" : "en-US";
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggleRecording}
      title={language === "ur" ? "Voice se likho" : "Voice Input"}
      className={`absolute bottom-2 right-2 p-2 rounded-full transition-all z-10 flex items-center justify-center ${
        isRecording 
          ? "bg-red-500 hover:bg-red-600 animate-pulse text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } ${className}`}
    >
      <Mic size={16} />
    </button>
  );
}
