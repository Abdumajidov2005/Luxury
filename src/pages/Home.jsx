import { useCallback, useState } from 'react';
import Hero from '../sections/Hero/Hero';
import Stays from '../sections/Stays/Stays';
import Experiences from '../sections/Experiences/Experiences';
import About from '../sections/About/About';
import Gallery from '../sections/Gallery/Gallery';
import Booking from '../sections/Booking/Booking';
import Newsletter from '../sections/Newsletter/Newsletter';
import { scrollToSection } from '../utils/scroll';

/** Delay that lets the stay modal finish closing before we scroll. */
const MODAL_EXIT_MS = 340;

export default function Home() {
  // A new object each time, so choosing the same stay twice still triggers.
  const [bookingRequest, setBookingRequest] = useState(null);

  const handleBook = useCallback((stayId) => {
    setBookingRequest({ stayId, at: Date.now() });
    window.setTimeout(() => scrollToSection('booking'), MODAL_EXIT_MS);
  }, []);

  return (
    <main id="main">
      <Hero />
      <Stays onBook={handleBook} />
      <Experiences />
      <About />
      <Gallery />
      <Booking request={bookingRequest} />
      <Newsletter />
    </main>
  );
}
