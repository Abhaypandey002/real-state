import { useState } from 'react';
import axios from 'axios';
import './BookAppointmentPage.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  preferredSlot: '',
  message: ''
};

const BookAppointmentPage = () => {
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
      await axios.post('/api/engagement/appointments', form);
      setStatus('Your appointment has been booked successfully!');
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to book appointment right now.');
    }
  };

  return (
    <section className="appointment section">
      <div className="appointment__intro">
        <h1>Book a Personalized Appointment</h1>
        <p>Tell us when you would like to visit and our property specialist will connect with you right away.</p>
      </div>
      <form className="appointment__form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="field-group">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="preferredSlot">Preferred Date &amp; Time</label>
          <input id="preferredSlot" name="preferredSlot" type="datetime-local" value={form.preferredSlot} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="message">Message / Note</label>
          <textarea id="message" name="message" rows="4" value={form.message} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn--primary">Book Appointment</button>
      </form>
      {status && <p className="appointment__status appointment__status--success">{status}</p>}
      {error && <p className="appointment__status appointment__status--error">{error}</p>}
    </section>
  );
};

export default BookAppointmentPage;
