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
      <p>Hello! My name is Vinicius, and welcome to my personal website.</p>
      <p>I started this site to write down discoveries, references and thoughts about tech, programming and communication. While mostly for personal use, I hope people who read my articles find the content helpful and insightful.</p>
      <p>I have been working as a full-stack developer since 2009, sometimes adventuring as a tech lead and corporate architect.</p>
      <p>My specialty is web development using .NET Core and ASP.NET. I have also developed mobile apps in Android native and Flutter, web interfaces with ReactJS and NextJS (such as this site), and Windows desktop apps.</p>
      <p>I believe tech solutions should be developed to make life easier - the easier, the better. Simple is best. No solution should be more complicated than the problem it is trying to solve.</p>
      <p>I like tactful sincerity and clearness, in both communication and code.</p>
      <p>And sometimes, building your own solution is easier and more effective than working around a generalist tool.</p>
      <p>Feel free to contact me or add me on social media!</p>
    </>),
    pt: (<>
      <p>Olá! Meu nome é Vinicius, e bem-vindo ao meu site pessoal!</p>,
      <p>Criei este site para registrar descobertas, referências e pensamentos sobre tecnologia, programação e comunicação. Mesmo sendo primariamente para uso pessoal, espero que quem ler meus artigos considere o conteúdo útil e interessante.</p>,
      <p>Atuo como desenvolvedor full-stack desde 2009, e às vezes me aventuro como líder técnico e arquiteto corporativo.</p>,
      <p>Minha especialidade é desenvolvimento web com .NET Core e ASP.NET. Também desenvolvi aplicativos mobile em Android nativo e Flutter, interfaces web com ReactJS e NextJS (como este site), e aplicativos desktop para Windows.</p>,
      <p>Acredito que soluções de tech devem ser feitas para facilitar a vida — quanto fácil, melhor.</p>,
      <p>Ser mais simples é melhor. Soluções não devem ser mais complexas que os problemas que tentam resolver.</p>,
      <p>Gosto de sinceridade com tato e clareza, tanto na comunicação quanto no código.</p>,
      <p>E às vezes, creio que criar sua própria solução é mais fácil e eficiente do que degladiar com uma ferramenta generalista.</p>,
      <p>Fique à vontade para entrar em contato comigo ou me adicionar nas redes sociais!</p>
    </>)
  })
};

export default AboutContent;