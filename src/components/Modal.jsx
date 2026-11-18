import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';
import { useScrollLock } from '../hooks/useScrollLock';

const EXIT_MS = 320;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal dialog with enter / exit animations.
 * - Esc and backdrop click close it
 * - focus is trapped inside and restored on close
 * - page scroll is locked without layout shift
 */
export default function Modal({ open, onClose, labelledBy, variant = 'default', onKeyDown, children }) {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  // Mount → animate in; animate out → unmount.
  useEffect(() => {
    let timer;
    let frame;
    if (open) {
      lastFocused.current = document.activeElement;
      setMounted(true);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      timer = setTimeout(() => setMounted(false), EXIT_MS);
    }
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  useScrollLock(mounted);

  // Move focus into the dialog once it is shown, restore it afterwards.
  useEffect(() => {
    if (visible) {
      const first = dialogRef.current?.querySelector('[data-autofocus]') || dialogRef.current;
      first?.focus({ preventScroll: true });
    } else if (!open && lastFocused.current instanceof HTMLElement) {
      lastFocused.current.focus({ preventScroll: true });
      lastFocused.current = null;
    }
  }, [visible, open]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key === 'Tab' && dialogRef.current) {
        const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      onKeyDown?.(event);
    },
    [onClose, onKeyDown]
  );

  if (!mounted) return null;

  return createPortal(
    <div
      className={`modal modal--${variant} ${visible ? 'is-open' : ''}`}
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      <div className="modal__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close" data-autofocus>
          <FiX aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
