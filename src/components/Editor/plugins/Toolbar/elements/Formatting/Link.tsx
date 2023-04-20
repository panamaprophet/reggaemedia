import { useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Link as LinkIcon } from '@/components/Icons/Link';
import { Item } from "../Item";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { sanitizeUrl } from "@/components/Editor/utils/url";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection } from "lexical";
import { getSelectedNode } from "@/components/Editor/utils/getSelectedNode";


export const Link = () => {
    const [editor] = useLexicalComposerContext();
    const [isActive, setActive] = useState(false);
    const [isEditable, setEditable] = useState(() => editor.isEditable());
    const color = isActive ? 'black' : 'gray';

    const insertLink = () =>
        !isActive
            ? editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'))
            : editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

    useEffect(() => {
        return mergeRegister(
            editor.registerEditableListener(setEditable),
            editor.registerUpdateListener(({ editorState }) => {
                editorState.read(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const node = getSelectedNode(selection);
                        const parent = node.getParent();
                        if ($isLinkNode(parent) || $isLinkNode(node)) {
                            setActive(true);
                        } else {
                            setActive(false);
                        }
                    }
                });
            })
        );
    }, [editor]);

    return (
        <Item
            disabled={!isEditable}
            onClick={insertLink}
            className={isActive ? 'border rounded bg-slate-100' : ''}
            title="Link"
            aria-label="Format text as Link."
        >
            <LinkIcon size={20} color={color} />
        </Item>
    )
}