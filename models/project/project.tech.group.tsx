import LocaleContentAny from "../locale/locale.content.any"

export default class ProjectTechGroup {
    static readonly backend: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContentAny({
            en: "Backend",
            pt: "Backend"
        })
    });

    static readonly frontend: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContentAny({
            en: "Frontend",
            pt: "Frontend"
        })
    });

    static readonly mobile: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContentAny({
            en: "Mobile",
            pt: "Mobile"
        })
    });

    static listAll(): ProjectTechGroup[] {
        return [ this.backend, this.frontend, this.mobile ];
    }

    readonly name: LocaleContentAny;

    constructor({ name } : { name : LocaleContentAny}) {
        this.name = name;
    }
}