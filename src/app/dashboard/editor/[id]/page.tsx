"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { PortfolioData } from "@/types/portfolio";

type ApiResult = { success?: boolean; error?: string; portfolio?: { slug: string; template: string; data: PortfolioData } };
async function parseApiResponse(response: Response): Promise<ApiResult> {
  const text = await response.text();
  if (!text) throw new Error(`Server returned an empty response (${response.status})`);
  try { return JSON.parse(text) as ApiResult; } catch { throw new Error(`Server returned invalid JSON (${response.status}): ${text.slice(0, 300)}`); }
}
const sections: Array<keyof PortfolioData> = ["skills", "experience", "projects", "education", "certifications", "achievements", "languages", "interests", "socialLinks"];
export default function PortfolioEditorPage() {
  const { id } = useParams<{ id: string }>(); const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null); const [slug, setSlug] = useState(""); const [template, setTemplate] = useState("developer");
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [message, setMessage] = useState("");
  useEffect(() => { if (!id) return; void (async () => { try { const result = await parseApiResponse(await fetch(`/api/portfolio/${id}`)); if (!result.portfolio) throw new Error(result.error || "Portfolio not found."); setData(result.portfolio.data); setSlug(result.portfolio.slug); setTemplate(result.portfolio.template || "developer"); } catch (error) { setMessage(error instanceof Error ? error.message : "Failed to load portfolio."); } finally { setLoading(false); } })(); }, [id]);
  const update = (section: keyof PortfolioData, value: unknown) => setData(current => current ? { ...current, [section]: value } : current);
  const updateNested = (section: "personalInfo" | "professionalProfile", field: string, value: string) => setData(current => current ? { ...current, [section]: { ...current[section], [field]: value } } : current);
  async function save() { if (!data) return; setSaving(true); setMessage(""); try { const result = await parseApiResponse(await fetch(`/api/portfolio/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ data, template }) })); if (!result.success) throw new Error(result.error || "Failed to save portfolio."); setMessage("Portfolio saved successfully."); } catch (error) { setMessage(error instanceof Error ? error.message : "Failed to save portfolio."); } finally { setSaving(false); } }
  if (loading) return <main className="min-h-screen bg-black p-8 text-white">Loading portfolio...</main>;
  if (!data) return <main className="min-h-screen bg-black p-8 text-red-400">{message || "Portfolio could not be loaded."}</main>;
  const input = "mt-2 w-full rounded-xl border border-zinc-700 bg-black px-4 py-3 text-white outline-none focus:border-cyan-400";
  return <main className="min-h-screen bg-black text-white"><div className="mx-auto max-w-6xl px-6 py-10"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-cyan-400">ResumeForge</p><h1 className="mt-2 text-4xl font-bold">Edit Portfolio</h1></div><div className="flex gap-3"><button className="rounded-xl border border-zinc-700 px-5 py-3" onClick={() => router.push(`/portfolio/${slug}`)}>Preview</button><button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black disabled:opacity-50" disabled={saving} onClick={save}>{saving ? "Saving..." : "Save Changes"}</button></div></div>{message && <p className="mt-6 rounded-xl border border-zinc-800 p-4 text-sm">{message}</p>}
    <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-xl font-semibold">Portfolio Theme</h2><select className={input+" md:w-96"} value={template} onChange={e => setTemplate(e.target.value)}><option value="developer">Developer</option><option value="modern">Modern</option><option value="corporate">Corporate</option><option value="ai">AI Neon</option></select></section>
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-xl font-semibold">Personal Information</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{(["fullName","email","phone","location","website"] as const).map(field => <label key={field} className="text-sm text-zinc-400">{field}<input className={input} value={data.personalInfo?.[field] || ""} onChange={e => updateNested("personalInfo", field, e.target.value)} /></label>)}</div></section>
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-xl font-semibold">Professional Profile</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{(["title","domain","seniority"] as const).map(field => <label key={field} className="text-sm text-zinc-400">{field}<input className={input} value={data.professionalProfile?.[field] || ""} onChange={e => updateNested("professionalProfile", field, e.target.value)} /></label>)}</div></section>
    <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-xl font-semibold">Summary</h2><textarea className={input} rows={6} value={data.summary || ""} onChange={e => update("summary", e.target.value)} /></section>
    {sections.map(section => <section key={section} className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><h2 className="text-xl font-semibold capitalize">{section}</h2><textarea className={input+" mt-5 font-mono text-sm"} rows={Math.min(18, Math.max(5, JSON.stringify(data[section], null, 2).split("\n").length))} value={JSON.stringify(data[section], null, 2)} onChange={e => { try { update(section, JSON.parse(e.target.value) as PortfolioData[typeof section]); } catch { /* Keep the current value until valid JSON is entered. */ } }} /></section>)}
    <button className="mt-8 rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black" disabled={saving} onClick={save}>{saving ? "Saving..." : "Save Portfolio"}</button></div></main>;
}
