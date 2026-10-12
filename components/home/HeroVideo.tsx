"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplaying, muted hero loop. Falls back to the poster image
 * (LCP) and pauses for users who prefer reduced motion.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    if (media.matches && video) {
      video.pause();
      video.removeAttribute("autoplay");
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
