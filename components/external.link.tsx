export default function ExternalLink(props: any) {
    return (<a target="_blank" rel="noreferrer" href={props.href}>{props.children}</a>);
}