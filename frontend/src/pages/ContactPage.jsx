import { useState } from 'react';
import axios from 'axios';
import './ContactPage.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

const ContactPage = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');
    try {
      await axios.post('/api/engagement/contact', form);
      setStatus('Thank you for reaching out! We will get back to you soon.');
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to send your message right now.');
    }
  };

  return (
    <section className="contact section">
      <div className="contact__info">
        <h1>Contact DreamNest</h1>
        <p>Building trust, one home at a time. Reach out to schedule a tour or ask about our upcoming projects.</p>
        <div className="contact__details">
          <p><strong>Phone:</strong> <a href="tel:6351186290">6351186290</a></p>
          <p><strong>Address:</strong> 125/ XYZ Residency, Surat - 365241</p>
        </div>
        <div className="contact__map">
          <iframe
            title="DreamNest Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.469392934516!2d72.83106131502446!3d21.170240985919235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dd713fdc7e1%3A0x64f0f243af656d96!2sSurat%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1704978892000!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <form className="contact__form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn--primary">Send Message</button>
        {status && <p className="contact__status contact__status--success">{status}</p>}
        {error && <p className="contact__status contact__status--error">{error}</p>}
      </form>
    </section>
  );
};

export default ContactPage;
