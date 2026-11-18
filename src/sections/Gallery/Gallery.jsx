import { useState } from 'react';
import { FiMaximize } from 'react-icons/fi';
import Reveal from '../../components/Reveal';
import SectionHeading from '../../components/SectionHeading';
import SmartImage from '../../components/SmartImage';
import Lightbox from '../../components/Lightbox';
import { GALLERY } from '../../data/gallery';
import './Gallery.css';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          align="center"
          title={
            <>
              A glimpse of <em>camp life</em>
            </>
          }
          text="Golden mornings, glowing tents and the quiet in between. Tap any photo to see it full screen."
        />

        <ul className="gallery__grid">
          {GALLERY.map((image, i) => (
            <Reveal as="li" key={image.id} className={`gallery__item ${image.layout ? `gallery__item--${image.layout}` : ''}`} delay={(i % 3) * 80}>
              <button type="button" className="gallery__button" onClick={() => openAt(i)} aria-label={`Open photo: ${image.alt}`}>
                <SmartImage
                  image={image}
                  sizes={image.layout === 'wide' ? '(max-width: 640px) 100vw, 66vw' : '(max-width: 640px) 50vw, 33vw'}
                  width={800}
                  maxWidth={1600}
                />
                <span className="gallery__zoom" aria-hidden="true">
                  <FiMaximize />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox images={GALLERY} index={index} open={open} onClose={() => setOpen(false)} onChange={setIndex} />
    </section>
  );
}
