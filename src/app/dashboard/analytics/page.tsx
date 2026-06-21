import { prisma } from "@/lib/prisma";
import AnalyticsChart from "@/components/AnalyticsChart";
import { getViewsLast7Days } from "@/lib/analytics";

export default async function AnalyticsPage() {
  const totalViews =
    await prisma.portfolioView.count();

  const totalPortfolios =
    await prisma.portfolio.count();

  const totalUsers =
    await prisma.user.count();

  const topPortfolio =
    await prisma.portfolio.findFirst({
      include: {
        _count: {
          select: {
            views: true,
          },
        },
      },
      orderBy: {
        views: {
          _count: "desc",
        },
      },
    });

  const chartData =
  await getViewsLast7Days();
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 border border-cyan-500 rounded-3xl p-8">
          <h2 className="text-cyan-400 text-xl">
            Portfolio Views
          </h2>

          <p className="text-5xl font-bold mt-4">
            {totalViews}
          </p>
        </div>

        <div className="bg-zinc-900 border border-purple-500 rounded-3xl p-8">
          <h2 className="text-purple-400 text-xl">
            Total Portfolios
          </h2>

          <p className="text-5xl font-bold mt-4">
            {totalPortfolios}
          </p>
        </div>

        <div className="bg-zinc-900 border border-pink-500 rounded-3xl p-8">
          <h2 className="text-pink-400 text-xl">
            Users
          </h2>

          <p className="text-5xl font-bold mt-4">
            {totalUsers}
          </p>
        </div>

      </div>

      {/* TRENDING */}
      {topPortfolio && (
        <div className="mb-10 bg-zinc-900 border border-green-500 rounded-3xl p-8">

          <h2 className="text-green-400 text-2xl font-bold">
            🔥 Trending Portfolio
          </h2>

          <h3 className="text-3xl font-bold mt-4">
            {topPortfolio.title}
          </h3>

          <p className="text-zinc-400 mt-2">
            {topPortfolio._count.views} views
          </p>

        </div>
      )}

      {/* CHART */}
      <AnalyticsChart
        data={chartData}
      />

    </main>
  );
}