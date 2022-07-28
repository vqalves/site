import { LocaleContent } from "./locale"

export class ProjectRoleType {
    static readonly techLead: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContent({
            en: "Tech lead",
            pt: "Tech lead"
        })
    });

    static readonly backendDev: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContent({
            en: "Backend developer",
            pt: "Backend developer"
        })
    });

    static readonly frontendDev: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContent({
            en: "Frontend developer",
            pt: "Frontend developer"
        })
    });

    static readonly projectManager: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContent({
            en: "Project manager",
            pt: "Gerente de projetos"
        })
    });

    static readonly privacyCompliance: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContent({
            en: "Board of privacy compliance",
            pt: "Equipe de compliance de privacidade"
        })
    });

    readonly name: LocaleContent;

    constructor({ name } : { name : LocaleContent}) {
        this.name = name;
    }
}

export default class Role {
    readonly type: ProjectRoleType;
    readonly description: LocaleContent;

    constructor({ type, description } : { type: ProjectRoleType, description: LocaleContent }) {
        this.type = type;
        this.description = description;
    }
}