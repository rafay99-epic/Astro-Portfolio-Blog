import React, { useState, useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

interface CodeTabsProps {
  code1: string;
  code2: string;
  language1: string;
  language2: string;
  file1Title?: string;
  file2Title?: string;
}

const CodeTabs: React.FC<CodeTabsProps> = ({
  code1,
  code2,
  language1,
  language2,
  file1Title = "File 1",
  file2Title = "File 2",
}) => {
  const [activeTab, setActiveTab] = useState<"file1" | "file2">("file1");
  const code1Ref = useRef<HTMLDivElement>(null);
  const code2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hljs.highlightAll();
    if (code1Ref.current) {
      hljs.highlightElement(code1Ref.current);
    }
    if (code2Ref.current) {
      hljs.highlightElement(code2Ref.current);
    }
  }, [activeTab, code1, code2, language1, language2]);

  return (
    <div className="rounded-lg shadow-sm mb-6 overflow-hidden">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 text-white hover:bg-gray-700 transition-colors ${
            activeTab === "file1" ? "bg-gray-700 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("file1")}
        >
          {file1Title}
        </button>
        <button
          className={`px-4 py-2 text-white hover:bg-gray-700 transition-colors ${
            activeTab === "file2" ? "bg-gray-700 font-semibold" : ""
          }`}
          onClick={() => setActiveTab("file2")}
        >
          {file2Title}
        </button>
      </div>

      <div className="p-4">
        {activeTab === "file1" && (
          <pre className="rounded-md p-4 overflow-x-auto">
            <code ref={code1Ref} className={`language-${language1}`}>
              {code1}
            </code>
          </pre>
        )}
        {activeTab === "file2" && (
          <pre className="rounded-md p-4 overflow-x-auto">
            <code ref={code2Ref} className={`language-${language2}`}>
              {code2}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeTabs;
