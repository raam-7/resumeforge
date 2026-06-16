"use client";

export default function UploadPage() {
  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    alert("File selected");

    const file = event.target.files?.[0];

    if (!file) {
      alert("No file found");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    alert(JSON.stringify(data));
  }

  return (
    <main className="min-h-screen p-8">
      <h1>Upload Resume</h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleUpload}
      />
    </main>
  );
}