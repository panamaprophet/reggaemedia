import { useEffect } from "react";
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, LexicalEditor, REDO_COMMAND, UNDO_COMMAND } from "lexical";

import { Undo as UndoIcon } from "@/components/Icons/Undo";
import { Redo as RedoIcon } from "@/components/Icons/Redo";
import { Button } from "@/components/Button";
import { Item } from "./Item";

interface Props {
    editor: LexicalEditor,
    canUndo: boolean,
    canRedo: boolean,
    isEditable: boolean,
    IS_APPLE: boolean,
    setCanRedo: (shit: boolean) => void,
    setCanUndo: (shit: boolean) => void
}


export const UndoRedo = ({ editor, canUndo, canRedo, isEditable, IS_APPLE, setCanRedo, setCanUndo }: Props) => {
    useEffect(() => {
        editor.registerCommand<boolean>(
            CAN_UNDO_COMMAND,
            (payload) => {
                setCanUndo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
        editor.registerCommand<boolean>(
            CAN_REDO_COMMAND,
            (payload) => {
                setCanRedo(payload);
                console.log(payload)
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [])

    return (
        <>
            <Item
                disabled={!canUndo || !isEditable}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
            >
                <UndoIcon size={12} />
            </Item>
            <Item
                disabled={!canRedo || !isEditable}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title={IS_APPLE ? 'Redo (⌘Y)' : 'Redo (Ctrl+Y)'}
            >
                <RedoIcon size={12} />
            </Item>
        </>
    )
}
