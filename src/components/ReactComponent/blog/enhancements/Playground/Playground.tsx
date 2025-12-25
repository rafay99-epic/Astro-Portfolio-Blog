import React, { useState } from "react";
import PlaygroundEditor from "./PlaygroundEditor";
import PlaygroundPreview from "./PlaygroundPreview";
import { motion } from "framer-motion";

interface PlaygroundProps {
  initialCode?: string;
  language?: "typescript" | "javascript" | "dart";
  title?: string;
  height?: string;
}

const DEFAULT_REACT_CODE = `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { motion } from 'framer-motion';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Text style={styles.title}>Interactive Playground</Text>
      </motion.div>
      
      <Text style={styles.counter}>Count: {count}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setCount(c => c + 1)}
      >
        <Text style={styles.buttonText}>Click Me!</Text>
      </TouchableOpacity>
      
      <Text style={styles.hint}>Edit the code on the left to see changes!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7aa2f7',
    marginBottom: 20,
  },
  counter: {
    fontSize: 48,
    color: '#white',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#394b70',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#7aa2f7',
  },
  buttonText: {
    color: '#7aa2f7',
    fontWeight: 'bold',
    fontSize: 18,
  },
  hint: {
    marginTop: 20,
    color: '#565f89',
    fontSize: 12,
    fontStyle: 'italic',
  }
});
`;

const DEFAULT_DART_CODE = `void main() {
  print('Hello, World!');
  
  for (int i = 0; i < 5; i++) {
    print('hello \${i + 1}');
  }
}
`;

const Playground = ({
  initialCode,
  language = "typescript",
  title = "Interactive Playground",
  height = "500px",
}: PlaygroundProps) => {
  const [code, setCode] = useState(
    initialCode ||
      (language === "dart" ? DEFAULT_DART_CODE : DEFAULT_REACT_CODE),
  );
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <motion.div
      className="my-12 flex flex-col gap-0 overflow-hidden rounded-2xl border border-[#414868]/30 bg-[#1a1b26]/50 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Header with Tabs */}
      <div className="flex items-center justify-between border-b border-[#414868]/30 bg-[#1f2335]/80 px-6 py-3">
        <div className="flex items-center gap-4">
          <h3 className="text-sm font-bold tracking-tight text-[#c0caf5]">
            {title}
          </h3>
          <div className="flex rounded-lg bg-[#24283b] p-1">
            <button
              onClick={() => setActiveTab("preview")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-[#7aa2f7] text-white shadow-lg"
                  : "text-[#565f89] hover:text-[#7aa2f7]"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-all ${
                activeTab === "code"
                  ? "bg-[#7aa2f7] text-white shadow-lg"
                  : "text-[#565f89] hover:text-[#7aa2f7]"
              }`}
            >
              Code
            </button>
          </div>
        </div>
        <span className="rounded-md bg-[#414868]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-[#7aa2f7]">
          {language}
        </span>
      </div>

      {/* Content Area */}
      <div className="relative" style={{ height: height }}>
        <div
          className={`h-full w-full ${activeTab === "code" ? "block" : "hidden"}`}
        >
          <PlaygroundEditor
            code={code}
            onChange={(val) => setCode(val || "")}
            language={language === "dart" ? "dart" : "typescript"}
          />
        </div>

        <div
          className={`h-full w-full ${activeTab === "preview" ? "block" : "hidden"}`}
        >
          <PlaygroundPreview code={code} language={language} />
        </div>
      </div>
    </motion.div>
  );
};

export default Playground;
