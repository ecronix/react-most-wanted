import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Scrollbar, Page } from "@ecronix/material-ui-shell";

const loadData = async (path) => {
  const data = await fetch(path);
  const text = await data.text();
  return text;
};

// eslint-disable-next-lin
export function MarkdownPageContainer({ path, pageProps }) {
  const [source, setSource] = useState(null);

  useEffect(() => {
    loadData(path).then((text) => {
      setSource(text);
    });
  }, [path]);

  return (
    <Page {...pageProps}>
      <Scrollbar>
        <div style={{ padding: 12 }}>
          {source && (
            <ReactMarkdown className="markdown-body" children={source} />
          )}
        </div>
      </Scrollbar>
    </Page>
  );
}
