import { LocaleContentAny, LocaleContentText } from "../models/locale";

const ArticlesContent = {
    title: new LocaleContentText({
      en: "Articles",
      pt: "Artigos"
    }),
  
    description: new LocaleContentAny({
      en: "Content and studies for myself and others",
      pt: "Conteúdos e estudos para mim e para outros"
    }),
  
    presentationText: new LocaleContentAny({
      en: "A few articles...",
      pt: "Lista de artigos..."
    })
  };

  export default ArticlesContent;