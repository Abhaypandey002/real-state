import './Hero.css';

const heroImage =
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Where comfort meets class.</p>
        <h1>Turning your dream home into reality.</h1>
        <p className="hero__subtitle">Discover thoughtfully designed residences that blend modern elegance with timeless comfort.</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="/projects">View Projects</a>
          <a className="btn btn--outline" href="/book-appointment">Book Appointment</a>
        </div>
      </div>
      <div className="hero__image">
        <img src={heroImage} alt="Luxury villa exterior" />
      </div>
    </section>
  );
};

export default Hero;
