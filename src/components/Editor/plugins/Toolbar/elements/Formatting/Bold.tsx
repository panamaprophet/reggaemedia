import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';

import { Bold as BoldIcon } from '@/components/Icons/Bold';
import { Item } from '../Item';
import { useState } from 'react';
import { useRegisterListener } from '@/components/Editor/hooks/useRegisterListener';


export const Bold = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());

    const $updateActive = () => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setActive(selection.hasFormat('bold'));
            }
        })

        return false;
    };

    useRegisterListener('onEdit', setEditable);
    useRegisterListener('onUpdate', $updateActive);

    return (
        <Item
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Bold"
            aria-label="Format text as bold."
        >
            <BoldIcon />
        </Item>
    )
}
