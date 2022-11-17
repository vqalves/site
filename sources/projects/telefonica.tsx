import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const telefonica = new Project({
    title: "Multiple systems",
    company: "Telefonica Brasil",
    link: "https://telefonica.com.br",

    period: new LocaleContentAny({
        en: "Aug 2017 - Apr 2019",
        pt: "Ago 2017 - Abr 2019"
    }),

    description: new LocaleContentAny({
        en: "Creation and maintenance of multiple systems for the B2B division of the company. Details protected under NDA.",
        pt: "Criação e manutenção de multiplos sistemas para a divisão de B2B da empresa. Detalhes protegidos sob acordo contratual."
    }),

    tech: [
        ProjectTech.netFramework,
        ProjectTech.sqlServer,
        ProjectTech.jquery,
        ProjectTech.bootstrap
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Developed integration between multiple systems, implemented new features and bugs fixing.",
                pt: "Desenvolvimento de integrações entre diversos sitemas, implementação novas funcionalidades e correção bugs."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContentAny({
                en: "Developed new systems from scratch, implemented new features and improved user experience for existing ones.",
                pt: "Desenvolvimento de novos sistemas do zero, implementação de novas funcionalidades e melhorei a usabilidade de sistemas existentes."
            })
        }),
    ]
});