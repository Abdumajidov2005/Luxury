import { useCallback, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Modal from './Modal';
import SmartImage from './SmartImage';

const SWIPE_DISTANCE = 50;

/**
 * Full-screen image viewer with previous / next navigation.
 * Keyboard: ← → to navigate, Esc to close. Touch: swipe left / right.
 */
export default function Lightbox({ images, index, open, onClose, onChange }) {
  const current = images[index] ?? null;
  const touchStartX = useRef(null);

  const go = useCallback(
    (step) => {
      onChange((index + step + images.length) % images.length);
    },
    [index, images.length, onChange]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    },
    [go]
  );

  const onTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_DISTANCE) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <Modal open={open} onClose={onClose} variant="lightbox" labelledBy="lightbox-caption" onKeyDown={handleKeyDown}>
      {current && (
        <div className="lightbox" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <figure className="lightbox__figure">
            <div className="lightbox__frame">
              <SmartImage
                key={current.id}
                image={current}
                sizes="(max-width: 900px) 100vw, 80vw"
                width={1600}
                priority
                className="lightbox__image"
              />
            </div>
            <figcaption className="lightbox__caption" id="lightbox-caption">
              <span>{current.alt}</span>
              <span className="lightbox__count" aria-live="polite">
                {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>

          <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous image">
            <FiChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label="Next image">
            <FiChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </Modal>
  );
}
