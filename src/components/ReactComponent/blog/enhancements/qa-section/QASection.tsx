import React from "react";
import { QASectionLogic } from "./QASectionLogic";
import { QASectionUI } from "./QASectionUI";

interface QASectionProps {
  title: string;
  description: string;
  author: string;
  content: string;
}

export default function QASection({
  title,
  description,
  author,
  content,
}: QASectionProps) {
  const qaLogic = QASectionLogic({
    title,
    description,
    author,
    content,
  });

  return <QASectionUI {...qaLogic} />;
}
