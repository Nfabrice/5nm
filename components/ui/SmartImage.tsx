"use client";

import Image, { type ImageProps } from "next/image";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = Omit<ImageProps, "fill" | "alt"> & {
  alt: string;
  /** Class for the wrapping element (controls size / aspect ratio). */
  className?: string;
  /** Class for the <img> itself. */
  imgClassName?: string;
  /** Show the fallback in dark tones (for use on black sections). */
  tone?: "light" | "dark";
};

/**
 * next/image in `fill` mode with a graceful, on-brand fallback when a
 * remote photo can't be loaded (offline, blocked CDN, broken URL).
 */
export function SmartImage({
  className,
  imgClassName,
  alt,
  tone = "light",
  sizes = "100vw",
  ...props
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const patternId = `hatch-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        tone === "light" ? "bg-bone" : "bg-charcoal",
        className,
      )}
    >
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className={cn(
            "absolute inset-0 flex items-end p-5",
            tone === "light" ? "text-mute" : "text-smoke",
          )}
        >
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-40">
            <defs>
              <pattern id={patternId} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
          <span className="eyebrow relative">5 N&amp;M</span>
        </div>
      ) : (
        <Image
          fill
          alt={alt}
          sizes={sizes}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
          {...props}
        />
      )}
    </div>
  );
}
