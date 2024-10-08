// hooks/useContactForm.ts
import { useState, type ChangeEvent, type FormEvent } from "react";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    const data = new FormData();
    data.append("access_key", "c0613ed5-2935-40a1-8d33-b32fd9eea403");
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        setFormStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Clear the URL after successful submission
        window.history.replaceState(null, "", window.location.pathname);
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
  };
};
