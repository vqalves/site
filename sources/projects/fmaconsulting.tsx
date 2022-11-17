import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const fmaConsulting = new Project({
    title: "Multiple systems",
    company: "FMA Consulting",
    link: "https://fmaconsulting.com.br",

    period: new LocaleContentAny({
        en: "Feb 2010 - Apr 2013",
        pt: "Fev 2010 - Abr 2013"
    }),

    description: new LocaleContentAny({
        en: "Software house for sereval on-demand softwares of multiple domains, including costumer relationship management systems (CRMs), customer management systems (CMS), enterprise shares management with dividend distribution, group buying marketplaces, email marketing tools, point of sale systems (POS), and many others.",
        pt: "Software house de diversos sistemas sob demanda de múltiplos domínios diferentes, incluindo sistemas de gestão de relacionamento com cliente (CRMs), sistema de gestão de cliente (CMS), sistema de gestão de cotistas com distribuição de dividendos, sistemas de compra coletiva, ferramentas de email marketing, sistemas de ponto de venda (PDV), e outros."
    }),

    tech: [
        ProjectTech.netFramework,
        ProjectTech.sqlServer,
        
        ProjectTech.jquery,
        ProjectTech.bootstrap
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.techLead,
            description: new LocaleContentAny({
                en: "Designed the architecture, defined the technologies used throughout the projects and assisted/reviewed the tasks of all the development team.",
                pt: "Elaboração da arquitetura, definição das tecnologias utilizadas ao longo do projeto e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Developed APIs and tools to process, persist and export data, for customers and/or internal usage.",
                pt: "Desenvolvimento de APIs e ferramentas para processar, persistir e exportar dados, disponíveis para clientes e uso interno."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContentAny({
                en: "Developed responsive and dynamic pages based on layouts built by the design team.",
                pt: "Desenvolvimento de páginas responsivas e dinâmicas baseado nos layouts construídos pela equipe de design."
            })
        })
    ]
});