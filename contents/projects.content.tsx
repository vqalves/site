import LocaleContentAny from "../models/locale/locale.content.any";
import LocaleContentText from "../models/locale/locale.content.text";

const ProjectsContent = {
    title: new LocaleContentText({
      en: "Projects",
      pt: "Projetos"
    }),
  
    description: new LocaleContentAny({
      en: "Projects I've worked on previously",
      pt: "Projetos que já trabalhei"
    })
  };

  export default ProjectsContent;