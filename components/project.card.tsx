import { useDefaultPageElements } from "../models/page";
import { Project } from "../models/project";
import ProjectTech, { ProjectTechGroup } from "../models/project.tech";
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
                    Array.from(map.entries()).map(e => {
                        var techGroup = e[0];
                        var techs = e[1];

                        return _renderTechGroup(techGroup, techs);
                    })
                }
            </>
        )
    }

    function _renderTechGroup(group: ProjectTechGroup, techs: ProjectTech[]) {
        return (
            <ul>
                <li className={styles.tech_stack_category}>{ts(group.name)}</li>
                <li>
                    {_renderTechsOfGroup(techs)}
                </li>
            </ul>
        )
    }

    function _renderTechsOfGroup(techs: ProjectTech[]) {
        return (
            <ul>
                {
                    techs.map(tech => {
                        return (<li>{ts(tech.name)}</li>);
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

    function _renderProjectLink() {
        if(project.link) {
            return <a target="_blank" href={project.link}>{project.link}</a>
        }

        return null;
    }

    return (
        <div className={styles.project_card}>
            <div>
                <p className={styles.project_name}>{project.name}</p>
                {_renderProjectLink()}
                <p>{ts(project.period)}</p>

                <ProjectTechStack project={project}></ProjectTechStack>
            </div>

            <div className={styles.project_info}>
                <p className={styles.project_description}>{ts(project.description)}</p>
                
                <div className={styles.roles}>
                    {
                        project.roles.map(role => {
                            return (<p><span>{ts(role.type.name)}</span>: {ts(role.description)}</p>)
                        })
                    }
                </div>
            </div>
        </div>
    )
} 