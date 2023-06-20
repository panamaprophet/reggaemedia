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
    const [url, setUrl] = useState('');
    const [key, setKey] = useState('');
    const [isBlank, setBlank] = useState(false);

    useRegisterListener('onUpdate', () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                const node = getSelectedNode(selection);
                const linkParent = $findMatchingParent(node, $isLinkNode);
                setKey(node.getKey());

                let url = '';

                if ($isLinkNode(node)) {
                    url = node.getURL();
                    setBlank(node.__target === '_blank');
                }

                if ($isLinkNode(linkParent)) {
                    url = linkParent.getURL();
                    setBlank(linkParent.__target === '_blank');
                }

                setUrl(url);
            }
        });
    });

    const submit = (target: string) => editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url, target });

    useRegisterCommand(KEY_ESCAPE_COMMAND, () => {
        setUrl('');

        return true;
    }, COMMAND_PRIORITY_HIGH);

    if (!url) {
        return null;
    }

    return createPortal(<FloatingLinkEditor isBlank={isBlank} url={url} onChange={setUrl} onSubmit={submit} />, document.body, key);
}
