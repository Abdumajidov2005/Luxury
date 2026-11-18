import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, text, align = 'left', tone = 'dark', id }) {
  return (
    <Reveal className={`section-heading section-heading--${align} section-heading--${tone}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="section-heading__title" id={id}>
        {title}
      </h2>
      {text && <p className="section-heading__text">{text}</p>}
    </Reveal>
  );
}
