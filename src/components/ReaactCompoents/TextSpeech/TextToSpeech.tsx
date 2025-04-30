import { useState, useEffect, useCallback, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const findSuitableVoice = (
  voices: SpeechSynthesisVoice[],
  targetLang: string = "en-US"
): SpeechSynthesisVoice | null => {
  const targetBaseLang = targetLang.split("-")[0];

  const voiceChecks: ((v: SpeechSynthesisVoice) => boolean)[] = [
    (v) => v.lang === targetLang && v.default,
    (v) => v.lang === targetLang && !v.localService,
    (v) => v.lang === targetLang,
    (v) => v.lang.startsWith(targetBaseLang) && v.default,
    (v) => v.lang.startsWith(targetBaseLang) && !v.localService,
    (v) => v.lang.startsWith(targetBaseLang),
    (v) => !v.localService,
  ];

  for (const check of voiceChecks) {
    const voice = voices.find(check);
    if (voice) {
      console.log(
        `Selected voice (${targetLang}):`,
        voice.name,
        voice.lang,
        `Local: ${voice.localService}`
      );
      return voice;
    }
  }

  if (voices.length > 0) {
    console.warn(
      `No ideal voice found for ${targetLang}, using first available:`,
      voices[0].name
    );
    return voices[0];
  }

  console.error("No voices available at all.");
  return null;
};

type PlaybackState = "idle" | "playing" | "paused";

interface TextToSpeechProps {
  content: string;
  lang?: string;
}

function TextToSpeech({ content, lang = "en-US" }: TextToSpeechProps) {
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const contentRef = useRef(content);

  useEffect(() => {
    contentRef.current = content;
  }, [content]);

  useEffect(() => {
    setPlaybackState("idle");
    setProgress(0);
    setErrorMsg(null);

    if (!window.speechSynthesis) {
      console.error("Speech Synthesis API is not supported.");
      setErrorMsg("Text-to-speech is not supported in this browser.");
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    let initialLoadAttempted = false;

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0) {
        console.log("Voices loaded:", availableVoices.length);
        setVoices(availableVoices);
        const suitableVoice = findSuitableVoice(availableVoices, lang);
        setSelectedVoice(suitableVoice);
        if (!suitableVoice) {
          setErrorMsg(`No suitable voice found for language: ${lang}.`);
        } else if (errorMsg?.startsWith("No suitable voice")) {
          setErrorMsg(null);
        }
        if (errorMsg === "No text-to-speech voices are available.") {
          setErrorMsg(null);
        }
      } else if (!initialLoadAttempted) {
        console.log(
          "getVoices() returned empty array initially. Waiting for voiceschanged."
        );
        initialLoadAttempted = true;
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
      if (window.speechSynthesis?.speaking || window.speechSynthesis?.paused) {
        window.speechSynthesis.cancel();
      }
      utteranceRef.current = null;
    };
  }, [lang, errorMsg]);

  useEffect(() => {
    if (playbackState !== "idle" && window.speechSynthesis) {
      console.log("Content changed, stopping audio and resetting state.");
      window.speechSynthesis.cancel();
      setPlaybackState("idle");
      setProgress(0);
      utteranceRef.current = null;
    }
    if (errorMsg === "No content available to read." && content?.trim()) {
      setErrorMsg(null);
    }
  }, [content]);

  const handlePlay = useCallback(() => {
    if (!isSupported || !contentRef.current?.trim() || !selectedVoice) {
      if (!contentRef.current?.trim())
        setErrorMsg("No content available to read.");
      else if (!selectedVoice && voices.length > 0)
        setErrorMsg(`No suitable voice available for ${lang}.`);
      else if (voices.length === 0)
        setErrorMsg("Loading voices or none available.");
      else if (!isSupported) setErrorMsg("Text-to-speech is not supported.");
      console.error("Cannot play audio: Pre-requisites not met.", {
        isSupported,
        hasContent: !!contentRef.current?.trim(),
        hasVoice: !!selectedVoice,
      });
      setPlaybackState("idle");
      setProgress(0);
      return;
    }

    console.log("Requesting play...");
    window.speechSynthesis.cancel();

    const startPlayback = () => {
      const utterance = new SpeechSynthesisUtterance(contentRef.current);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        console.log("Speech started.");
        setPlaybackState("playing");
        setProgress(0);
        setErrorMsg(null);
      };

      utterance.onpause = () => {
        console.log("Speech paused.");
        setPlaybackState("paused");
      };

      utterance.onresume = () => {
        console.log("Speech resumed.");
        setPlaybackState("playing");
      };

      utterance.onboundary = (event) => {
        if (event.name === "word" && contentRef.current?.length > 0) {
          const calculatedProgress = Math.round(
            (event.charIndex / contentRef.current.length) * 100
          );
          setProgress(calculatedProgress);
        }
      };

      utterance.onend = () => {
        console.log("Speech finished.");
        if (playbackState !== "paused") {
          setPlaybackState("idle");
          setProgress(0);
        }
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.error("SpeechSynthesis error:", event.error);
        if (event.error !== "interrupted" && event.error !== "canceled") {
          setErrorMsg(`Speech error: ${event.error}`);
        } else {
          console.warn(`Speech ${event.error}`);
        }
        setPlaybackState("idle");
        setProgress(0);
        utteranceRef.current = null;
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    };

    setTimeout(startPlayback, 50);
  }, [isSupported, selectedVoice, lang, voices, playbackState, errorMsg]);

  const handlePause = useCallback(() => {
    if (window.speechSynthesis?.speaking) {
      console.log("Requesting pause...");
      window.speechSynthesis.pause();
    }
  }, []);

  const handleResume = useCallback(() => {
    if (window.speechSynthesis?.paused) {
      console.log("Requesting resume...");
      window.speechSynthesis.resume();
    }
  }, []);

  const handleButtonClick = () => {
    setErrorMsg(null);
    console.log("Button clicked, current state:", playbackState);

    if (playbackState === "playing") {
      handlePause();
    } else if (playbackState === "paused") {
      handleResume();
    } else {
      handlePlay();
    }
  };

  const isBusy = playbackState === "playing" || playbackState === "paused";
  const isDisabled =
    !isSupported || !content?.trim() || voices.length === 0 || !selectedVoice;

  let buttonLabel = "Play audio content";
  if (playbackState === "playing") buttonLabel = "Pause audio content";
  if (playbackState === "paused") buttonLabel = "Resume audio content";

  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-lg w-full max-w-xs mx-auto space-y-3">
      <div className="h-5">
        {" "}
        {errorMsg && (
          <p className="text-sm text-red-400" role="alert">
            {errorMsg}
          </p>
        )}
      </div>

      <button
        onClick={handleButtonClick}
        disabled={isDisabled}
        aria-label={buttonLabel}
        title={buttonLabel}
        className={`flex justify-center items-center w-12 h-12 rounded-full bg-[#1f2335] border-2 border-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#7aa2f7] focus:ring-offset-2 focus:ring-offset-[#1a1b26] ${
          isDisabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#7aa2f7] cursor-pointer"
        }`}
      >
        {playbackState === "playing" ? (
          <FaPause style={{ color: "white" }} aria-hidden="true" />
        ) : (
          <FaPlay style={{ color: "white" }} aria-hidden="true" />
        )}
      </button>

      <div className="w-full h-2 bg-[#2f334d] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#7aa2f7] rounded-full transition-all duration-150 ease-linear"
          style={{ width: `${isBusy ? progress : 0}%` }}
          role="progressbar"
          aria-valuenow={isBusy ? progress : 0}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Audio playback progress"
        ></div>
      </div>
    </div>
  );
}

export default TextToSpeech;
