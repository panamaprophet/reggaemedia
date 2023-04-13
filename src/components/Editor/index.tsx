import { EditorState, LexicalEditor } from 'lexical';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ToolbarPlugin, TreeViewPlugin } from './plugins';

export const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

export const onError = (error: Error) => {
    console.error(error);
}

interface Props {
    onChange: (ref: EditorState | undefined) => void,
}

export const Editor = ({ onChange }: Props) => {
    const [editor, setEditor] = useState<EditorState>()
    const initialConfig = {
        namespace: 'MyEditor',
        onError,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            LinkNode,
            AutoLinkNode,
            QuoteNode,
        ]
    };

    useEffect(() => {
        onChange(editor);
    }, [editor])

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='w-full'>
                <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={<div>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={(state: EditorState) => setEditor(state)} />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <MyCustomAutoFocusPlugin />
            </div>
            <TreeViewPlugin />
        </LexicalComposer>
    );
}

export default Editor;
