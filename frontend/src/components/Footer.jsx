import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <h3>DreamNest Realty</h3>
          <p>Turning your dream home into reality.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Phone: <a href="tel:6351186290">6351186290</a></p>
          <p>Address: 125/ XYZ Residency, Surat - 365241</p>
        </div>
        <div>
          <h4>Connect</h4>
          <p>Email: <a href="mailto:hello@dreamnest.com">hello@dreamnest.com</a></p>
          <p>Office Hours: Mon - Sat, 9am - 7pm</p>
        </div>
      </div>
      <p className="footer__copy">© {new Date().getFullYear()} DreamNest Realty. Building trust, one home at a time.</p>
    </footer>
  );
};

export default Footer;
