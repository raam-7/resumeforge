import Image from "next/image";

export default function Home() {
  return (
    <div className="p-10">
      <div className="bg-red-500 text-white p-6 rounded-xl">
        Red Test
      </div>

      <div className="bg-blue-500 text-white p-6 rounded-xl mt-4">
        Blue Test
      </div>

      <div className="bg-green-500 text-white p-6 rounded-xl mt-4">
        Green Test
      </div>
    </div>
  );
}