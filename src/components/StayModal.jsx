import { FiCheck, FiHome, FiMaximize2, FiUsers } from 'react-icons/fi';
import Button from './Button';
import Modal from './Modal';
import SmartImage from './SmartImage';
import { formatPrice } from '../utils/format';

export default function StayModal({ stay, open, onClose, onBook }) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="stay-modal-title" variant="stay">
      {stay && (
        <article className="stay-modal">
          <div className="stay-modal__media">
            <SmartImage
              key={stay.id}
              image={stay.image}
              sizes="(max-width: 860px) 100vw, 50vw"
              width={1200}
              priority
            />
            <span className="stay-modal__badge">{stay.category}</span>
          </div>

          <div className="stay-modal__body">
            <p className="eyebrow">{stay.tagline}</p>
            <h3 className="stay-modal__title" id="stay-modal-title">
              {stay.name}
            </h3>

            <ul className="stay-modal__facts">
              <li>
                <FiUsers aria-hidden="true" /> Up to {stay.guests} guests
              </li>
              <li>
                <FiMaximize2 aria-hidden="true" /> {stay.size}
              </li>
              <li>
                <FiHome aria-hidden="true" /> {stay.bed}
              </li>
            </ul>

            <p className="stay-modal__text">{stay.description}</p>
            <p className="stay-modal__text">{stay.details}</p>

            <h4 className="stay-modal__subtitle">Included</h4>
            <ul className="stay-modal__amenities">
              {stay.amenities.map((item) => (
                <li key={item}>
                  <FiCheck aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>

            <div className="stay-modal__footer">
              <p className="stay-modal__price">
                <strong>{formatPrice(stay.price)}</strong>
                <span>/ night</span>
              </p>
              <Button variant="primary" arrow onClick={() => onBook(stay.id)}>
                Reserve this stay
              </Button>
            </div>
          </div>
        </article>
      )}
    </Modal>
  );
}
