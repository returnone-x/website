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
import { BiCodeBlock } from "react-icons/bi";
import { Registerlowlight } from "./codeLowLight";
import CodeBlockComponent from "./codeBlock";
import { Dispatch, SetStateAction } from "react";

const lowlight = Registerlowlight;

const content = ""
export function TiptapEditor({changeContent}: {changeContent: Dispatch<SetStateAction<string>>}) {
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
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      changeContent(html)
    },
    
  });

  return (
    <RichTextEditor editor={editor} spellCheck={false}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.H2 />
          <RichTextEditor.Code />
          <RichTextEditor.CodeBlock icon={BiCodeBlock} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
