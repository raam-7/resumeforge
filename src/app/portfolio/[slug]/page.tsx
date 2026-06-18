
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import DeveloperTemplate from "@/components/templates/DeveloperTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import CorporateTemplate from "@/components/templates/CorporateTemplate";
import AITheme from "@/components/templates/AITheme";
export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { slug },
  });

  if (!portfolio) {
    notFound();
  }

  const data = portfolio.data as any;

  const template =
  portfolio.template || "developer";
 if (template === "modern") {
  return (
    <ModernTemplate
      data={data}
    />
  );
}

if (template === "corporate") {
  return (
    <CorporateTemplate
      data={data}
    />
  );
}
if (template === "ai") {
  return (
    <AITheme
      data={data}
    />
  );
}
return (
  <DeveloperTemplate
    data={data}
  />
);
}

