import Editor, { loader } from "@monaco-editor/react";
import { useEffect, memo } from "react";

interface PlaygroundEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

// Pre-configure Monaco
loader.config({
  paths: {
    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.55.1/min/vs",
  },
});

const PlaygroundEditor = memo(function PlaygroundEditor({
  code,
  onChange,
  language = "typescript",
}: PlaygroundEditorProps) {
  useEffect(() => {
    // Custom theme configuration could go here if needed
  }, []);

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        value={code} // Changed from defaultValue to value to ensure updates from MDX initialCode work
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true, // This is key for tab switching resizing
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
