import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard.jsx';
import './ProjectsPage.css';

const TYPES = ['All', '1BHK', '2BHK', '3BHK', 'Row House'];

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [typeFilter, setTypeFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
      } catch (err) {
        setError('Unable to load projects at the moment. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesType = typeFilter === 'All' || project.type === typeFilter;
      const matchesLocation = project.location.toLowerCase().includes(locationFilter.toLowerCase());
      return matchesType && matchesLocation;
    });
  }, [projects, typeFilter, locationFilter]);

  return (
    <section className="projects section">
      <div className="projects__header">
        <h1>Discover Residential Projects</h1>
        <p>Filter by configuration or location to explore homes tailored to your lifestyle.</p>
      </div>

      <div className="projects__filters">
        <div className="projects__type">
          {TYPES.map((type) => (
            <button
              key={type}
              className={type === typeFilter ? 'active' : ''}
              onClick={() => setTypeFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search by location"
          value={locationFilter}
          onChange={(event) => setLocationFilter(event.target.value)}
        />
      </div>

      {isLoading && <p className="projects__status">Loading projects...</p>}
      {error && <p className="projects__status projects__status--error">{error}</p>}

      <div className="projects__grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {!isLoading && !error && filteredProjects.length === 0 && (
        <p className="projects__status">No projects match the selected filters.</p>
      )}
    </section>
  );
};

export default ProjectsPage;
