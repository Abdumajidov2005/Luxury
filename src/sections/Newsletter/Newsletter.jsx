import { useState } from 'react';
import { FiCheck, FiSend } from 'react-icons/fi';
import Reveal from '../../components/Reveal';
import SmartImage from '../../components/SmartImage';
import { NEWSLETTER_IMAGE } from '../../data/site';
import { isValidEmail } from '../../utils/validation';
import './Newsletter.css';

/** Newsletter signup — frontend demo, nothing is sent to a server. */
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [subscribed, setSubscribed] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('That email doesn’t look quite right.');
      return;
    }
    setError('');
    setSubscribed(email.trim());
    setEmail('');
  };

  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__media" aria-hidden="true">
        <SmartImage image={NEWSLETTER_IMAGE} sizes="100vw" width={1600} />
      </div>

      <div className="container">
        <Reveal className="newsletter__card">
          <p className="eyebrow eyebrow--light">The Field Notes</p>
          <h2 className="newsletter__title" id="newsletter-title">
            Seasonal letters from the <em>valley</em>
          </h2>
          <p className="newsletter__text">
            Four letters a year: new stays, harvest dinners and the best weeks for stars. No noise, ever.
          </p>

          {subscribed ? (
            <p className="newsletter__success" role="status">
              <FiCheck aria-hidden="true" />
              <span>
                You’re on the list! The next letter will reach <strong>{subscribed}</strong>.{' '}
                <button type="button" className="newsletter__again" onClick={() => setSubscribed('')}>
                  Add another email
                </button>
              </span>
            </p>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <div className={`newsletter__control ${error ? 'is-invalid' : ''}`}>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                />
                <button type="submit" className="newsletter__submit">
                  <span>Subscribe</span>
                  <FiSend aria-hidden="true" />
                </button>
              </div>
              <p className="newsletter__error" id="newsletter-error" role={error ? 'alert' : undefined}>
                {error}
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
