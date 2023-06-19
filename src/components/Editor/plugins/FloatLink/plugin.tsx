import * as React from 'react';

import {$isAutoLinkNode, $isLinkNode} from '@lexical/link';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {$findMatchingParent} from '@lexical/utils';
import {
    $getSelection,
    $isRangeSelection,
} from 'lexical';
import {useCallback, useState} from 'react';
import {createPortal} from 'react-dom';
import { useRegisterListener } from '../../hooks/useRegisterListener';
import { getSelectedNode } from './helpers';
import FloatingLinkEditor from './component';


export const FloatLinkPlugin = () => {
    const [isLink, setIsLink] = useState(false);
    const [editor] = useLexicalComposerContext();

    const updateToolbar = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkParent = $findMatchingParent(node, $isLinkNode);
                const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode);

                setIsLink(Boolean(linkParent && !autoLinkParent));
            }
        });
    }, [editor]);

    useRegisterListener('onUpdate', updateToolbar);
    
    if (!isLink) {
        return null;
    }

    return createPortal(<FloatingLinkEditor />, document.body);
}
