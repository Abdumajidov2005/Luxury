import { useEffect, useRef, useState } from 'react';

/* One shared observer for every Reveal on the page — cheap and FPS-friendly. */
let sharedObserver = null;
const callbacks = new WeakMap();

function getObserver() {
  if (sharedObserver || typeof window === 'undefined') return sharedObserver;
  if (!('IntersectionObserver' in window)) return null;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.();
          sharedObserver.unobserve(entry.target);
          callbacks.delete(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  return sharedObserver;
}

/**
 * Fades + slides its children in once, when they enter the viewport.
 * Animates only `opacity` and `transform` (GPU friendly, no layout shift).
 */
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = getObserver();
    if (!node) return undefined;
    if (!observer) {
      setVisible(true);
      return undefined;
    }
    callbacks.set(node, () => setVisible(true));
    observer.observe(node);
    return () => {
      observer.unobserve(node);
      callbacks.delete(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal--${variant} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
