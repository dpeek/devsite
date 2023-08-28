import { EditorState } from "lexical";

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect } from "react";
import EditorNodes from "./EditorNodes";
import AutoFocusPlugin from "./plugins/AutoFocusPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { trpc } from "./trpc";

const theme = {};

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function StoragePlugin() {
  const put = trpc.pages.put.useMutation();
  const { data: page } = trpc.pages.get.useQuery("/");
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!page) return;
    console.log("load");
    const editorState = editor.parseEditorState(JSON.parse(page.content));
    editor.setEditorState(editorState);
  }, [page]);

  const onChange = useCallback(
    (state: EditorState) => {
      if (!page) return;
      console.log("save");
      const content = JSON.stringify(state);
      put.mutate({ ...page, content });
    },
    [page]
  );

  return <OnChangePlugin onChange={onChange} />;
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: EditorNodes,
  } satisfies InitialConfigType;

  const placeholder = (
    <div className="absolute overflow-hidden text-ellipsis top-8 left-4 right-4 select-none whitespace-nowrap pointer-events-none inline-block text-gray-400">
      Express yourself...
    </div>
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="min-h-full py-8 px-4 prose" />
        }
        placeholder={placeholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <MarkdownShortcutPlugin />
      <ListPlugin />
      <FloatingToolbarPlugin />
      <StoragePlugin />
    </LexicalComposer>
  );
}
