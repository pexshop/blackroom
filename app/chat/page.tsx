
"use client";

import { useState } from "react";
import {
  Lock,
  Send,
  ShieldCheck,
  MoreHorizontal,
  ArrowLeft,
  UserRound
} from "lucide-react";

export default function Chat() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen bg-[#08090b] text-white flex flex-col">

      <header className="h-20 border-b border-white/[0.08] px-5 md:px-10 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <ArrowLeft size={18} className="text-zinc-500" />

          <div>
            <h1 className="tracking-[0.25em] text-sm">
              BLACKROOM
            </h1>

            <p className="text-[10px] text-zinc-600 mt-1">
              PRIVATE SPACE
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <ShieldCheck size={18} />
          <MoreHorizontal size={20} />
        </div>

      </header>

      <section className="flex-1 flex flex-col items-center justify-center p-6">

        <div className="w-20 h-20 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center">
          <UserRound size={28} className="text-zinc-400" />
        </div>

        <h2 className="mt-7 tracking-[0.2em] text-lg">
          YOUR PRIVATE ROOM
        </h2>

        <p className="text-xs text-zinc-600 mt-3 text-center leading-6">
          A private space for two people.
          <br />
          Your conversations stay private.
        </p>

        <div className="mt-10 border border-white/10 rounded-2xl px-5 py-4 text-xs text-zinc-500 flex items-center gap-3">
          <Lock size={14} />
          Waiting for secure connection
        </div>

      </section>

      <form
        onSubmit={e => {
          e.preventDefault();
          setMessage("");
        }}
        className="p-4 md:px-10 border-t border-white/[0.08]"
      >

        <div className="max-w-3xl mx-auto flex items-center gap-3 bg-[#151619] border border-white/10 rounded-2xl px-4 py-2">

          <input
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write a private message..."
            className="flex-1 bg-transparent outline-none text-sm py-3 min-w-0"
          />

          <button
            type="submit"
            disabled={!message.trim()}
            className="text-white disabled:text-zinc-700"
          >
            <Send size={19} />
          </button>

        </div>

        <p className="text-center text-[10px] text-zinc-700 mt-4 tracking-widest">
          PRIVATE COMMUNICATION
        </p>

      </form>

    </main>
  );
}
