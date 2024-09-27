import React, { useEffect, useState } from "react";
import { Scrollbar } from "@ecronix/material-ui-shell";
import Page from "@ecronix/material-ui-shell/pages/Page";
import ReactMarkdown from "react-markdown";

const loadData = async (path) => {
  const data = await fetch(path);
  const text = await data.text();
  return text;
};

// eslint-disable-next-lin
const MarkdownPage = ({ path, pageProps }) => {
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
};

export default MarkdownPage;
