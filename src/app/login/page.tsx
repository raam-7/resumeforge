    "use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      alert("Invalid email or password");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white px-6">

      <div className="w-full max-w-md rounded-3xl border border-cyan-500 bg-zinc-900 p-8 shadow-[0_0_40px_rgba(34,211,238,0.25)]">

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <p className="text-center text-zinc-400 mt-3">
          Login to ResumeForge
        </p>

        <div className="space-y-5 mt-8">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-3 outline-none focus:border-cyan-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl bg-zinc-800 border border-zinc-700 p-3 outline-none focus:border-cyan-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 py-3 font-semibold hover:scale-[1.02] transition"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </div>

        <p className="mt-6 text-center text-zinc-400">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </a>
        </p>

      </div>

    </main>
  );
}