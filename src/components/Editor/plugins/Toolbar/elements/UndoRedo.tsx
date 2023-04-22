import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_CRITICAL,
    REDO_COMMAND,
    UNDO_COMMAND
} from 'lexical';

import { Undo as UndoIcon } from '@/components/Icons/Undo';
import { Redo as RedoIcon } from '@/components/Icons/Redo';
import { Item } from './Item';


export const UndoRedo = () => {
    const [editor] = useLexicalComposerContext();
    const [canUndo, setUndo] = useState(false);
    const [canRedo, setRedo] = useState(false);

    useEffect(() => {
        editor.registerCommand<boolean>(
            CAN_UNDO_COMMAND,
            (payload) => {
                setUndo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
        editor.registerCommand<boolean>(
            CAN_REDO_COMMAND,
            (payload) => {
                setRedo(payload);
                return false;
            },
            COMMAND_PRIORITY_CRITICAL,
        );
    }, [editor]);

    return (
        <>
            <Item
                disabled={!canUndo || !editor.isEditable()}
                onClick={() => {
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                title="Undo"
            >
                <UndoIcon size={12} />
            </Item>
            <Item
                disabled={!canRedo || !editor.isEditable()}
                onClick={() => {
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                title="Redo"
            >
                <RedoIcon size={12} />
            </Item>
        </>
    )
}
