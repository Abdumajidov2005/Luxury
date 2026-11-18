import { useMemo, useState } from 'react';
import SectionHeading from '../../components/SectionHeading';
import StayModal from '../../components/StayModal';
import StayCard from './StayCard';
import { STAYS, STAY_CATEGORIES } from '../../data/stays';
import './Stays.css';

export default function Stays({ onBook }) {
  const [filter, setFilter] = useState('All');
  const [activeId, setActiveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const visibleStays = useMemo(
    () => (filter === 'All' ? STAYS : STAYS.filter((stay) => stay.category === filter)),
    [filter]
  );
  const activeStay = STAYS.find((stay) => stay.id === activeId) ?? null;

  const openDetails = (id) => {
    setActiveId(id);
    setModalOpen(true);
  };

  const handleBook = (id) => {
    setModalOpen(false);
    onBook(id);
  };

  return (
    <section className="section stays" id="stays" aria-labelledby="stays-title">
      <div className="container">
        <div className="stays__head">
          <SectionHeading
            id="stays-title"
            eyebrow="Our stays"
            title={
              <>
                Six hideaways,
                <br />
                <em>each with its own view.</em>
              </>
            }
            text="From a crystal dome under the stars to a timber cabin on the lake — every stay is private, hand-finished and spaced far from the next."
          />

          <div className="stays__filters" role="tablist" aria-label="Filter stays by setting">
            {STAY_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={filter === category}
                className={`chip ${filter === category ? 'is-active' : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="stays__grid" role="tabpanel" aria-live="polite">
          {visibleStays.map((stay, i) => (
            <StayCard key={stay.id} stay={stay} delay={(i % 3) * 90} onDetails={openDetails} />
          ))}
        </div>
      </div>

      <StayModal stay={activeStay} open={modalOpen} onClose={() => setModalOpen(false)} onBook={handleBook} />
    </section>
  );
}
