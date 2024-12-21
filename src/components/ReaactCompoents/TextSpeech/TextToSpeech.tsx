import { useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

function TextToSpeech({ content }: { content: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

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
    <div className="flex flex-col items-center justify-center p-4 rounded-lg w-full max-w-xs mx-auto">
      <p className="mb-2 text-lg font-semibold text-white">Audio Content</p>

      <button
        onClick={isPlaying ? stopAudio : playAudio}
        className="flex justify-center items-center w-12 h-12 rounded-full bg-[#1f2335] border-2 border-white hover:bg-[#7aa2f7] transition duration-300"
      >
        {isPlaying ? (
          <FaPause style={{ color: "white" }} />
        ) : (
          <FaPlay style={{ color: "white" }} />
        )}
      </button>
    </div>
  );
}

export default TextToSpeech;
