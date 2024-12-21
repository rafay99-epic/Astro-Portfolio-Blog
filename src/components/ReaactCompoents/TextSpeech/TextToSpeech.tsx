import { useState, useRef, useEffect } from "react";

function TextToSpeech({ content }: { content: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis API is not supported in this browser.");
      alert("Your browser does not support Text-to-Speech functionality.");
    }
  }, []);

  const playAudio = () => {
    if (!content.trim()) {
      alert("No content available to read!");
      return;
    }

    if (!window.speechSynthesis) {
      alert("Speech Synthesis API is not supported in this browser.");
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "en-US";

    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
      utterance.voice = voices[2];
    } else {
      console.error("No voices are available for speech synthesis.");
      alert("No voices are available for text-to-speech.");
      return;
    }

    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = (event) => {
      console.error("SpeechSynthesis error:", event.error);
      setIsPlaying(false);
    };

    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
    console.log("Audio playback stopped");
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-lg "
      style={{
        background: "var(--accent-dark)",
      }}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={isPlaying ? stopAudio : playAudio}
          className="w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold transition-transform transform active:scale-90"
          style={{
            background: "var(--accent)",
            color: "var(--text-light)",
          }}
        >
          {isPlaying ? "⏹️" : "▶️"}
        </button>
        <div className="flex-1 text-left">
          <div
            className="text-sm font-medium truncate"
            style={{ color: "var(--text-light)" }}
          >
            {isPlaying ? "Playing Audio..." : "Ready to Play Audio"}
          </div>
          <div
            className="w-full h-1 rounded-full mt-2"
            style={{
              background: "var(--gray-dark)",
            }}
          >
            {/* Placeholder for progress bar */}
            <div
              className={`h-1 rounded-full transition-all ${
                isPlaying ? "w-full" : "w-0"
              }`}
              style={{ background: "var(--accent)" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextToSpeech;
