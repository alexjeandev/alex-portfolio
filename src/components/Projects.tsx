 import { projects } from '../data/projects'


 function Projects() {
    return (
        <section id="projects" className="section">
            <h2>Projects</h2>


            <div className='projects-grid'>
                {projects.map((project) => (
                    <div key={project.id} className='project-card'>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>


        </section>
    )
 }


 export default Projects;