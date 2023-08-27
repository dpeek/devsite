import { EditorState, LexicalEditor } from "lexical";

import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import EditorNodes from "./EditorNodes";
import AutoFocusPlugin from "./plugins/AutoFocusPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import FloatingToolbarPlugin from "./plugins/FloatingToolbarPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import state from './state.json';

const theme = {
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState, editor: LexicalEditor) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    // const root = $getRoot();
    // const selection = $getSelection();
    // console.log(root, selection);
    const json = JSON.stringify(editorState);
    console.log(json);
  });
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: any) {
  console.error(error);
}

function RestoreState() {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    let editorState = editor.parseEditorState(state as any);
    editor.setEditorState(editorState)
  })
  return null;
}

export default function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes:EditorNodes,
  } satisfies InitialConfigType;

  const placeholder = <div className="absolute overflow-hidden text-ellipsis top-8 left-4 right-4 select-none whitespace-nowrap pointer-events-none inline-block text-gray-400">Express yourself...</div>
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="min-h-full py-8 px-4 prose" />}
        placeholder={placeholder}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ToolbarPlugin/>
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <CodeHighlightPlugin />
      <MarkdownShortcutPlugin />
      <ListPlugin />
      <FloatingToolbarPlugin/>
      <RestoreState/>
    </LexicalComposer>
  );
}
