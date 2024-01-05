// Extracted from https://github.com/tleunen/react-gist/blob/master/src/index.js

import React, { createRef, useEffect } from "react";

export interface GithubGistProps {
  hash: string
}

export default function GithubGist(props: GithubGistProps) {
  const iframeRef = createRef<HTMLIFrameElement>();
  const elementId = `gist-${props.hash}`;
  
  useEffect(() => {
    const styles = `body { margin: 0px; padding: 0px; }`;
    const link = `https://gist.github.com/vqalves/${props.hash}.js`;
    const iframeHtml = `<html><head><base target="_parent"><style type="text/css">${styles}</style></head><body onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"><script src="${link}"></script></body></html>`;
    

    let doc = iframeRef.current.document;
    if (iframeRef.current.contentDocument) doc = iframeRef.current.contentDocument;
    else if (iframeRef.current.contentWindow) doc = iframeRef.current.contentWindow.document;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id={elementId}
      width="100%"
    />
  );
}