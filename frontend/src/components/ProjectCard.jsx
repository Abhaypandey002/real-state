import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <article className="project-card">
      <div className="project-card__image">
        <img src={project.image || 'https://images.unsplash.com/photo-1600585154340-0ef3c08ac11b'} alt={project.title} />
      </div>
      <div className="project-card__body">
        <h3>{project.title}</h3>
        <p className="project-card__description">{project.description || 'Your next chapter begins here with thoughtfully designed living spaces.'}</p>
        <div className="project-card__meta">
          <span>{project.type}</span>
          <span>{project.area}</span>
        </div>
        <div className="project-card__footer">
          <span className="project-card__price">{project.price}</span>
          <span className="project-card__location">{project.location}</span>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
