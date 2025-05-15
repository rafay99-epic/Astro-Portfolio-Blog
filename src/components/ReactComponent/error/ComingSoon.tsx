import React from "react";

interface ComingSoonProps {
  featureName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br text-white p-6" role="main">
      <div className="max-w-lg text-center p-10 rounded-lg shadow-xl" role="alert" aria-live="polite">
        <h1 className="text-4xl font-bold mb-4 text-[#7aa2f7]">
          🚀 {featureName}
        </h1>
        <h2 className="text-2xl font-semibold mb-2" aria-label={`${featureName} coming soon`}>Coming Soon!</h2>
        <p className="text-gray-300 mb-8">
          This feature is currently in development. Stay tuned for updates!
        </p>
        <a
          className="mt-6 px-6 py-3 bg-[#7aa2f7] hover:text-gray-800 text-white rounded-lg shadow-md transition duration-300 inline-flex items-center"
          href="/"
          aria-label="Return to homepage"
          role="button"
        >
          <span>Back to Home</span>
          <span className="ml-2">←</span>
        </a>
      </div>
    </div>
  );
};

export default ComingSoon;
