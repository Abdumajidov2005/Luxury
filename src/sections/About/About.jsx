import Reveal from '../../components/Reveal';
import SmartImage from '../../components/SmartImage';
import Button from '../../components/Button';
import { ABOUT } from '../../data/site';
import './About.css';

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__visual">
          <Reveal className="about__image about__image--main" variant="fade">
            <SmartImage image={ABOUT.main} sizes="(max-width: 960px) 100vw, 50vw" width={1200} />
          </Reveal>
          <Reveal className="about__image about__image--detail" delay={180}>
            <SmartImage image={ABOUT.detail} sizes="(max-width: 960px) 45vw, 22vw" width={600} maxWidth={1200} />
          </Reveal>
          <Reveal className="about__since" delay={300}>
            <span className="about__since-num">2019</span>
            <span className="about__since-label">Hosting guests in the Chimgan mountains</span>
          </Reveal>
        </div>

        <div className="about__content">
          <Reveal>
            <p className="eyebrow">About us</p>
            <h2 className="about__title" id="about-title">
              We built a place
              <br />
              <em>we never wanted to leave.</em>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="about__lead">
              Luxury Glamping began with a single canvas tent, a borrowed horse and a stubborn idea: that true luxury
              is space, silence and attention to detail — not marble floors.
            </p>
            <p className="about__text">
              Today our camp is home to a handful of private stays, each placed by hand to face its own view. Our team
              of hosts, chefs and mountain guides grew up in the valley, and they share it the way only locals can.
            </p>
          </Reveal>

          <ul className="about__values">
            {ABOUT.values.map((value, i) => (
              <Reveal as="li" key={value.title} className="about__value" delay={180 + i * 90}>
                <span className="about__value-num">0{i + 1}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={300}>
            <blockquote className="about__quote">
              <p>“The most beautiful room in the camp has no walls at all — it is the valley at dawn.”</p>
              <cite>Aziza Karimova, Founder</cite>
            </blockquote>
            <Button href="#experiences" variant="dark" arrow>
              See experiences
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
