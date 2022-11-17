import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const unidesk = new Project({
    title: "Multiple systems",
    company: "Unidesk",
    link: "https://unidesk.com.br",

    period: new LocaleContentAny({
        en: "Apr 2013 - Aug 2017",
        pt: "Abr 2013 - Ago 2017"
    }),

    description: new LocaleContentAny({
        en: "Company focused on developing tools and on-demand systems with geoprocessing and georeferencing capabilities, mobile apps for real estate and socioeconomical data gathering, multidevice data synchronization, dynamic reports with pictures, and multiple projects in partnership with official government organizations.",
        pt: "Empresa focada em desenvolvimento de ferramentas e sistemas sob demanda com capacidades de geoprocessamento e georreferenciamento, aplicativos para coleta de dados sócioeconômicos e imobiliários, sincronização de dados coletados em múltiplos dispositivos, relatórios dinâmicos com imagens e desenvolvimento de diversos projetos em parceria com órgãos governamentais."
    }),

    tech: [
        ProjectTech.netFramework,
        ProjectTech.mysql,
        
        ProjectTech.jquery,
        ProjectTech.bootstrap,

        ProjectTech.android
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.techLead,
            description: new LocaleContentAny({
                en: "Designed the architecture, defined the technologies used throughout the projects and assisted/reviewed the tasks of all the development team.",
                pt: "Elaboração da arquitetura, definição das tecnologias utilizadas ao longo dos projetos e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento."
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
                en: "Developed new systems from scratch.",
                pt: "Desenvolvimento de sistemas do zero."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.mobile,
            description: new LocaleContentAny({
                en: "Developed several apps to gather data through forms, with audio recording, picture and video taking and GPS capabilities. Apps compatible with Android 4.2",
                pt: "Desenvolvimento de diversos aplicativos para coleta de dados através de formulários, com gravações de audio, fotos, vídeos e funcionalidade de GPS. Aplicativos compatíveis com android 4.2"
            })
        }),
    ]
});