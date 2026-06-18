
export default function ModernTemplate({
  data,
}: {
  data: any;
}) {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="max-w-6xl mx-auto px-8 py-20">

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">

          <h1 className="text-6xl font-bold">
            {data.personalInfo?.fullName}
          </h1>

          <p className="mt-4 text-xl opacity-90">
            {data.summary}
          </p>

        </div>

      </section>
    </main>
  );
}

