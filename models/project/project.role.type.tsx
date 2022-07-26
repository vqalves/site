import LocaleContentAny from "../locale/locale.content.any"

export default class ProjectRoleType {
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

    static readonly mobile: ProjectRoleType = new ProjectRoleType({
        name: new LocaleContentAny({
            en: "Mobile developer",
            pt: "Mobile developer"
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