import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
  where: {
    email: session.user.email,
  },
});

if (!user) {
  redirect("/api/auth/signin");
}

const totalPortfolios = await prisma.portfolio.count({
  where: {
    userId: user.id,
  },
});

const totalViews = await prisma.portfolioView.count({
  where: {
    portfolio: {
      userId: user.id,
    },
  },
});

const publishedPortfolios = await prisma.portfolio.count({
  where: {
    userId: user.id,
    published: true,
  },
});

return (
  <main className="min-h-screen bg-black text-white">

    {/* Top Navigation */}
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            ResumeForge
          </h1>

          <p className="text-zinc-400 text-sm mt-1">
            AI Powered Portfolio Builder
          </p>
        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">
            <p className="text-sm text-zinc-400">
              Logged in as
            </p>

            <p className="font-semibold">
              {session.user.email}
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-lg font-bold">
            {session.user.email?.charAt(0).toUpperCase()}
          </div>

        </div>

      </div>
    </header>

    {/* Hero */}
    <section className="max-w-7xl mx-auto px-8 py-12">

      <div className="rounded-[36px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-10 shadow-[0_0_80px_rgba(34,211,238,0.15)]">

        <h2 className="text-5xl font-extrabold">
          Welcome back 👋
        </h2>

        <p className="mt-4 text-xl text-cyan-100 max-w-3xl">
          Create stunning AI-powered portfolios from your resume,
          track analytics, manage themes, and showcase your work professionally.
        </p>

        <div className="flex flex-wrap gap-4 mt-8">

          <Link
            href="/dashboard/generate"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:scale-105 transition"
          >
            Generate Portfolio
          </Link>

          <Link
            href="/dashboard/analytics"
            className="px-6 py-3 rounded-xl border border-white/40 hover:bg-white/10 transition"
          >
            View Analytics
          </Link>

        </div>

      </div>

    </section>

    <section className="max-w-7xl mx-auto px-8 pb-12">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-zinc-400 text-sm">Total Portfolios</p>
      <h3 className="mt-3 text-4xl font-bold">{totalPortfolios}</h3>
    </div>

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-zinc-400 text-sm">Portfolio Views</p>
      <h3 className="mt-3 text-4xl font-bold">{totalViews}</h3>
    </div>

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-zinc-400 text-sm">Published</p>
      <h3 className="mt-3 text-4xl font-bold">{publishedPortfolios}</h3>
    </div>

    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-zinc-400 text-sm">Resume Score</p>
      <h3 className="mt-3 text-4xl font-bold text-cyan-400">92%</h3>
      <p className="mt-2 text-xs text-zinc-500">
        AI score (coming soon)
      </p>
    </div>

  </div>
</section>

  </main>
);
}
