import { useState, type ChangeEvent, type FormEvent } from "react";
import authorConfig from "@util/info";
import { addContactToNotion } from "@pages/api/notion";

const webformKeyAuthorFile = authorConfig.webformKey;
const hcaptchaSiteKeyAuthorFile = authorConfig.hcaptchaSiteKey;

let {
  PUBLIC_WEBFORM_KEY: webformKey,
  PUBLIC_HCAPTCHA_SITE_KEY: hcaptchaSiteKey,
} = import.meta.env;

if (!webformKey) {
  if (!webformKeyAuthorFile) {
    console.error("Missing webform configuration");
  }
  webformKey = webformKeyAuthorFile;
}

if (!hcaptchaSiteKey) {
  if (!hcaptchaSiteKeyAuthorFile) {
    console.error("Missing hCaptcha configuration");
  }
  hcaptchaSiteKey = hcaptchaSiteKeyAuthorFile;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<
    "success" | "error" | "loading" | null
  >(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCaptchaVerify = (token: string) => {
    setHCaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!hCaptchaToken) {
      alert("Please complete the hCaptcha.");
      return;
    }

    setFormStatus("loading");

    const data = new FormData();
    data.append("access_key", webformKey);
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);
    data.append("h-captcha-response", hCaptchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        //  Disabling Notion api becuase it does not work with static site generator
        // Need to convert this into a serverless function
        // Notion API is present in the pages/api/notion.ts file
        // await addContactToNotion(
        //   formData.name,
        //   formData.email,
        //   formData.message
        // );

        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setHCaptchaToken(null);
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return {
    formData,
    formStatus,
    handleChange,
    handleSubmit,
    handleCaptchaVerify,
    hcaptchaSiteKey,
  };
};
