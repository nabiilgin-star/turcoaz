"use client";

import { useEffect, useRef } from "react";

export default function TrackView({ table, id }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || !id) return;
    tracked.current = true;

    fetch("/api/track-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, id }),
    }).catch(() => {});
  }, [table, id]);

  return null;
}
