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

  /*
   * Get portfolios belonging only to
   * the currently logged-in user.
   */
  const portfolios =
    await prisma.portfolio.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        template: true,
        published: true,
        createdAt: true,
        _count: {
          select: {
            views: true,
          },
        },
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

      {/* My Portfolios */}
      <section className="mx-auto max-w-7xl px-8 pb-16">

        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              My Portfolios
            </h2>

            <p className="mt-2 text-zinc-500">
              Manage, edit, preview, and customize
              your generated portfolios.
            </p>
          </div>

          <Link
            href="/dashboard/upload"
            className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/20 md:mt-0"
          >
            + Create New Portfolio
          </Link>

        </div>

        {portfolios.length === 0 ? (

          <div className="mt-8 rounded-3xl border border-dashed border-zinc-800 bg-zinc-950 p-12 text-center">

            <h3 className="text-xl font-semibold">
              No portfolios yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              Upload your resume and let ResumeForge
              generate your first AI-powered portfolio.
            </p>

            <Link
              href="/dashboard/upload"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400"
            >
              Generate Portfolio
            </Link>

          </div>

        ) : (

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            {portfolios.map(
              (portfolio) => (
                <article
                  key={portfolio.id}
                  className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-zinc-700"
                >

                  {/* Portfolio header */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <h3 className="truncate text-xl font-semibold">
                        {portfolio.title}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        /portfolio/
                        {portfolio.slug}
                      </p>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        portfolio.published
                          ? "border border-green-500/20 bg-green-500/10 text-green-400"
                          : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {portfolio.published
                        ? "Published"
                        : "Draft"}
                    </span>

                  </div>

                  {/* Metadata */}
                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <div className="rounded-xl border border-zinc-800 bg-black p-4">

                      <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Theme
                      </p>

                      <p className="mt-2 font-medium capitalize text-zinc-300">
                        {portfolio.template}
                      </p>

                    </div>

                    <div className="rounded-xl border border-zinc-800 bg-black p-4">

                      <p className="text-xs uppercase tracking-wider text-zinc-600">
                        Views
                      </p>

                      <p className="mt-2 font-medium text-cyan-400">
                        {portfolio._count.views}
                      </p>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">

                    <Link
                      href={`/portfolio/${portfolio.slug}`}
                      className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                      View Portfolio
                    </Link>

                    <Link
                      href={`/dashboard/editor/${portfolio.id}`}
                      className="rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400"
                    >
                      Edit Portfolio
                    </Link>

                  </div>

                </article>
              )
            )}

          </div>

        )}

      </section>

    </main>
  );
}