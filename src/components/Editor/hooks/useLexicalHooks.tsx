import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_NORMAL,
    CommandListener,
    CommandListenerPriority,
    EditableListener,
    LexicalCommand,
    LexicalEditor,
} from 'lexical';
import { UpdateListener } from 'lexical/LexicalEditor';
import { useEffect } from 'react';


type Payload =
    | ['onUpdate', UpdateListener]
    | ['onEdit', EditableListener]
    ;

export const useRegisterListener = (...[event, listener]: Payload) => {
    const [editor] = useLexicalComposerContext();

    return useEffect(() => {
        if (event === 'onUpdate') {
            return editor.registerUpdateListener(listener);
        }

        if (event === 'onEdit') {
            return editor.registerEditableListener(listener);
        }

        return () => {
            console.log(`warning: no callback was registered for event ${event}`);
        };
    }, [event, editor, listener]);
};

export const useRegisterCommand = <T,>(
    command: LexicalCommand<LexicalEditor>,
    callback: CommandListener<T>,
    priority: CommandListenerPriority = COMMAND_PRIORITY_NORMAL,
) => {
    const [editor] = useLexicalComposerContext();

    return useEffect(() => editor.registerCommand<T>(command, callback, priority), [
        editor,
        command,
        callback,
        priority,
    ]);
};

export const useRegisterCommandCritical = <T,>(
    command: LexicalCommand<LexicalEditor>,
    callback: CommandListener<T>,
) => useRegisterCommand(command, callback, COMMAND_PRIORITY_CRITICAL);
