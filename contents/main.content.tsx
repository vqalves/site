import { LocaleContent } from "../models/locale";

const MainContent = {
    title: new LocaleContent({
      en: "About me",
      pt: "Sobre mim"
    }),
  
    description: new LocaleContent({
      en: "Get to know a bit more about me",
      pt: "Um pouco mais sobre mim"
    }),
  
    about: new LocaleContent({
      en: "This is about me!",
      pt: "Sobre mim!"
    })
  };

  export default MainContent;