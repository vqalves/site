import LocaleContentAny from "../locale/locale.content.any"
import ProjectRole from "./project.role";
import ProjectTech from "./project.tech";

export default class Project {
    readonly title: string;
    readonly company: string;
    readonly link?: string;

    readonly description: LocaleContentAny;
    readonly period: LocaleContentAny;
    
    readonly roles: ProjectRole[];
    readonly tech: ProjectTech[];
    
    constructor( { title, company, link, description, period, roles, tech } : { title: string, company: string, link?: string, description: LocaleContentAny, period: LocaleContentAny, roles: ProjectRole[], tech: ProjectTech[] }) {
        this.title = title;
        this.company = company;
        this.roles = roles;

        this.description = description;
        this.period = period;
        this.link = link;
        this.tech = tech;
    }
}