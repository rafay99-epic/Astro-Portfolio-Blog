import React from "react";
import { useNewsletter } from "@react/newsletter/SubNewsletter/useNewletter";

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
    <div className="flex justify-center items-start">
      <div className="max-w-7xl w-full rounded-2xl overflow-hidden flex flex-col md:flex-row items-center md:px-16">
        <div className="md:w-1/2 flex justify-center items-center p-12 mobile:hidden">
          {" "}
          {/* Added mobile:hidden */}
          <img
            className="h-96 w-96 object-contain"
            src="/assets/sub-newsletter.png"
            alt="Avatar encouraging subscription"
          />
        </div>
        <div className="p-16 md:w-1/2 flex flex-col justify-center h-full">
          <div className="uppercase tracking-wide text-lg text-indigo-400 font-bold">
            Stay Connected
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Join Our Newsletter!
          </h2>
          <p className="mt-4 text-gray-300 leading-relaxed text-lg">
            Get the latest articles, tutorials, and exclusive offers delivered
            straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-6 py-4 text-gray-200 bg-gray-800 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="flex items-start mb-6">
              <input
                id="terms"
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="h-6 w-6 text-indigo-600 border-gray-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-4 text-lg text-gray-300">
                I agree to receive newsletters and accept the data privacy
                statement.
              </label>
            </div>

            {statusMessage && (
              <p className={`mt-3 text-lg text-center ${statusColor}`}>
                {statusMessage}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 px-6 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-[1.05]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
