import { useContactForm } from "../ConrtactForm/contactFormHook";
import { useState, useEffect } from "react";

const ContactMap = () => {
  const { formData, formStatus, handleChange, handleSubmit } = useContactForm();
  const [showMap, setShowMap] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowMap(false);
      } else {
        setShowMap(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row w-full h-full">
      {/* Contact Form */}
      <div className="w-full sm:w-1/2 p-8 bg-gray-800 text-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            aria-label="Your Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            aria-label="Your Email"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-3 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            aria-label="Your Message"
          ></textarea>

          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            disabled={formStatus === "loading"}
          >
            {formStatus === "loading" ? "Submitting..." : "Submit"}
          </button>
        </form>

        {/* Display form status messages */}
        {formStatus === "success" && (
          <div className="mt-4 p-4 bg-green-600 text-white rounded-lg transition-opacity duration-300">
            Thank you! We’ll get back to you soon.
          </div>
        )}
        {formStatus === "error" && (
          <div className="mt-4 p-4 bg-red-600 text-white rounded-lg transition-opacity duration-300">
            Oops! Something went wrong. Please try again.
          </div>
        )}
      </div>

      {/* Google Map */}
      {showMap && (
        <div className="w-full sm:w-1/2 h-64 sm:h-96 mb-8 sm:mb-0 sm:ml-4">
          <iframe
            title="Google Map"
            className="w-full h-full rounded-lg shadow-lg transition-transform transform hover:scale-105"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.2621789003247!2d73.0461689764773!3d33.59850127333117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df94845cbcdbc7%3A0x937f5539de027943!2sFashion%20Hub!5e0!3m2!1sen!2s!4v1724187834820!5m2!1sen!2s"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ContactMap;
