import Header from './sections/Header/Header';
import Footer from './sections/Footer/Footer';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <Home />
      <Footer />
    </>
  );
}
