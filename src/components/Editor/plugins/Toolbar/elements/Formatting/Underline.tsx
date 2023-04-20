import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

import { Underline as UnderlineIcon } from '@/components/Icons/Underline';
import { Item } from "../Item";
import { useState } from "react";
import { useMergeRegister } from "@/components/Editor/hooks/useLexicalHooks";
import { EditorEntity } from "@/components/Editor/types";


export const Underline = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(editor.isEditable());
    const color = isActive ? 'black' : 'gray';

    const $updateActive = ({ editorState }: EditorEntity) => {
        editorState.read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                setActive(selection.hasFormat('underline'));
            }
        });

        return false;
    };

    useMergeRegister({ onEdit: setEditable, onUpdate: $updateActive });

    return (
        <Item
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Underline"
            aria-label="Format text as underline."
        >
            <UnderlineIcon size={20} color={color} />
        </Item>
    )
}
