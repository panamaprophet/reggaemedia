import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";

import { Italic as ItalicIcon } from '@/components/Icons/Italic';
import { Item } from "../Item";
import { useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";


export const Italic = () => {
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
                        setActive(selection.hasFormat('italic'));
                    }
                });
            })
        );
    }, [editor]);

    return (
        <Item
            disabled={!isEditable}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Italic"
            aria-label="Format text as italic."
        >
            <ItalicIcon size={20} color={color} />
        </Item>
    )
}
