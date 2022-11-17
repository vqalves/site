import LocaleContentAny from "../models/locale/locale.content.any";

const LayoutContent = {
    language: new LocaleContentAny({
      en: "Language",
      pt: "Idioma"
    }),
  
    theme: new LocaleContentAny({
      en: "Theme",
      pt: "Tema"
    }),
  };

  export default LayoutContent;