import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <Hero />
      <Stats />
      <section className="home__values section">
        <div className="home__values-card">
          <h2>Your next chapter begins here.</h2>
          <p>
            Explore curated residences featuring generous layouts, premium finishes, and vibrant community amenities. Every
            DreamNest home is crafted to elevate your lifestyle with thoughtfully designed interiors and lush outdoor
            landscapes.
          </p>
        </div>
        <div className="home__values-grid">
          <article>
            <h3>Tailored Experiences</h3>
            <p>Personalized walkthroughs and expert advisors help you discover a home that resonates with your aspirations.</p>
          </article>
          <article>
            <h3>Trusted Partnerships</h3>
            <p>We collaborate with top architects and builders to deliver projects that embody trust, quality, and authenticity.</p>
          </article>
          <article>
            <h3>Seamless Support</h3>
            <p>From inquiry to handover, our concierge team ensures a smooth and transparent journey at every milestone.</p>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
