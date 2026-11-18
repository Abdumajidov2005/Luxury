import Button from '../../components/Button';
import SmartImage from '../../components/SmartImage';
import { HERO } from '../../data/site';
import './Hero.css';

/**
 * Static, full-bleed hero. The background image never zooms, pans or
 * animates — only the text fades in once on load, so the layout is rock solid.
 */
export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <SmartImage image={HERO.image} sizes="100vw" width={1920} priority className="hero__image" />
        <div className="hero__overlay" />
      </div>

      <div className="container hero__content">
        <p className="eyebrow eyebrow--light hero__eyebrow hero-in" style={{ '--d': '100ms' }}>
          Chimgan Valley · Est. 2019
        </p>
        <h1 className="hero__title hero-in" id="hero-title" style={{ '--d': '220ms' }}>
          Wild nature,
          <br />
          <em>quietly</em> luxurious.
        </h1>
        <p className="hero__text hero-in" style={{ '--d': '360ms' }}>
          Six private canvas suites, sky domes and timber cabins scattered across 480 hectares of mountain
          forest — designed for slow mornings, long dinners and nights full of stars.
        </p>
        <div className="hero__actions hero-in" style={{ '--d': '480ms' }}>
          <Button href="#stays" variant="primary" size="lg" arrow>
            Explore Stays
          </Button>
          <Button href="#about" variant="light" size="lg">
            Discover More
          </Button>
        </div>
      </div>

      <div className="container hero__bottom">
        <dl className="hero__stats hero-in" style={{ '--d': '620ms' }}>
          {HERO.stats.map((stat) => (
            <div className="hero__stat" key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <a className="hero__scroll hero-in" href="#stays" style={{ '--d': '760ms' }}>
          <span className="hero__scroll-line" aria-hidden="true" />
          Scroll to explore
        </a>
      </div>
    </section>
  );
}
