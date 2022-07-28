import { LocaleContent } from "./locale"

export class ProjectTechGroup {
    static readonly backend: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContent({
            en: "Backend",
            pt: "Backend"
        })
    });

    static readonly frontend: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContent({
            en: "Frontend",
            pt: "Frontend"
        })
    });

    static readonly mobile: ProjectTechGroup = new ProjectTechGroup({
        name: new LocaleContent({
            en: "Mobile",
            pt: "Mobile"
        })
    });

    static listAll(): ProjectTechGroup[] {
        return [ this.backend, this.frontend, this.mobile ];
    }

    name: LocaleContent;

    constructor({ name } : { name : LocaleContent}) {
        this.name = name;
    }
}

export default class ProjectTech {
    static readonly netCore: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: ".NET Core",
            pt: ".NET Core"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly sqlServer: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "SQL Server",
            pt: "SQL Server"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly rabbitMQ: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "RabbitMQ",
            pt: "RabbitMQ"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly reactJs: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "ReactJS",
            pt: "ReactJS"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly flutterWeb: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "Flutter Web",
            pt: "Flutter Web"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly flutterMobile: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "Flutter",
            pt: "Flutter"
        }),

        techGroup: ProjectTechGroup.mobile
    });

    static readonly android: ProjectTech = new ProjectTech({
        name: new LocaleContent({
            en: "Android native",
            pt: "Android native"
        }),

        techGroup: ProjectTechGroup.mobile
    });

    name: LocaleContent;
    techGroup: ProjectTechGroup;

    constructor({ name, techGroup } : { name : LocaleContent, techGroup : ProjectTechGroup}) {
        this.name = name;
        this.techGroup = techGroup;
    }
}