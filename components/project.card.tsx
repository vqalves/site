import { useDefaultPageElements } from "../models/page";
import Project from "../models/project/project";
import ProjectTech from "../models/project/project.tech";
import ProjectTechGroup from "../models/project/project.tech.group";
import styles from "../styles/project.card.module.css";

export interface ProjectCardProps {
    project: Project;
}

function ProjectTechStack({ project } : { project: Project }) {
    const { ts } = useDefaultPageElements();

    function _createTechGroupMap(techs: ProjectTech[]): Map<ProjectTechGroup, ProjectTech[]> {
        const groups = new Map<ProjectTechGroup, ProjectTech[]>();

        techs.forEach((tech) => {
            var group = groups.get(tech.techGroup);
    
            if(!group) {
                group = [];
                groups.set(tech.techGroup, group);
            }
    
            group.push(tech);
        });

        return groups;
    }

    function _renderTechGroupMap(map: Map<ProjectTechGroup, ProjectTech[]>) {
        return (
            <>
                {
                    Array.from(map.entries()).map((e, index) => {
                        var group = e[0];
                        var techs = e[1];

                        return (
                            <ul key={index}>
                                <li className={styles.tech_stack_category}>{ts(group.name)}</li>
                                <li>
                                    {_renderTechsOfGroup(techs)}
                                </li>
                            </ul>
                        );
                    })
                }
            </>
        )
    }

    function _renderTechsOfGroup(techs: ProjectTech[]) {
        return (
            <ul>
                {
                    techs.map((tech, index) => {
                        return (<li key={index}>{ts(tech.name)}</li>);
                    })
                }
            </ul>
        )
    }

    const techGroupMap = _createTechGroupMap(project.tech);

    return (
        <div className={styles.tech_stack}>
            {_renderTechGroupMap(techGroupMap)}
        </div>
    );
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const { ts } = useDefaultPageElements();

    function _renderProjectLink(company: string, link?: string) {
        if(link) {
            return <a target="_blank" rel="noreferrer" href={link}>{company}</a>
        }

        return <p>{company}</p>;
    }

    return (
        <div className={styles.project_card}>
            <div>
                <p className={styles.project_name}>{project.title}</p>
                {_renderProjectLink(project.company, project.link)}
                <p>{ts(project.period)}</p>

                <ProjectTechStack project={project}></ProjectTechStack>
            </div>

            <div className={styles.project_info}>
                <p className={styles.project_description}>{ts(project.description)}</p>
                
                <div className={styles.roles}>
                    {
                        project.roles.map((role, index) => {
                            return (<p key={index}><span>{ts(role.type.name)}</span>: {ts(role.description)}</p>)
                        })
                    }
                </div>
            </div>
        </div>
    )
} 