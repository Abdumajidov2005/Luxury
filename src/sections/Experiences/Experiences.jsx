import { FiClock } from 'react-icons/fi';
import Reveal from '../../components/Reveal';
import SectionHeading from '../../components/SectionHeading';
import SmartImage from '../../components/SmartImage';
import { EXPERIENCES } from '../../data/experiences';
import './Experiences.css';

export default function Experiences() {
  return (
    <section className="section experiences" id="experiences" aria-labelledby="experiences-title">
      <div className="container">
        <SectionHeading
          id="experiences-title"
          eyebrow="Experiences"
          tone="light"
          align="center"
          title={
            <>
              Days shaped by the mountains,
              <br />
              <em>nights by the stars.</em>
            </>
          }
          text="Every stay includes one curated experience. Add more with your host at any time — all are private and led by people born in the valley."
        />

        <div className="experiences__grid">
          {EXPERIENCES.map((exp, i) => (
            <Reveal className="experience-card-reveal" key={exp.id} delay={i * 100}>
              <article className="experience-card">
                <div className="experience-card__media">
                  <SmartImage
                    image={exp.image}
                    sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 25vw"
                    width={800}
                    maxWidth={1200}
                  />
                </div>
                <div className="experience-card__body">
                  <span className="experience-card__num">0{i + 1}</span>
                  <p className="experience-card__subtitle">{exp.subtitle}</p>
                  <h3 className="experience-card__title">{exp.title}</h3>
                  <p className="experience-card__text">{exp.description}</p>
                  <p className="experience-card__meta">
                    <FiClock aria-hidden="true" /> {exp.meta}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
