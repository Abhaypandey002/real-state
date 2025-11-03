import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboardPage.css';

const defaultProject = {
  title: '',
  type: '1BHK',
  area: '',
  price: '',
  location: '',
  image: '',
  description: ''
};

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ totalProjects: 0, totalAppointments: 0, totalInquiries: 0 });
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(defaultProject);
  const [editId, setEditId] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const token = useMemo(() => localStorage.getItem('dreamnest_token'), []);

  const authConfig = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchDashboard = async () => {
      try {
        const [summaryResponse, projectsResponse, inquiriesResponse] = await Promise.all([
          axios.get('/api/admin/summary', authConfig),
          axios.get('/api/projects', authConfig),
          axios.get('/api/admin/inquiries', authConfig)
        ]);
        setSummary(summaryResponse.data);
        setProjects(projectsResponse.data);
        setInquiries(inquiriesResponse.data.slice(-5).reverse());
      } catch (err) {
        setError('Unable to load admin data. Please login again.');
      }
    };

    fetchDashboard();
  }, [authConfig, navigate, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(defaultProject);
    setEditId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setError('');
    try {
      if (editId) {
        const response = await axios.put(`/api/projects/${editId}`, form, authConfig);
        setProjects((prev) => prev.map((project) => (project.id === editId ? response.data : project)));
        setStatus('Project updated successfully.');
      } else {
        const response = await axios.post('/api/projects', form, authConfig);
        setProjects((prev) => [response.data, ...prev]);
        setStatus('Project added successfully.');
      }
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save project.');
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title,
      type: project.type,
      area: project.area,
      price: project.price,
      location: project.location,
      image: project.image,
      description: project.description || ''
    });
    setEditId(project.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`, authConfig);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      setStatus('Project removed successfully.');
    } catch (err) {
      setError('Unable to delete project.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('dreamnest_token');
    navigate('/admin');
  };

  return (
    <section className="dashboard section">
      <div className="dashboard__header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage property listings, appointments, and customer inquiries.</p>
        </div>
        <button className="btn btn--outline" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard__stats">
        <div>
          <span>Total Projects</span>
          <strong>{summary.totalProjects}</strong>
        </div>
        <div>
          <span>Appointments</span>
          <strong>{summary.totalAppointments}</strong>
        </div>
        <div>
          <span>Inquiries</span>
          <strong>{summary.totalInquiries}</strong>
        </div>
      </div>

      <div className="dashboard__content">
        <form className="dashboard__form" onSubmit={handleSubmit}>
          <h2>{editId ? 'Edit Project' : 'Upload New Project'}</h2>
          <div className="field">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" value={form.title} onChange={handleChange} required />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="type">Type</label>
              <select id="type" name="type" value={form.type} onChange={handleChange}>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="3BHK">3BHK</option>
                <option value="Row House">Row House</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <input id="area" name="area" value={form.area} onChange={handleChange} required />
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="price">Starting Price</label>
              <input id="price" name="price" value={form.price} onChange={handleChange} required />
            </div>
            <div className="field">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" value={form.location} onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="image">Image URL</label>
            <input id="image" name="image" value={form.image} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows="3" value={form.description} onChange={handleChange} />
          </div>
          <div className="dashboard__form-actions">
            <button type="submit" className="btn btn--primary">
              {editId ? 'Update Project' : 'Add Project'}
            </button>
            {editId && (
              <button type="button" className="btn btn--outline" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="dashboard__panel">
          <h2>Active Listings</h2>
          <div className="dashboard__project-list">
            {projects.map((project) => (
              <div key={project.id} className="dashboard__project">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.type}</p>
                  <small>
                    {project.area} · {project.location}
                  </small>
                </div>
                <div className="dashboard__project-actions">
                  <button type="button" onClick={() => handleEdit(project)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(project.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Recent Inquiries &amp; Appointments</h2>
          <ul className="dashboard__inquiries">
            {inquiries.map((inquiry, index) => (
              <li key={`${inquiry.timestamp}-${index}`}>
                <div>
                  <strong>{inquiry.name}</strong>
                  <span>{inquiry.type}</span>
                </div>
                <div>
                  <small>{new Date(inquiry.timestamp).toLocaleString()}</small>
                  <p>{inquiry.message}</p>
                </div>
              </li>
            ))}
            {inquiries.length === 0 && <li>No inquiries recorded yet.</li>}
          </ul>
        </div>
      </div>

      {status && <p className="dashboard__status dashboard__status--success">{status}</p>}
      {error && <p className="dashboard__status dashboard__status--error">{error}</p>}
    </section>
  );
};

export default AdminDashboardPage;
