import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const sinergyRH = new Project({
    title: "SinergyRH",
    company: "SinergyRH",
    link: "https://portalsinergyrh.com.br",

    period: new LocaleContentAny({
        en: "Jan 2009 - Feb 2010",
        pt: "Jan 2009 - Fev 2010"
    }),

    description: new LocaleContentAny({
        en: "Implementação de funcionalidades ",
        pt: "Plataforma online e serviços gerais para processos de recursos humanos"
    }),

    tech: [
        ProjectTech.netFramework,
        ProjectTech.sqlServer
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Development and maintenance of general functionalities at the main system. Creation of data exportation using file formats related to the brazilian market needs, like CNAB240, CAGED, SEFIP, MANAD and others.",
                pt: "Desenvolvimento e manutenção de funcionalidades gerais do sistema principal. Criação de exportação de dados usando formatos de arquivo relevantes para o mercado, como CNAB240, CAGED, SEFIP, MANAD e outros."
            })
        })
    ]
});