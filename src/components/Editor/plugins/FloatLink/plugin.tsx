import * as React from 'react';

import {$isAutoLinkNode, $isLinkNode} from '@lexical/link';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$findMatchingParent} from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
    LexicalEditor,
    SELECTION_CHANGE_COMMAND,
} from 'lexical';
import {useCallback, useState} from 'react';
import {createPortal} from 'react-dom';
import { useRegisterListener } from '../../hooks/useRegisterListener';
import { useRegisterCommandCritical } from '../../hooks/useRegisterCommand';
import FloatingLinkEditor from './component';
import { getSelectedNode } from '@/helpers';


const useFloatingLinkEditorToolbar = (editor: LexicalEditor, anchorElem: HTMLElement ) => {
    const [isLink, setIsLink] = useState(false);

    const updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const node = getSelectedNode(selection);
            const linkParent = $findMatchingParent(node, $isLinkNode);
            const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);

            if (linkParent != null && autoLinkParent == null) {
                setIsLink(true);
            } else {
                setIsLink(false);
            }
        }
    }, []);

    useRegisterListener('onUpdate', editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
            updateToolbar();
        });
    }))

    useRegisterCommandCritical(SELECTION_CHANGE_COMMAND, (_payload) => {
        updateToolbar();

        return false;
    })

    return createPortal(
        <FloatingLinkEditor
            editor={editor}
            isLink={isLink}
            setIsLink={setIsLink}
        />,
        anchorElem,
    );
}

export default function FloatingLinkEditorPlugin({ anchorElem = document.body }: { anchorElem?: HTMLElement }) {
    const [editor] = useLexicalComposerContext();
    
    return useFloatingLinkEditorToolbar(editor, anchorElem);
}
