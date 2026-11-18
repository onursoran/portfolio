import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process(): void } };
  }
}

const SCRIPT_SRC = 'https://www.instagram.com/embed.js';

/** Loads Instagram's embed script once, then asks it to render any new embeds. */
function processEmbeds() {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
    return;
  }
  if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }
}

/**
 * Official Instagram post embed. Until the script runs (or if it is blocked),
 * the blockquote shows a plain link to the post.
 */
export function InstagramEmbed({ postId, caption }: { postId: string; caption?: string }) {
  const url = `https://www.instagram.com/p/${postId}/`;

  useEffect(processEmbeds, [postId]);

  return (
    <figure className="instagram-embed">
      <blockquote className="instagram-media" data-instgrm-permalink={url} data-instgrm-version="14">
        <a href={url} target="_blank" rel="noopener noreferrer">
          View this post on Instagram
        </a>
      </blockquote>
      {caption && <figcaption className="figure__caption">{caption}</figcaption>}
    </figure>
  );
}
