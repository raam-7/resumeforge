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

  const totalPortfolios =
    await prisma.portfolio.count({
      where: {
        userId: user.id,
      },
    });

  const totalViews =
    await prisma.portfolioView.count({
      where: {
        portfolio: {
          userId: user.id,
        },
      },
    });

  const publishedPortfolios =
    await prisma.portfolio.count({
      where: {
        userId: user.id,
        published: true,
      },
    });

  return (
    <main className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-3xl font-bold text-transparent">
              ResumeForge
            </h1>

            <p className="mt-1 text-sm text-zinc-400">
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

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-lg font-bold">
              {session.user.email
                ?.charAt(0)
                .toUpperCase()}
            </div>

          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-8 py-12">

        <div className="rounded-[36px] bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-10 shadow-[0_0_80px_rgba(34,211,238,0.15)]">

          <h2 className="text-5xl font-extrabold">
            Welcome back 👋
          </h2>

          <p className="mt-4 max-w-3xl text-xl text-cyan-100">
            Create stunning AI-powered portfolios
            from your resume, track analytics,
            manage themes, and showcase your work
            professionally.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            {/* IMPORTANT:
                New users start from upload.
            */}
            <Link
              href="/dashboard/upload"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
            >
              Generate Portfolio
            </Link>

            <Link
              href="/dashboard/analytics"
              className="rounded-xl border border-white/40 px-6 py-3 transition hover:bg-white/10"
            >
              View Analytics
            </Link>

          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="mx-auto max-w-7xl px-8 pb-12">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {/* Portfolios */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <p className="text-sm text-zinc-400">
              Total Portfolios
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              {totalPortfolios}
            </h3>

          </div>

          {/* Views */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <p className="text-sm text-zinc-400">
              Portfolio Views
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              {totalViews}
            </h3>

          </div>

          {/* Published */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <p className="text-sm text-zinc-400">
              Published
            </p>

            <h3 className="mt-3 text-4xl font-bold">
              {publishedPortfolios}
            </h3>

          </div>

          {/* Resume Score */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <p className="text-sm text-zinc-400">
              Resume Score
            </p>

            <h3 className="mt-3 text-4xl font-bold text-cyan-400">
              92%
            </h3>

            <p className="mt-2 text-xs text-zinc-500">
              AI score (coming soon)
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}