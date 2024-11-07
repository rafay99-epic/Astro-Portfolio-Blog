import React from "react";

interface ComingSoonProps {
  featureName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ featureName }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br text-white p-6">
      <div className="max-w-lg text-center p-10 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-4 text-[#7aa2f7]">
          🚀 {featureName}
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Coming Soon!</h2>
        <p className="text-gray-300 mb-8">
          This feature is currently in development. Stay tuned for updates!
        </p>
        <button className="mt-6 px-6 py-3 bg-[#7aa2f7] hover:bg-[#4c88f7] text-white rounded-lg shadow-md transition duration-300">
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ComingSoon;
