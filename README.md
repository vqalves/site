# Personal WebSite
Built using [Next.js](https://nextjs.org/) via [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## First execution
```bash
git clone https://github.com/vqalves/site.git
cd site
npm install
npx next dev
```

## Locale strategy
Most text inside the site is wrapped around `LocaleContent`, which provides a translated text based on a locale.

Get content based on locale:
```mermaid
sequenceDiagram
    LocaleType->>LocaleContent: getContent()
    LocaleContent->>LocaleType: translated content
```

How the content is implemented:
```mermaid
graph TD;
    LocaleContent-.->LocaleContentAny;
    LocaleContent-.->LocaleContentText;
```