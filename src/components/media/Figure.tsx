import { ImageIcon, Maximize2 } from 'lucide-react';
import type { Media } from '../../data/types';
import { asset, assetSrcSet, isSet } from '../../lib/asset';

interface FigureProps {
  media: Media;
  /** When provided and an image exists, the image becomes a button that opens the lightbox. */
  onOpen?: () => void;
  showCaption?: boolean;
  /** Use eager loading for above-the-fold images. */
  priority?: boolean;
}

export function Figure({ media, onOpen, showCaption = true, priority = false }: FigureProps) {
  const aspect = media.aspect ?? '16/9';
  const hasImage = isSet(media.src);

  const image = hasImage ? (
    <img
      src={asset(media.src!)}
      srcSet={media.srcSet ? assetSrcSet(media.srcSet) : undefined}
      sizes={media.sizes}
      alt={media.alt}
      width={media.width}
      height={media.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  ) : (
    <Placeholder media={media} />
  );

  return (
    <figure className="figure">
      <div className="figure__frame" style={{ aspectRatio: aspect.replace('/', ' / ') }}>
        {hasImage && onOpen ? (
          <button type="button" className="figure__open" onClick={onOpen} aria-label={`Enlarge image: ${media.alt}`}>
            {image}
            <span className="figure__zoom" aria-hidden="true">
              <Maximize2 size={14} />
            </span>
          </button>
        ) : (
          image
        )}
      </div>
      {showCaption && media.caption && <figcaption className="figure__caption">{media.caption}</figcaption>}
    </figure>
  );
}

/** Clearly labeled stand-in for an image that has not been supplied yet. */
export function Placeholder({ media }: { media: Media }) {
  return (
    <div className="placeholder" role="img" aria-label={`Placeholder: ${media.placeholder ?? media.alt} (image not yet added)`}>
      <ImageIcon size={20} aria-hidden="true" />
      <span className="placeholder__tag mono">Placeholder</span>
      <span className="placeholder__label">{media.placeholder ?? media.alt}</span>
      {import.meta.env.DEV && media.slot && <code className="placeholder__slot">public/{media.slot}</code>}
    </div>
  );
}
