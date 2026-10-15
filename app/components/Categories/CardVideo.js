"use client";

import { useEffect, useRef } from "react";

// Cloudinary donusumleri: kucuk boyut, sessiz, otomatik kalite
const VIDEO_TRANSFORM = "q_auto:low,vc_auto,w_720,ac_none";
const POSTER_TRANSFORM = "so_0,w_720,q_auto";

function withTransform(url, transform) {
  return url.includes("/video/upload/")
    ? url.replace("/video/upload/", "/video/upload/" + transform + "/")
    : url;
}

export default function CardVideo({ src, active }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  const poster = withTransform(src, POSTER_TRANSFORM).replace(/\.[a-z0-9]+$/i, ".jpg");

  return (
    <video
      ref={ref}
      src={withTransform(src, VIDEO_TRANSFORM)}
      poster={poster}
      loop
      muted
      playsInline
      preload="none"
      className="card-image-new"
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        left: 0,
        top: 0,
        objectFit: "cover",
      }}
    />
  );
}