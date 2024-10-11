import React from "react";
import { useNewsletter } from "./useNewletter";

const Newsletter: React.FC = () => {

  const {
    email,
    setEmail,
    isAgreed,
    setIsAgreed,
    statusMessage,
    statusColor,
    handleSubmit,
  } = useNewsletter();

  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-br">
      <div
        className=" rounded-lg shadow-lg p-8 w-full max-w-4xl"
        style={{
          boxShadow:
            "0 2px 6px rgba(76, 80, 106, 0.25), 0 8px 24px rgba(76, 80, 106, 0.33), 0 16px 32px rgba(76, 80, 106, 0.33)",
        }}
      >
        <h2 className="text-5xl font-extrabold text-center text-white mb-6">
          Subscribe to my Newsletter
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-300"
            >
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#7aa2f7] bg-gray-700 text-gray-200"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center text-gray-300 text-sm">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="mr-2 focus:ring focus:ring-[#7aa2f7]"
              />
              I agree to receive your newsletters and accept the data privacy
              statement.
            </label>
          </div>

          {statusMessage && (
            <p className={`mt-2 text-center ${statusColor}`}>{statusMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 mt-4 rounded-md transition-all duration-300 ease-in-out bg-[#7aa2f7] hover:bg-[#6571e0] text-white font-semibold text-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
