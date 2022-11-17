import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const sigear = new Project({
    title: "SIGEAR",
    company: "Unidesk",
    link: "https://unidesk.com.br",

    period: new LocaleContentAny({
        en: "Jan 2016 - Jan 2017",
        pt: "Jan 2016 - Jan 2017"
    }),

    description: new LocaleContentAny({
        en: "System to manage zones of geological risks and populational aid from Belo Horizonte city",
        pt: "Sistema de gerenciamento de áreas de risco geológico e assistência populacional do municipio de Belo Horizonte"
    }),

    tech: [
        ProjectTech.netFramework,
        ProjectTech.mysql,
        ProjectTech.jquery,
        ProjectTech.bootstrap
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.techLead,
            description: new LocaleContentAny({
                en: "Designed the architecture, defined the technologies used throughout the project and assisted/reviewed the tasks of all the development team.",
                pt: "Elaboração da arquitetura, definição das tecnologias utilizadas ao longo do projeto e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Developed the API to manage the workflow for geological e populational aid requests, and received georeferenced data from mobile devices. Developed integrations with existing systems.",
                pt: "Desenvolvimento da API para gerenciar o fluxo de demandas de risco geológico e assistência populacional de Belo Horizonte, e recebimento de dados georreferenciados de aparelhos mobile. Implementação de integrações com sistemas existentes."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContentAny({
                en: "Developed the web platform from scratch, hand-crafted specifically following the product owner direction.",
                pt: "Desenvolvimento da plataforma web do zero, criado especificamente segundo os direcionamentos do Product Owner."
            })
        }),
    ]
});