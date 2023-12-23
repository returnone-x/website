import "./codeBlock.css";
import React from "react";
import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { CopyButton, ActionIcon } from "@mantine/core";
import { HiClipboard, HiClipboardCheck } from "react-icons/hi";

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
    <NodeViewWrapper className="code-block">
      <div className="copy-button-container">
        <CopyButton value={"test"}>
          {({ copied, copy }) => (
            <ActionIcon
              variant="outline"
              color={copied ? "green" : "gray"}
              aria-label="Settings"
              onClick={copy}
            >
              {copied ? <HiClipboardCheck /> : <HiClipboard />}
            </ActionIcon>
          )}
        </CopyButton>
      </div>
      <pre>
        <NodeViewContent as="code" />
      </pre>
    </NodeViewWrapper>
  );
};

export default CodeBlockComponent;
