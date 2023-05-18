import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';


export const FocusPlugin = () => {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.focus(undefined, { defaultSelection: 'rootStart' });
    }, [editor]);

    return null;
}
