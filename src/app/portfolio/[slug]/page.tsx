import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PortfolioRenderer from "@/components/portfolio/PortfolioRenderer";
import type { ThemeData } from "@/components/portfolio/themes/theme-types";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PortfolioPage({
  params,
}: PageProps) {
  const { slug } = await params;

  /*
   * Fetch portfolio from database
   */
  const portfolio =
    await prisma.portfolio.findUnique({
      where: {
        slug,
      },
    });

  /*
   * Portfolio does not exist
   */
  if (!portfolio) {
    notFound();
  }

  /*
   * Track portfolio view
   */
  await prisma.portfolioView.create({
    data: {
      portfolioId: portfolio.id,
    },
  });

  /*
   * Portfolio JSON data
   */
  const data =
    portfolio.data as unknown as ThemeData;

  /*
   * Render selected portfolio theme
   */
  return (
    <PortfolioRenderer
      template={portfolio.template}
      data={data}
    />
  );
}