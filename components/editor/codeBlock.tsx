import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import classes from './Codeblock.module.css'

interface CodeBlockProps {
  node: {
    attrs: {
      content: string;
      language: string;
    };
  };
  updateAttributes: (attributes: { language: string }) => void;
  extension: {
    options: {
      lowlight: {
        listLanguages: () => string[];
      };
    };
  };
}

const CodeBlockComponent: React.FC<CodeBlockProps> = ({
  node: {
    attrs: { language: defaultLanguage, content: textContent },
  },
  updateAttributes,
  extension,
}) => {
  return (
    <NodeViewWrapper className={classes.codeblock}>
      <pre className={classes.codeblock}>
        <NodeViewContent as="code" className={classes.codeblock} />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
