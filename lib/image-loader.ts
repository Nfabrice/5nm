type LoaderArgs = { src: string; width: number; quality?: number };

/**
 * Custom next/image loader.
 * Unsplash images get responsive widths from the Unsplash CDN; anything
 * else (local /public assets) is returned untouched.
 */
export default function imageLoader({ src, width, quality }: LoaderArgs) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    return url.toString();
  }
  return src;
}
