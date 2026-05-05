import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#aeefff] to-[#d8b4fe] opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-[#fbcfe8] to-[#d8b4fe] opacity-40 blur-3xl" />
        <h2 className="relative text-3xl font-bold tracking-tight md:text-5xl">
          Get occasional dispatches.
        </h2>
        <p className="relative mt-3 text-foreground/60">
          Notes on craft, motion and shipping. No spam.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setDone(true);
          }}
          className="relative mx-auto mt-8 flex max-w-md items-center gap-2 rounded-full glass p-1.5 focus-within:ring-2 focus-within:ring-primary/40 focus-within:shadow-[0_0_30px_rgba(168,139,250,0.4)] transition-shadow"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-foreground/40"
          />
          <button
            data-cursor="hover"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            {done ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {done ? "Subscribed" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
