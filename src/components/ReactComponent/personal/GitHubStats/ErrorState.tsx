import React from "react";
import { memo } from "react";

interface ErrorStateProps {
  error: string;
}

const ErrorState = memo(function ErrorState({ error }: ErrorStateProps) {
  return (
    <section className="github-stats-section relative overflow-hidden py-16">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <p className="text-xl text-red-400">
            Error loading GitHub stats: {error}
          </p>
        </div>
      </div>
    </section>
  );
});

export default ErrorState;
