"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      className="flex max-w-md items-stretch border-b border-foreground/40 focus-within:border-foreground"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSent(true);
      }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        aria-label="Email address"
        className="w-full bg-transparent py-3 text-sm placeholder:text-muted-foreground focus:outline-none"
      />
      <button type="submit" className="shrink-0 text-[11px] uppercase tracking-[0.2em] hover:opacity-70">
        {sent ? "Thank you" : "Subscribe"}
      </button>
    </form>
  );
}
