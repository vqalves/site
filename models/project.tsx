import { LocaleContent } from "./locale"
import ProjectRole, { ProjectRoleType } from "./project.role";
import ProjectTech from "./project.tech";

name: new LocaleContent({
    en: "About me",
    pt: "Sobre mim"
})

export class Project {
    name: string;
    link?: string;

    description: LocaleContent;
    period: LocaleContent;
    
    roles: ProjectRole[];
    tech: ProjectTech[];
    

    constructor( { title: name, link, description, period, roles, tech } : { title: string, link?: string, description: LocaleContent, period: LocaleContent, roles: ProjectRole[], tech: ProjectTech[] }) {
        this.name = name;
        this.roles = roles;

        this.description = description;
        this.period = period;
        this.link = link;
        this.tech = tech;
    }
}

const agrity = new Project({
    title: "Agrity",
    link: "https://agrity.com.br",

    period: new LocaleContent({
        en: "Dec 2020 - Jan 2022",
        pt: "Dez 2020 - Jan 2022"
    }),

    description: new LocaleContent({
        en: "Marketplace that connects corn and soybean producers and distributors/traders, for trading and negotiating sacks of grains. 100k tons of grain sold on the first year after deployment.",
        pt: "Marketplace que conecta produtores e distribuidores/comerciantes de milho e soja, para comercialização e negociação de sacas de grãos. 100 mil toneladas de grãos vendidas no primeiro ano após a implantação."
    }),

    tech: [
        ProjectTech.netCore,
        ProjectTech.sqlServer,
        ProjectTech.rabbitMQ,
        ProjectTech.reactJs,
    ],

    roles: [
        new ProjectRole({
            type: ProjectRoleType.techLead,
            description: new LocaleContent({
                en: "Designed the architecture, defined the technologies used throughout the project and assisted/reviewed the tasks of all the development team. Actively participated on the developers recruitment.",
                pt: "Desenhei a arquitetura, defini as tecnologias utilizadas ao longo do projeto e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento. Participei ativamente do recrutamento de desenvolvedores."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContent({
                en: "Development of all systems from scratch. Implemented all features to manage the marketplace listing, asynchronous negotiation features and the \"suggested price\" feature based on the CBOT variation and potential buyers.",
                pt: "Desenvolvimento de todos os sistemas do zero. Implementei todas as funcionalidades para gerenciamento da listagem de ofertas do marketplace, recursos de negociação assíncrona e o recurso de \"preço sugerido\" com base na variação do CBOT e potenciais compradores."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContent({
                en: "Developed the site from scratch, with responsiveness to open on mobile and connecting to the backend API. Developed strategies to handle the conectivity instability on the farms. The offer listing was implemented on a grid-like style to resemble financial market platforms.",
                pt: "Desenvolvi o site do zero, com responsividade para abrir em mobile e conectar com a API do backend. Desenvolvi estratégias para lidar com a instabilidade de conectividade nas fazendas. A listagem de ofertas foi implementada em um estilo semelhante a um grid para se assemelhar às plataformas de mercado financeiro."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.projectManager,
            description: new LocaleContent({
                en: "Communicated with the product owner to establish the new requirements and priorities for the system, organized the tasks and flow of deliveries with the development team.",
                pt: "Comuniquei com o product owner para estabelecer os novos requisitos e prioridades para o sistema, organizado as tarefas e fluxo de entregas com a equipe de desenvolvimento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.privacyCompliance,
            description: new LocaleContent({
                en: "Worked with the consulting lawyers to make sure all our products and internal processes followed the LGPD (Brazil's General Data Protection Law) requirements. Proposed and enforced data governance procedures.",
                pt: "Trabalhei com os advogados consultores para garantir que todos os nossos produtos e processos internos seguissem os requisitos da LGPD (Lei Geral de Proteção de Dados). Propuz e apliquei procedimentos de governança de dados."
            })
        }),
    ]
});

const ProjectModels = {
    listAll(): Project[] { 
        return [agrity];
    }
}

export default ProjectModels;