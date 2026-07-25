"use client";

import { useState } from "react";
import UploadZone from "@/components/upload/UploadZone";

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  function handleFile(selectedFile: File) {
    setFile(selectedFile);
  }

  async function uploadResume() {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.error || "Upload failed.");
        return;
      }

      alert("Resume uploaded successfully!");

      // Clear selected file after successful upload
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">
          Upload Resume
        </h1>

        <p className="mt-3 text-zinc-400">
          Upload your resume and let AI generate your portfolio.
        </p>

        <div className="mt-10">
          <UploadZone onFileSelect={handleFile} />
        </div>

        {file && (
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-lg font-semibold">
              Selected File
            </h3>

            <p className="mt-3">{file.name}</p>

            <p className="text-zinc-500">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <button
              onClick={uploadResume}
              disabled={uploading}
              className="mt-6 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}