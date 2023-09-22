import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

import { Underline as UnderlineIcon } from '@/components/Icons/Underline';
import { Item } from '../Item';
import { useState } from 'react';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';


export const Underline = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());

    const $updateActive = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setActive(selection.hasFormat('underline'));
            };
        })

        return false;
    };

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateActive);

    return (
        <Item
            title="Underline"
            active={isActive}
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        >
            <UnderlineIcon />
        </Item>
    )
}
