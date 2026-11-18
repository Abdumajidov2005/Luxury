import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa6';
import { SOCIALS } from '../data/site';

const ICONS = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  pinterest: FaPinterestP,
  youtube: FaYoutube,
};

export default function SocialIcons({ className = '' }) {
  return (
    <ul className={`socials ${className}`}>
      {SOCIALS.map(({ label, href, icon }) => {
        const Icon = ICONS[icon];
        return (
          <li key={label}>
            <a className="socials__link" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
              <Icon aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
