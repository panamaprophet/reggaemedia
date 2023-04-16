import { EditorState } from 'lexical';
import { useEffect, useState } from 'react';

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
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ToolbarPlugin, TreeViewPlugin, ImagesPlugin } from './plugins';

import theme from './theme';
import { ImageNode } from './nodes/ImageNode';

export const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
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
    const [_editor, setEditor] = useState<EditorState>()
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
        nodes: [
            HeadingNode,
            ListNode,
            ListItemNode,
            LinkNode,
            AutoLinkNode,
            QuoteNode,
            ImageNode
        ]
    };

    const _onChange = (state: EditorState) => {
        setEditor(state);

        onChange(state);
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='w-full'>
                <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={<div>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={_onChange} />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <ImagesPlugin />
                <CheckListPlugin />
                <MyCustomAutoFocusPlugin />
            </div>
            <TreeViewPlugin />
        </LexicalComposer>
    );
}

export default Editor;
