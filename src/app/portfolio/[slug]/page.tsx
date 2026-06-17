import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const portfolio =
    await prisma.portfolio.findUnique({
      where: {
        slug,
      },
    });

  if (!portfolio) {
    notFound();
  }

  const data = portfolio.data as any;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold">
        {data.personalInfo?.fullName}
      </h1>

      <p className="mt-4">
        {data.summary}
      </p>

      <h2 className="mt-8 text-2xl font-semibold">
        Projects
      </h2>

      {data.projects?.map(
        (project: any, index: number) => (
          <div
            key={index}
            className="mt-4 border rounded p-4"
          >
            <h3 className="font-bold">
              {project.name || project.title}
            </h3>

            <p>{project.description}</p>
          </div>
        )
      )}
    </main>
  );
}