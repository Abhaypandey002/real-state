import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminLoginPage.css';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('dreamnest_token', response.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login. Please try again.');
    }
  };

  return (
    <section className="admin-login section">
      <form className="admin-login__form" onSubmit={handleSubmit}>
        <h1>Admin Panel Access</h1>
        <p>Secure dashboard to upload projects and manage customer inquiries.</p>
        <div className="field">
          <label htmlFor="email">Admin Email</label>
          <input id="email" type="email" name="email" value={credentials.email} onChange={handleChange} required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" value={credentials.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn--primary">Login</button>
        {error && <p className="admin-login__status">{error}</p>}
      </form>
    </section>
  );
};

export default AdminLoginPage;
