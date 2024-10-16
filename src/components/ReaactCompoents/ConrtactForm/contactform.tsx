// components/ContactForm.tsx
import React from "react";
import { useContactForm } from "../ConrtactForm/contactFormHook"; // Import the custom hook

const ContactForm: React.FC = () => {
  const { formData, formStatus, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-xxl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-200"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-gray-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-gray-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-lg font-medium text-gray-200"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={10}
            value={formData.message}
            onChange={handleChange}
            required
            className="mt-1 p-2 block w-full rounded-md bg-gray-700 border-gray-500 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-medium transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>

      {/* Success Message */}
      {formStatus === "success" && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
          <p className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            Message sent successfully!
          </p>
        </div>
      )}

      {/* Error Message */}
      {formStatus === "error" && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
          <p className="flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            Failed to send the message. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
