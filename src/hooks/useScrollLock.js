import { useEffect } from 'react';

let lockCount = 0;
let savedOverflow = '';
let savedPadding = '';

/**
 * Locks page scrolling while `active` is true.
 * Compensates for the scrollbar width so the layout never shifts sideways.
 * Supports nested locks (e.g. mobile menu + modal).
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined;

    const { body, documentElement } = document;
    if (lockCount === 0) {
      const scrollbar = window.innerWidth - documentElement.clientWidth;
      savedOverflow = body.style.overflow;
      savedPadding = body.style.paddingRight;
      body.style.overflow = 'hidden';
      if (scrollbar > 0) {
        body.style.paddingRight = `${scrollbar}px`;
        documentElement.style.setProperty('--scrollbar-comp', `${scrollbar}px`);
      }
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.overflow = savedOverflow;
        body.style.paddingRight = savedPadding;
        documentElement.style.removeProperty('--scrollbar-comp');
      }
    };
  }, [active]);
}
