import { useState } from "react";
import { FiUploadCloud, FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";
import { generateUploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@server/uploadthing";

const UploadButton = generateUploadButton<OurFileRouter>();

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  const handleCopy = async () => {
    if (!imageUrl) return;
    await navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto p-10 rounded-2xl border-2 border-dashed"
      style={{
        background: "var(--accent-dark)",
        borderColor: "var(--accent)",
        color: "var(--text-light)",
        boxShadow: "var(--box-shadow)",
      }}
    >
      <div className="flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="flex flex-col items-center gap-6 w-full md:w-1/2">
          <FiUploadCloud className="text-6xl text-[var(--accent)]" />
          <h2 className="text-3xl font-bold text-center">Upload an Image</h2>
          <p className="text-sm text-center text-gray-300">
            Choose a file to preview and upload it to the server.
          </p>

          <label className="cursor-pointer bg-[var(--accent)] hover:bg-blue-500 transition-all text-white px-6 py-3 rounded-lg">
            Select Image
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <UploadButton
            endpoint="imageUploader"
            className="ut-button:bg-[var(--accent)] ut-button:text-white ut-button:hover:bg-blue-500 ut-button:transition-all ut-button:duration-300 ut-button:rounded-md ut-button:px-5 ut-button:py-2"
            disabled={!selectedFile}
            onUploadError={(error: Error) => alert(`ERROR! ${error.message}`)}
            onClientUploadComplete={(res) => {
              if (res && res[0]?.url) {
                console.log("Upload successful: ", res[0]);
                setImageUrl(res[0].url);
              }
              setPreview(null);
              setSelectedFile(null);
            }}
          />
        </div>

        <div className="w-full md:w-1/2">
          {preview ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden border border-[var(--accent)] shadow-lg"
            >
              <img src={preview} alt="Preview" className="w-full h-auto" />
              {selectedFile && (
                <p className="mt-2 text-sm text-center text-gray-300">
                  Previewing: <strong>{selectedFile.name}</strong>
                </p>
              )}
            </motion.div>
          ) : (
            <div className="text-center text-gray-400 border border-dashed border-gray-500 p-10 rounded-xl">
              No image selected
            </div>
          )}
        </div>
      </div>

      {imageUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-gray-800 p-4 rounded-xl flex items-center justify-between gap-4 text-white"
        >
          <span className="truncate">{imageUrl}</span>
          <button
            onClick={handleCopy}
            className="bg-[var(--accent)] hover:bg-blue-500 px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiCopy />
            {copied ? "Copied!" : "Copy"}
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
