import LocaleContentAny from "../locale/locale.content.any"
import ProjectTechGroup from "./project.tech.group";

export default class ProjectTech {
    static readonly netFramework: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: ".NET Framework",
            pt: ".NET Framework"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly netCore: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: ".NET Core",
            pt: ".NET Core"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly sqlServer: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "SQL Server",
            pt: "SQL Server"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly sqlite: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "SQLite",
            pt: "SQLite"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly mysql: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "MySQL",
            pt: "MySQL"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly rabbitMQ: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "RabbitMQ",
            pt: "RabbitMQ"
        }),

        techGroup: ProjectTechGroup.backend
    });

    static readonly reactJs: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "ReactJS",
            pt: "ReactJS"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly flutterWeb: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "Flutter Web",
            pt: "Flutter Web"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly jquery: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "jQuery",
            pt: "jQuery"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly bootstrap: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "Bootstrap",
            pt: "Bootstrap"
        }),

        techGroup: ProjectTechGroup.frontend
    });

    static readonly flutterMobile: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "Flutter",
            pt: "Flutter"
        }),

        techGroup: ProjectTechGroup.mobile
    });

    static readonly android: ProjectTech = new ProjectTech({
        name: new LocaleContentAny({
            en: "Android native",
            pt: "Android native"
        }),

        techGroup: ProjectTechGroup.mobile
    });

    readonly name: LocaleContentAny;
    readonly techGroup: ProjectTechGroup;

    constructor({ name, techGroup } : { name : LocaleContentAny, techGroup : ProjectTechGroup}) {
        this.name = name;
        this.techGroup = techGroup;
    }
}