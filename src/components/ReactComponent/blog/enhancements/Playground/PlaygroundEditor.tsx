import Editor from "@monaco-editor/react";
import { useEffect, memo } from "react";

interface PlaygroundEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

const PlaygroundEditor = memo(function PlaygroundEditor({
  code,
  onChange,
  language = "typescript",
}: PlaygroundEditorProps) {
  useEffect(() => {
    // Custom theme configuration could go here if needed
  }, []);

  // Map language to Monaco language ID
  const getMonacoLanguage = (lang: string) => {
    const langMap: Record<string, string> = {
      typescript: "typescript",
      javascript: "javascript",
      dart: "dart",
      bash: "shell",
      python: "python",
    };
    return langMap[lang] || "typescript";
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        language={getMonacoLanguage(language)}
        value={code}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          cursorStyle: "line",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          contextmenu: false,
          wordWrap: "on",
          tabSize: 2,
        }}
      />
    </div>
  );
});

export default PlaygroundEditor;
