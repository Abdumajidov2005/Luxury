import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import SocialIcons from '../../components/SocialIcons';
import { NAV_LINKS, CONTACT } from '../../data/site';
import { useScrolled } from '../../hooks/useScrolled';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useScrollLock } from '../../hooks/useScrollLock';
import './Header.css';

/* Sections without a nav link are tracked too, so no link stays highlighted
   while the visitor is reading them. The last id must be the page's last section. */
const NAV_IDS = NAV_LINKS.map((link) => link.id);
const SECTION_IDS = [...NAV_IDS.slice(0, -1), 'gallery', 'booking', 'newsletter', NAV_IDS[NAV_IDS.length - 1]];

export default function Header() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  // Close the mobile menu with Esc or when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = (e) => e.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    mq.addEventListener('change', onChange);
    return () => {
      window.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onChange);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header className={`header ${solid ? 'header--solid' : ''} ${menuOpen ? 'header--menu-open' : ''}`}>
      <div className="container header__inner">
        <Logo tone={solid ? 'dark' : 'light'} onClick={closeMenu} />

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__links">
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`header__link ${active === id ? 'is-active' : ''}`}
                  aria-current={active === id ? 'true' : undefined}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button href="#booking" variant={solid ? 'primary' : 'light'} size="sm" className="header__cta">
            Book Now
          </Button>
          <button
            type="button"
            className="header__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="mobile-menu__links">
            {NAV_LINKS.map(({ id, label }, i) => (
              <li key={id} style={{ '--i': i }}>
                <a href={`#${id}`} className={`mobile-menu__link ${active === id ? 'is-active' : ''}`} onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mobile-menu__footer">
          <Button href="#booking" variant="primary" arrow onClick={closeMenu} className="mobile-menu__cta">
            Book Now
          </Button>
          <a className="mobile-menu__contact" href={CONTACT.phoneHref}>
            {CONTACT.phone}
          </a>
          <SocialIcons />
        </div>
      </div>
    </header>
  );
}
