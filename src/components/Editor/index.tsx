import { useState } from 'react';
import { EditorState, LexicalEditor, SerializedEditorState } from 'lexical';
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
import { ToolbarPlugin, EmbedPlugin, FocusPlugin } from './plugins';
import { EmbedNode } from './plugins/Embed/node';
import * as CutterPlugin from './plugins/Cutter';
import FloatingLinkEditorPlugin from './plugins/FloatLink/plugin';


export const onError = (error: Error) => {
    console.error(error);
}

interface Props {
    theme: {
        [k: string]: string | Props['theme'],
    },
    initialState?: SerializedEditorState,
    onChange: (state: EditorState) => void,
    onUpload: (file: File) => Promise<string | null>,
}

export const Editor = ({ initialState, theme, onChange, onUpload }: Props) => {
    const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

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
            EmbedNode,
            CutterPlugin.Node,
        ],
        editorState: (editor: LexicalEditor) => {
            if (initialState) {
                editor.setEditorState(
                    editor.parseEditorState(initialState)
                );
            }
        },
    };

    const handleUpload = async (file: File) => {
        const url = await onUpload(file);

        if (!url) {
            throw Error('Error occured on processing file upload');
        }

        return url;
    }

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <ToolbarPlugin />
            <div className='w-full h-screen-1/2'>
                <RichTextPlugin
                    contentEditable={
                        <div className="relative" ref={onRef}>
                            <ContentEditable className="min-h-full focus:outline-none p-4" />
                        </div>
                    }
                    placeholder={null}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
                <EmbedPlugin onUpload={handleUpload} />
                <CheckListPlugin />
                <FocusPlugin />
                <CutterPlugin.Plugin />
                {/* <TreeViewPlugin /> */}
                {floatingAnchorElem && (
                    <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
                )}
            </div>
        </LexicalComposer>
    );
}

export default Editor;
