import { useEffect, useRef, useState } from 'react';

/** Height used until Instagram reports the post's real height (fits a 4:5 photo with caption). */
const DEFAULT_HEIGHT = 980;

/**
 * Instagram post embed, loaded directly in an iframe (no third-party script on the page).
 * Instagram's embed page posts a MEASURE message with its content height, which we apply.
 */
export function InstagramEmbed({ postId, caption }: { postId: string; caption?: string }) {
  const url = `https://www.instagram.com/p/${postId}/`;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  // Same query parameters Instagram's own embed.js sends (version, width, referring page).
  const embedSrc =
    `${url}embed/captioned/?cr=1&v=14&wp=540` +
    `&rd=${encodeURIComponent(window.location.origin)}&rp=${encodeURIComponent(window.location.pathname)}`;

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.instagram.com') return;
      if (event.source !== frameRef.current?.contentWindow) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const h = Number(data?.details?.height);
        if (data?.type === 'MEASURE' && h > 100) setHeight(Math.ceil(h));
      } catch {
        /* not an Instagram measure message */
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <figure className="instagram-embed">
      <iframe
        ref={frameRef}
        src={embedSrc}
        title="Soran Racing Instagram post"
        height={height}
        scrolling="no"
        allowFullScreen
      />
      <figcaption className="figure__caption">
        {caption && <>{caption} </>}
        <a href={url} target="_blank" rel="noopener noreferrer">
          View on Instagram
        </a>
      </figcaption>
    </figure>
  );
}
