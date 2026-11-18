import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Logo from '../../components/Logo';
import SocialIcons from '../../components/SocialIcons';
import { CONTACT, NAV_LINKS } from '../../data/site';
import './Footer.css';

const EXTRA_LINKS = [
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Book a stay' },
  { href: '#newsletter', label: 'Newsletter' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" id="contact" aria-labelledby="footer-title">
      <h2 className="sr-only" id="footer-title">
        Contact and site information
      </h2>
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo tone="light" />
          <p>
            Private glamping stays in the Chimgan mountains — where wild nature meets quiet, considered luxury.
          </p>
          <SocialIcons className="footer__socials" />
        </div>

        <nav className="footer__col" aria-label="Footer navigation">
          <h3 className="footer__heading">Explore</h3>
          <ul>
            {NAV_LINKS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="More links">
          <h3 className="footer__heading">Plan</h3>
          <ul>
            {EXTRA_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col footer__contact">
          <h3 className="footer__heading">Contact</h3>
          <address>
            <p>
              <FiMapPin aria-hidden="true" />
              <span>{CONTACT.address}</span>
            </p>
            <p>
              <FiPhone aria-hidden="true" />
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </p>
            <p>
              <FiMail aria-hidden="true" />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p>
              <FiClock aria-hidden="true" />
              <span>{CONTACT.hours}</span>
            </p>
          </address>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} Luxury Glamping. All rights reserved.</p>
        <a href="#home" className="footer__top">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
