import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

import { Underline as UnderlineIcon } from '@/components/Icons/Underline';
import { Item } from "../Item";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";


export const Underline = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(() => editor.isEditable());
    const color = isActive ? 'black' : 'gray';

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener(setEditable),
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        setActive(selection.hasFormat('underline'));
                    }
                });
            })
        );
    }, [editor]);

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
