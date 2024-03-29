import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { Link as LinkIcon } from '@/components/Icons/Link';
import { Item } from '../Item';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getSelection, $isRangeSelection } from 'lexical';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';


export const Link = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());

    const insertLink = () =>
        !isActive
            ? editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: '', target: '_blank' })
            : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

    const $updateActive = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const node = selection.anchor.getNode();
                const parent = node.getParent();
                if ($isLinkNode(parent) || $isLinkNode(node)) {
                    setActive(true);
                } else {
                    setActive(false);
                }
            }

            return false;
        })
    }

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateActive);

    return (
        <Item
            title="Сссылка"
            active={isActive}
            disabled={!isEditable}
            onClick={insertLink}
        >
            <LinkIcon />
        </Item>
    )
}
