import LocaleContentAny from "../models/locale/locale.content.any";
import LocaleContentText from "../models/locale/locale.content.text";

const AboutContent = {
  title: new LocaleContentText({
    en: "About me",
    pt: "Sobre mim"
  }),

  photo: new LocaleContentText({
    en: "My profile",
    pt: "Minha foto"
  }),

  description: new LocaleContentAny({
    en: "Working as a fullstack developer since 2009, specialized backend in .NET Core and frontend in ReactJS and VanillaJS, and some mobile projects with Android native and Flutter. Check my articles for some code experimentation!",
    pt: "Trabalhando como desenvolvedor fullstack desde 2009, backend especializado em .NET Core e frontend em ReactJS e VanillaJS, e alguns projetos mobile com Android nativo e Flutter. Cheque meus artigos de experimentação de código!"
  }),

  about: new LocaleContentAny({
    en: (<>
      <p>Working as a fullstack developer since 2009, specialized backend in .NET Core and frontend in ASP.NET, ReactJS and VanillaJS. Developed some mobile projects in Android native and Flutter.</p>
      <p>I believe working with tech is a wonderful gateway for making people's lives easier and work smarter, and a great source of entertainment for myself!</p>
    </>),
    pt: (<>
      <p>Trabalhando como desenvolvedor fullstack desde 2009, backend especializado em .NET Core e frontend em ASP.NET, ReactJS e VanillaJS. Desenvolvi alguns projetos mobile com Android nativo e Flutter.</p>
      <p>Acredito que trabalhar com tecnologia é uma ótima oportunidade para tornar a vida das pessoas mais fácil e trabalhar de forma mais inteligente, e pessoalmente é uma grande fonte de entretenimento!</p>
    </>)
  })
};

export default AboutContent;