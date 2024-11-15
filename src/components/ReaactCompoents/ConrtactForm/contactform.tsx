import React from "react";
import { useContactForm } from "@react/ConrtactForm/contactFormHook";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ContactForm: React.FC = () => {
  const {
    formData,
    formStatus,
    handleChange,
    handleSubmit,
    handleCaptchaVerify,
    hcaptchaSiteKey,
  } = useContactForm();

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
          />
        </div>

        <div>
          <HCaptcha sitekey={hcaptchaSiteKey} onVerify={handleCaptchaVerify} />
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

      {formStatus === "success" && (
        <div className="mt-4 p-4 bg-green-500 text-white rounded-lg">
          <p className="flex items-center">Message sent successfully!</p>
        </div>
      )}

      {formStatus === "error" && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
          <p className="flex items-center">
            Failed to send the message. Please try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
