import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

import { Bold as BoldIcon } from '@/components/Icons/Bold';
import { Item } from "../Item";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";


export const Bold = () => {
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
                        setActive(selection.hasFormat('bold'));
                    }
                });
            })
        );
    }, [editor]);

    return (
        <Item
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Bold"
            aria-label="Format text as bold."
        >
            <BoldIcon size={20} color={color} />
        </Item>
    )
}
