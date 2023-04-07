import { EditorState } from 'lexical';
import { useEffect, useRef } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TreeView } from '@lexical/react/LexicalTreeView';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';


function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        // Focus the editor when the effect fires!
        editor.focus();
    }, [editor]);

    return null;
}

function onError(error: Error) {
    console.error(error);
}

function Editor() {
    const editorStateRef = useRef<EditorState>();
    const tags = ['asd', 'dsa', 'qwe']

    const initialConfig = {
        namespace: 'MyEditor',
        onError,
        nodes: [
            HeadingNode,
            HeadingNode,
            QuoteNode,
            ListItemNode,
            ListNode,
            AutoLinkNode,
            LinkNode,
        ]
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className='flex flex-col items-center justify-evenly max-w-4xl bg-slate-600 gap-2'>
                <input className="p-2 text-xl font-bold" type="text" placeholder="Start typing article header"></input>
                <div className='flex gap-1 items-center justify-center'>
                    {tags.map((tag) => <div key={tag + Math.random()}>{tag}</div>)}
                    <input className="p-2 text-m" type="text" placeholder="Start typing tags"></input>
                </div>
                <div className="w-1/2 h-96 mt-8 bg-slate-300 rounded border">
                    <RichTextPlugin
                        contentEditable={<ContentEditable />}
                        placeholder={<div>Enter some text...</div>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    <OnChangePlugin onChange={editorState => editorStateRef.current = editorState} />
                    <HistoryPlugin />
                    <ListPlugin />
                    <LinkPlugin />
                    <MyCustomAutoFocusPlugin />
                </div>
                <button className="border p-2 rounded bg-slate-200" onClick={() => console.log(JSON.stringify(editorStateRef.current))}>Save</button>
            </div>
        </LexicalComposer>
    );
}

export default Editor;

