"use client";

import { useEffect, useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/** Live countdown to the Nikah. Renders "00"s on the server; ticks after hydration. */
export function Countdown({ target, label }: { target: string; label: string }) {
  const [t, setT] = useState({ d: "00", h: "00", m: "00", s: "00" });

  useEffect(() => {
    const goal = new Date(target).getTime();
    const tick = () => {
      const diff = Math.max(0, goal - Date.now());
      setT({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className="countdown" aria-label={label}>
      <Unit n={t.d} label="Days" />
      <Sep />
      <Unit n={t.h} label="Hours" />
      <Sep />
      <Unit n={t.m} label="Minutes" />
      <Sep />
      <Unit n={t.s} label="Seconds" />
    </div>
  );
}

function Unit({ n, label }: { n: string; label: string }) {
  return (
    <div className="cd">
      <span className="cd__num">{n}</span>
      <span className="cd__lbl">{label}</span>
    </div>
  );
}

function Sep() {
  return <span className="cd__sep" aria-hidden="true">·</span>;
}
