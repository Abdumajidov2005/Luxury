import { useEffect, useMemo, useRef, useState } from 'react';
import { FiCalendar, FiCheckCircle, FiInfo, FiMoon, FiUsers } from 'react-icons/fi';
import Button from '../../components/Button';
import FormField from '../../components/FormField';
import Reveal from '../../components/Reveal';
import SmartImage from '../../components/SmartImage';
import { STAYS } from '../../data/stays';
import { BOOKING_IMAGE } from '../../data/site';
import { addDaysISO, nightsBetween, todayISO, validateBooking } from '../../utils/validation';
import { formatDate, formatPrice } from '../../utils/format';
import './Booking.css';

const MAX_GUESTS = 8;
const DEMO_DELAY_MS = 1200;

const initialValues = () => ({
  name: '',
  email: '',
  stay: '',
  checkIn: '',
  checkOut: '',
  guests: '2',
});

const makeReference = () => `LG-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

/**
 * Booking form — FRONTEND DEMO.
 * There is no backend: on submit the data is validated, a short loading
 * state is shown, and a confirmation is rendered locally. Nothing is sent.
 */
export default function Booking({ request }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success
  const [confirmation, setConfirmation] = useState(null);
  const timerRef = useRef(null);
  const formRef = useRef(null);

  const today = todayISO();
  const selectedStay = STAYS.find((s) => s.id === values.stay) ?? null;
  const maxGuests = selectedStay ? selectedStay.guests : MAX_GUESTS;
  const nights = nightsBetween(values.checkIn, values.checkOut);

  // Pre-select a stay chosen from the "Reserve this stay" button.
  useEffect(() => {
    if (!request?.stayId) return;
    setStatus('idle');
    setValues((prev) => {
      const stay = STAYS.find((s) => s.id === request.stayId);
      const guests = stay && Number(prev.guests) > stay.guests ? String(stay.guests) : prev.guests;
      return { ...prev, stay: request.stayId, guests };
    });
  }, [request]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const estimate = useMemo(() => {
    if (!selectedStay || nights < 1) return null;
    return selectedStay.price * nights;
  }, [selectedStay, nights]);

  const updateField = (name, value) => {
    const next = { ...values, [name]: value };
    // Keep check-out valid when check-in moves past it.
    if (name === 'checkIn' && next.checkOut && nightsBetween(value, next.checkOut) < 1) {
      next.checkOut = addDaysISO(value, 1);
    }
    // Keep the guest count within the chosen stay's capacity.
    if (name === 'stay') {
      const cap = STAYS.find((s) => s.id === value)?.guests ?? MAX_GUESTS;
      if (Number(next.guests) > cap) next.guests = String(cap);
    }
    setValues(next);
    if (touched[name] || errors[name]) {
      const nextMax = STAYS.find((s) => s.id === next.stay)?.guests ?? MAX_GUESTS;
      setErrors(validateBooking(next, nextMax));
    }
  };

  const handleChange = (event) => updateField(event.target.name, event.target.value);

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validateBooking(values, maxGuests));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateBooking(values, maxGuests);
    setErrors(found);
    setTouched({ name: true, email: true, checkIn: true, checkOut: true, guests: true });

    if (Object.keys(found).length) {
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus('submitting');
    timerRef.current = setTimeout(() => {
      setConfirmation({
        ...values,
        stayName: selectedStay?.name ?? 'Host’s recommendation',
        nights,
        estimate,
        reference: makeReference(),
      });
      setStatus('success');
    }, DEMO_DELAY_MS);
  };

  const reset = () => {
    setValues(initialValues());
    setErrors({});
    setTouched({});
    setConfirmation(null);
    setStatus('idle');
  };

  const visibleError = (name) => (touched[name] ? errors[name] : undefined);

  return (
    <section className="section booking" id="booking" aria-labelledby="booking-title">
      <div className="container booking__grid">
        <Reveal className="booking__aside" variant="fade">
          <div className="booking__image">
            <SmartImage image={BOOKING_IMAGE} sizes="(max-width: 960px) 100vw, 40vw" width={1000} />
          </div>
          <div className="booking__aside-content">
            <p className="eyebrow eyebrow--light">Reservations</p>
            <h2 className="booking__title" id="booking-title">
              Reserve your <em>escape</em>
            </h2>
            <ul className="booking__perks">
              <li>Free cancellation up to 14 days before arrival</li>
              <li>Breakfast and one curated experience included</li>
              <li>Private transfer from Tashkent on request</li>
            </ul>
          </div>
        </Reveal>

        <Reveal className="booking__panel" delay={120}>
          <p className="booking__demo" role="note">
            <FiInfo aria-hidden="true" />
            <span>
              <strong>Demo form.</strong> This website has no backend yet — your details are validated in the browser
              and are <strong>not sent anywhere</strong>.
            </span>
          </p>

          {status === 'success' && confirmation ? (
            <div className="booking__success" role="status" aria-live="polite">
              <FiCheckCircle className="booking__success-icon" aria-hidden="true" />
              <h3>Thank you, {confirmation.name.split(' ')[0]}!</h3>
              <p>
                Your request has been received (demo). A host would normally reply to <strong>{confirmation.email}</strong>{' '}
                within a few hours.
              </p>
              <dl className="booking__summary">
                <div>
                  <dt>Reference</dt>
                  <dd>{confirmation.reference}</dd>
                </div>
                <div>
                  <dt>Stay</dt>
                  <dd>{confirmation.stayName}</dd>
                </div>
                <div>
                  <dt>Dates</dt>
                  <dd>
                    {formatDate(confirmation.checkIn)} – {formatDate(confirmation.checkOut)}
                  </dd>
                </div>
                <div>
                  <dt>Guests · Nights</dt>
                  <dd>
                    {confirmation.guests} · {confirmation.nights}
                  </dd>
                </div>
                {confirmation.estimate && (
                  <div>
                    <dt>Estimated total</dt>
                    <dd>{formatPrice(confirmation.estimate)}</dd>
                  </div>
                )}
              </dl>
              <Button variant="dark" onClick={reset}>
                Make another booking
              </Button>
            </div>
          ) : (
            <form className="booking__form" onSubmit={handleSubmit} noValidate ref={formRef}>
              <div className="booking__row">
                <FormField
                  id="name"
                  label="Full name"
                  placeholder="Jane Doe"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={visibleError('name')}
                />
                <FormField
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={visibleError('email')}
                />
              </div>

              <FormField id="stay" as="select" label="Preferred stay" value={values.stay} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Let our host recommend one</option>
                {STAYS.map((stay) => (
                  <option key={stay.id} value={stay.id}>
                    {stay.name} — {formatPrice(stay.price)} / night
                  </option>
                ))}
              </FormField>

              <div className="booking__row booking__row--three">
                <FormField
                  id="checkIn"
                  type="date"
                  label="Check-in"
                  min={today}
                  value={values.checkIn}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={visibleError('checkIn')}
                />
                <FormField
                  id="checkOut"
                  type="date"
                  label="Check-out"
                  min={values.checkIn ? addDaysISO(values.checkIn, 1) : addDaysISO(today, 1)}
                  value={values.checkOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={visibleError('checkOut')}
                />
                <FormField
                  id="guests"
                  as="select"
                  label="Guests"
                  value={values.guests}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={visibleError('guests')}
                >
                  {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} disabled={n > maxGuests}>
                      {n} {n === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </FormField>
              </div>

              <div className="booking__estimate" aria-live="polite">
                <span>
                  <FiMoon aria-hidden="true" /> {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : 'Select dates'}
                </span>
                <span>
                  <FiUsers aria-hidden="true" /> {values.guests} {Number(values.guests) === 1 ? 'guest' : 'guests'}
                </span>
                <span className="booking__estimate-total">
                  <FiCalendar aria-hidden="true" />
                  {estimate ? `Est. ${formatPrice(estimate)}` : 'Total shown after selection'}
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                arrow={status !== 'submitting'}
                className={`booking__submit ${status === 'submitting' ? 'is-loading' : ''}`}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending request…' : 'Request booking'}
              </Button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
