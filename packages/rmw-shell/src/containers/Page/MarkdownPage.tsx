import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Scrollbar, Page } from "@ecronix/material-ui-shell";

const loadData = async (path: string): Promise<string> => {
  const data = await fetch(path);
  const text = await data.text();
  return text;
};

type MarkdownProps = {
  path: string;
  pageProps: any;
};
// eslint-disable-next-lin
export function MarkdownPageContainer({ path, pageProps }: MarkdownProps) {
  const [source, setSource] = useState<string | null>(null);

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
