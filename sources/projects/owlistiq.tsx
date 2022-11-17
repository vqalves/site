import LocaleContentAny from "../../models/locale/locale.content.any";
import Project from "../../models/project/project";
import ProjectRole from "../../models/project/project.role";
import ProjectRoleType from "../../models/project/project.role.type";
import ProjectTech from "../../models/project/project.tech";

export const owlistiq = new Project({
    title: "Owlistiq",
    company: "Owlistiq",
    link: "https://owlistiq.com",

    period: new LocaleContentAny({
        en: "Jan 2022 - Now",
        pt: "Jan 2022 - Agora"
    }),

    description: new LocaleContentAny({
        en: "Ecosystem to collect confidential data through mobile forms, available using a dynamic form builder.",
        pt: "Ecossistema de criação dinâmica de formulários mobile para coleta de dados confidenciais."
    }),

    tech: [
        ProjectTech.netCore,
        ProjectTech.sqlite,
        ProjectTech.flutterWeb,
        ProjectTech.flutterMobile
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.techLead,
            description: new LocaleContentAny({
                en: "Designed the architecture, defined the technologies used throughout the project and assisted/reviewed the tasks of all the development team.",
                pt: "Elaboração da arquitetura, definição as tecnologias utilizadas ao longo do projeto e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Development of all systems from scratch. Implemented most features for registering all the data necessary for the form configuration, authorization, sharing and publishing. Integration with payment gateways.",
                pt: "Desenvolvimento de todos os sistemas do zero. Implementei a maioria das funcionalidades para registrar os dados de configuração, permissionamento, compartilhamento e publicação dos formulários. Integração com gateays de pagamento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContentAny({
                en: "Developed the web platform from scratch. Developed the frontend architecture to allow users to configure a dynamic form with a simple start, and through increasing complexity based on the needs. Developed general account management tools.",
                pt: "Desenvolvi a plataforma web do zero. Desenvolvi a arquitetura do frontend para possibilitar a configuração de formulários dinâmicos de forma simples, and de acordo com as necessidades, com complexidade incremental. Implementação de ferramentas pra gestão geral da conta do usuário."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.mobile,
            description: new LocaleContentAny({
                en: "Developed the mobile app from scratch. Implemented most features, including how to display a dynamic form configuration, trigger the optional events and apply data validation, dynamic data persistence and custom data syncronization with different types of central data sources.",
                pt: "Desenvolvi o aplicativo mobile do zero. Implementei a maioria das funcionalidades, incluindo como exibir um formulário dinâmico baseado nas configurações, disparar eventos opcionais e aplicar a validação de dados dinâmico, persistência dos dados do formulário dinâmico e a sincronização dos dados coletados com diferentes tipos de destinos e integrações."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.projectManager,
            description: new LocaleContentAny({
                en: "Organized the tasks and flow of deliveries with the development and marketing teams.",
                pt: "Organizado as tarefas e fluxo de entregas com a equipe de desenvolvimento e marketing."
            })
        }),
    ]
});