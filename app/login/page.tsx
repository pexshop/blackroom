
"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { LockKeyhole, ArrowLeft } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    if (!supabase) {
      setError("Supabase 尚未配置");
      return;
    }

    setLoading(true);
    setError("");

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      setError(error.message);
    } else {
      window.location.href = "/chat";
    }

    setLoading(false);
  }

  async function register() {
    if (!supabase) {
      setError("Supabase 尚未配置");
      return;
    }

    if (password.length < 12) {
      setError("密码至少需要 12 个字符");
      return;
    }

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      setError(error.message);
    } else {
      setError("注册成功，请检查邮箱完成验证。");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        <Link href="/" className="text-zinc-500 flex items-center gap-2 text-sm mb-12">
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="text-center mb-12">
          <LockKeyhole
            size={32}
            className="mx-auto mb-6 text-zinc-300"
          />

          <h1 className="text-3xl tracking-[0.2em] font-light">
            BLACKROOM
          </h1>

          <p className="text-zinc-500 text-xs mt-4 tracking-widest">
            PRIVATE ACCESS
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="email"
            className="w-full bg-[#121316] border border-white/10 rounded-xl p-4 outline-none focus:border-white/40"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full bg-[#121316] border border-white/10 rounded-xl p-4 outline-none focus:border-white/40"
          />

          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-white text-black rounded-xl py-4 font-medium disabled:opacity-50"
          >
            Sign in
          </button>

          <button
            onClick={register}
            disabled={loading}
            className="w-full border border-white/15 rounded-xl py-4 text-zinc-300 disabled:opacity-50"
          >
            Create account
          </button>

          {error && (
            <p className="text-sm text-zinc-400 text-center break-words">
              {error}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}
