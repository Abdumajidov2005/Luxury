import { useEffect, useState } from 'react';

/**
 * Scroll-spy: returns the id of the section currently crossing the middle
 * of the viewport. When the page is scrolled to the very bottom, the last
 * id is returned (so a short footer can still become "active").
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    const list = key.split('|');
    const sections = list.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length || !('IntersectionObserver' in window)) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));

    let frame = 0;
    const checkBottom = () => {
      frame = 0;
      const { scrollHeight } = document.documentElement;
      if (window.scrollY + window.innerHeight >= scrollHeight - 4) {
        setActive(list[list.length - 1]);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkBottom);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
