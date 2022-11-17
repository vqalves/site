import LocaleContentAny from "../models/locale/locale.content.any";
import LocaleContentText from "../models/locale/locale.content.text";

const ArticlesContent = {
    title: new LocaleContentText({
      en: "Articles",
      pt: "Artigos"
    }),
  
    description: new LocaleContentAny({
      en: "Content and studies for myself and others",
      pt: "Conteúdos e estudos para mim e para outros"
    }),
  
    search: new LocaleContentAny({
      en: "Search",
      pt: "Procurar"
    })
  };

  export default ArticlesContent;