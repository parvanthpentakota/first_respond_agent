import { useState, useRef } from "react";
import { Mic, MicOff, Activity } from "lucide-react";

const AIVoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const synth = window.speechSynthesis;
  // Hold dynamic references to prevent garbage collection stopping speech early
  const utteranceRef = useRef(null);

  const instructions = [
    "Emergency AI Voice Guide activated. Please ensure the scene is safe.",
    "First, check for responsiveness. Tap their shoulder and shout, 'Are you okay?'",
    "If no response, call 911 or dispatch emergency services immediately.",
    "Check for breathing. If they are not breathing normally, begin CPR.",
    "Place the heel of one hand in the center of the chest. Place your other hand on top and interlock your fingers.",
    "Push hard and fast. Push down at least two inches. Push at a rate of 100 to 120 beats per minute.",
    "I will provide a rhythmic tone to help you keep pace. Push. Push. Push. Push."
  ];

  const startCPRGuide = () => {
    setIsActive(true);
    let fullScript = instructions.join("... ");
    
    utteranceRef.current = new SpeechSynthesisUtterance(fullScript);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;
    
    // Attempt to pick a clear, professional voice
    const voices = synth.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.lang === 'en-US');
    if (preferredVoice) {
      utteranceRef.current.voice = preferredVoice;
    }

    utteranceRef.current.onend = () => {
      setIsActive(false);
    };

    synth.speak(utteranceRef.current);
  };

  const stopGuide = () => {
    synth.cancel();
    setIsActive(false);
  };

  return (
    <div className={`ai-assistant-card ${isActive ? 'active-ai' : ''}`}>
      <div className="ai-header">
        <Activity size={24} color={isActive ? "#10b981" : "#64748b"} />
        <h3 className="section-subtitle" style={{marginBottom: 0}}>AI CPR Guide</h3>
      </div>
      
      <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem'}}>
        Hands-free voice instructions for critical interventions.
      </p>

      {isActive ? (
        <button className="ai-btn stop-btn" onClick={stopGuide}>
          <MicOff size={18} /> Stop Guide
        </button>
      ) : (
        <button className="ai-btn start-btn" onClick={startCPRGuide}>
          <Mic size={18} /> Start CPR Guide
        </button>
      )}

      {isActive && (
        <div className="voice-waves">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;
