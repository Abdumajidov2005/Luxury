import { FiArrowUpRight, FiUsers, FiMaximize2 } from 'react-icons/fi';
import Reveal from '../../components/Reveal';
import SmartImage from '../../components/SmartImage';
import { formatPrice } from '../../utils/format';

/*
 * The Reveal wrapper handles the scroll-in animation; the inner <article>
 * handles hover. Keeping them on separate elements means the two transforms
 * never fight each other and hover always responds instantly.
 */
export default function StayCard({ stay, delay, onDetails }) {
  return (
    <Reveal className="stay-card-reveal" delay={delay}>
      <article className="stay-card">
        <div className="stay-card__media">
          <SmartImage
            image={stay.image}
            sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
            width={800}
            maxWidth={1200}
          />
          <span className="stay-card__badge">{stay.category}</span>
        </div>

        <div className="stay-card__body">
          <div className="stay-card__top">
            <h3 className="stay-card__title">{stay.name}</h3>
            <p className="stay-card__price">
              <strong>{formatPrice(stay.price)}</strong>
              <span>/ night</span>
            </p>
          </div>

          <p className="stay-card__text">{stay.description}</p>

          <div className="stay-card__footer">
            <ul className="stay-card__meta">
              <li>
                <FiUsers aria-hidden="true" /> {stay.guests} guests
              </li>
              <li>
                <FiMaximize2 aria-hidden="true" /> {stay.size}
              </li>
            </ul>
            <button
              type="button"
              className="stay-card__link"
              onClick={() => onDetails(stay.id)}
              aria-label={`View details of ${stay.name}`}
            >
              View Details
              <FiArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
