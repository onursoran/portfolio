import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Media } from '../../data/types';
import { asset, isSet } from '../../lib/asset';
import { Figure } from './Figure';

interface GalleryProps {
  items: Media[];
  title?: string;
}

/** Grid of figures with an accessible lightbox for images that exist. */
export function Gallery({ items, title }: GalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewable = items.filter((m) => isSet(m.src));
  const [current, setCurrent] = useState(0);

  const open = useCallback(
    (media: Media) => {
      const idx = viewable.indexOf(media);
      if (idx < 0) return;
      setCurrent(idx);
      dialogRef.current?.showModal();
    },
    [viewable],
  );

  const close = () => dialogRef.current?.close();
  const step = (delta: number) => setCurrent((c) => (c + delta + viewable.length) % viewable.length);

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, []);

  const active = viewable[current];

  return (
    <div className="gallery">
      {title && <h3 className="gallery__title">{title}</h3>}
      <div className={`gallery__grid gallery__grid--${Math.min(items.length, 3)}`}>
        {items.map((media, i) => (
          <Figure key={`${media.slot ?? media.src ?? i}`} media={media} onOpen={isSet(media.src) ? () => open(media) : undefined} />
        ))}
      </div>

      {viewable.length > 0 && (
        <dialog
          ref={dialogRef}
          className="lightbox"
          aria-label="Image viewer"
          onClick={(e) => {
            if (e.target === dialogRef.current) close();
          }}
          onKeyDown={(e) => {
            if (viewable.length < 2) return;
            if (e.key === 'ArrowRight') step(1);
            if (e.key === 'ArrowLeft') step(-1);
          }}
        >
          {active && (
            <figure className="lightbox__figure">
              <img src={asset(active.src!)} alt={active.alt} />
              <figcaption className="lightbox__caption">
                <span className="mono muted">
                  {current + 1} / {viewable.length}
                </span>
                {active.caption && <span>{active.caption}</span>}
              </figcaption>
            </figure>
          )}
          <div className="lightbox__controls">
            {viewable.length > 1 && (
              <>
                <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous image">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next image">
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <button type="button" className="icon-btn" onClick={close} aria-label="Close image viewer" autoFocus>
              <X size={18} />
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}
