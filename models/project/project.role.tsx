import LocaleContentAny from "../locale/locale.content.any"
import ProjectRoleType from "./project.role.type";

export default class ProjectRole {
    readonly type: ProjectRoleType;
    readonly description: LocaleContentAny;

    constructor({ type, description } : { type: ProjectRoleType, description: LocaleContentAny }) {
        this.type = type;
        this.description = description;
    }
}