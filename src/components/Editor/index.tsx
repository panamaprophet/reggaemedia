import { EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListItemNode, ListNode } from '@lexical/list';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import { ToolbarPlugin, ImagePlugin, FocusPlugin, TreeViewPlugin } from './plugins';

import { ImageNode } from './plugins/Image/node';
import theme from './theme';

export const onError = (error: Error) => {
    console.error(error);
}

interface Props {
    onChange: (ref: EditorState | undefined) => void,
}

export const Editor = ({ onChange }: Props) => {
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

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='w-full'>
                <RichTextPlugin
                    contentEditable={<ContentEditable />}
                    placeholder={<div>Enter some text...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <ImagePlugin />
                <CheckListPlugin />
                <FocusPlugin />
                <TreeViewPlugin />
            </div>
        </LexicalComposer>
    );
}

export default Editor;
