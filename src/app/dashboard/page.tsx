import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">
        ResumeForge Dashboard
      </h1>

      <div className="mt-6 rounded-lg border p-4">
        <p>Logged in as:</p>

        <p className="font-medium">
          {session.user.email}
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/dashboard/ai-test"
          className="rounded-lg border px-4 py-2 inline-block"
        >
          Generate Portfolio
        </Link>
      </div>
    </main>
  );
}