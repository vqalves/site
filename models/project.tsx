import { LocaleContentAny } from "./locale"
import ProjectRole, { ProjectRoleType } from "./project.role";
import ProjectTech from "./project.tech";

export class Project {
    readonly title: string;
    readonly company: string;
    readonly link?: string;

    readonly description: LocaleContentAny;
    readonly period: LocaleContentAny;
    
    readonly roles: ProjectRole[];
    readonly tech: ProjectTech[];
    

    constructor( { title, company, link, description, period, roles, tech } : { title: string, company: string, link?: string, description: LocaleContentAny, period: LocaleContentAny, roles: ProjectRole[], tech: ProjectTech[] }) {
        this.title = title;
        this.company = company;
        this.roles = roles;

        this.description = description;
        this.period = period;
        this.link = link;
        this.tech = tech;
    }
}

const owlistiq = new Project({
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

const agrity = new Project({
    title: "Agrity",
    company: "Agrity",
    link: "https://agrity.com.br",

    period: new LocaleContentAny({
        en: "Dec 2020 - Jan 2022",
        pt: "Dez 2020 - Jan 2022"
    }),

    description: new LocaleContentAny({
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
            description: new LocaleContentAny({
                en: "Designed the architecture, defined the technologies used throughout the project and assisted/reviewed the tasks of all the development team. Actively participated on the developers recruitment.",
                pt: "Elaboração da arquitetura, definição das tecnologias utilizadas ao longo do projeto e auxiliei/revisei os trabalhos de toda a equipe de desenvolvimento. Participei ativamente do recrutamento de desenvolvedores."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.backendDev,
            description: new LocaleContentAny({
                en: "Development of all systems from scratch. Implemented all features to manage the marketplace listing, asynchronous negotiation features and the \"suggested price\" feature based on the CBOT variation and potential buyers.",
                pt: "Desenvolvimento de todos os sistemas do zero. Implementei a maioria das funcionalidades para gerenciamento da listagem de ofertas do marketplace, recursos de negociação assíncrona e o recurso de \"preço sugerido\" com base na variação do CBOT e potenciais compradores."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.frontendDev,
            description: new LocaleContentAny({
                en: "Developed the web platform from scratch, with responsiveness to open on mobile and connecting to the backend API. Developed strategies to handle the conectivity instability on the farms. The offer listing was implemented on a grid-like style to resemble financial market platforms.",
                pt: "Desenvolvimento da plataforma web do zero, com responsividade para abrir em mobile e conectar com a API do backend. Desenvolvi estratégias para lidar com a instabilidade de conectividade nas fazendas. A listagem de ofertas foi implementada em um estilo semelhante a um grid para se assemelhar às plataformas de mercado financeiro."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.projectManager,
            description: new LocaleContentAny({
                en: "Communicated with the product owner to establish the new requirements and priorities for the system, organized the tasks and flow of deliveries with the development team.",
                pt: "Comunicação com o product owner para estabelecer os novos requisitos e prioridades para o sistema, organizado as tarefas e fluxo de entregas com a equipe de desenvolvimento."
            })
        }),

        new ProjectRole({
            type: ProjectRoleType.privacyCompliance,
            description: new LocaleContentAny({
                en: "Worked with the consulting lawyers to make sure all our products and internal processes followed the LGPD (Brazil's General Data Protection Law) requirements. Proposed and enforced data governance procedures.",
                pt: "Trabalhei com os advogados consultores para garantir que todos os nossos produtos e processos internos seguissem os requisitos da LGPD (Lei Geral de Proteção de Dados). Propuz e apliquei procedimentos de governança de dados."
            })
        }),
    ]
});

const telefonica = new Project({
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

const sigearUnidesk = new Project({
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

const unidesk = new Project({
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

const fmaConsulting = new Project({
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

const sineryRH = new Project({
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

const ProjectModels = {
    listAll(): Project[] { 
        return [owlistiq, agrity, telefonica, sigearUnidesk, unidesk, fmaConsulting, sineryRH];
    }
}

export default ProjectModels;