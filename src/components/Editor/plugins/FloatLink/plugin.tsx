import * as React from 'react';

import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $findMatchingParent } from '@lexical/utils';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_HIGH, KEY_ESCAPE_COMMAND } from 'lexical';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRegisterListener } from '../../hooks/useRegisterListener';
import { getSelectedNode } from './helpers';
import FloatingLinkEditor from './component';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';


export const FloatLinkPlugin = () => {
    const [editor] = useLexicalComposerContext();
    const [link, setLink] = useState('');

    useRegisterListener('onUpdate', () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkParent = $findMatchingParent(node, $isLinkNode);

                let url = '';

                if ($isLinkNode(node)) {
                    url = node.getURL();
                }

                if ($isLinkNode(linkParent)) {
                    url = linkParent.getURL();
                }

                setLink(url);
            }
        });
    });

    const submit = () => editor.dispatchCommand(TOGGLE_LINK_COMMAND, link);

    useRegisterCommand(KEY_ESCAPE_COMMAND, () => {
        setLink('');

        return true;
    }, COMMAND_PRIORITY_HIGH);

    if (!link) {
        return null;
    }

    return createPortal(<FloatingLinkEditor link={link} onChange={setLink} onSubmit={submit} />, document.body);
}
