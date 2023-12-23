"use client";
import "@mantine/tiptap/styles.css";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import SubScript from "@tiptap/extension-subscript";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Registerlowlight } from "./codeLowLight";
import CodeBlockComponent from "./codeBlock";
import classess from "./Editor.module.css";
const lowlight = Registerlowlight;

export function TiptapVewContent({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      Underline,
      Link,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({ lowlight }),
    ],
    content: content,
    editable: false,
  });

  return (
    <RichTextEditor
      editor={editor}
      spellCheck={false}
      styles={{
        root: {
          border: "0px",
        },
      }}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
