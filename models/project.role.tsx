import { LocaleContentAny } from "./locale"

export class ProjectRoleType {
    static readonly techLead: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Tech lead",
            pt: "Tech lead"
        })
    });

    static readonly backendDev: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Backend developer",
            pt: "Backend developer"
        })
    });

    static readonly frontendDev: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Frontend developer",
            pt: "Frontend developer"
        })
    });

    static readonly projectManager: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Project manager",
            pt: "Gerente de projetos"
        })
    });

    static readonly privacyCompliance: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Board of privacy compliance",
            pt: "Equipe de compliance de privacidade"
        })
    });

    readonly name: LocaleContentAny;

    constructor({ name } : { name : LocaleContentAny}) {
        this.name = name;
    }
}

export default class Role {
    readonly type: ProjectRoleType;
    readonly description: LocaleContentAny;

    constructor({ type, description } : { type: ProjectRoleType, description: LocaleContentAny }) {
        this.type = type;
        this.description = description;
    }
}