import { sanitizeUrl } from "@/components/Editor/utils/url"
import { Bold } from "@/components/Icons/Formatting/Bold"
import { Italic } from "@/components/Icons/Italic"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical"
import { useCallback } from "react"
import { Item } from "./Item"
import { Underline } from "@/components/Icons/Underline"
import { Link } from "@/components/Icons/Link"
import { Code } from "@/components/Icons/Code"

interface Props {
    editor: LexicalEditor,
    IS_APPLE: boolean,
    isEditable: boolean,
    isBold: boolean,
    isItalic: boolean,
    isUnderline: boolean,
    isLink: boolean,
}


export const Format = ({ editor, isBold, isItalic, isUnderline, isLink, isEditable, IS_APPLE }: Props) => {
    const insertLink = useCallback(() => {
        if (!isLink) {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
        } else {
            editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
        }
    }, [editor, isLink]);

    return (
        <>
            <Item
                disabled={!isEditable}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className={isBold ? 'border rounded bg-slate-100' : ''}
                title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
                aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? '⌘B' : 'Ctrl+B'
                    }`}>
                {isBold ? <Bold size={20} /> : <Bold size={20} color="gray" />}
            </Item>
            <Item
                disabled={!isEditable}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className={isItalic ? 'border rounded bg-slate-100' : ''}
                title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
                aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? '⌘I' : 'Ctrl+I'
                    }`}>
                {isItalic ? <Italic size={20} /> : <Italic size={20} color="gray" />}
            </Item>
            <Item
                disabled={!isEditable}
                onClick={() => {
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className={isUnderline ? 'border rounded bg-slate-100' : ''}
                title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
                aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? '⌘U' : 'Ctrl+U'
                    }`}>
                {isUnderline ? <Underline size={20} /> : <Underline size={20} color="gray" />}
            </Item>
            <Item
                disabled={!isEditable}
                onClick={insertLink}
                className={isLink ? 'border rounded bg-slate-100 ' : ''}
                aria-label="Insert link"
                title="Insert link">
                {isLink ? <Link size={25} /> : <Link size={25} color="gray" />}
            </Item>
        </>
    )
}
