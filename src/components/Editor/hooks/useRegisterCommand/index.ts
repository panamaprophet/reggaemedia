import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    COMMAND_PRIORITY_CRITICAL,
    COMMAND_PRIORITY_NORMAL,
    CommandListener,
    CommandListenerPriority,
    LexicalCommand,
    LexicalEditor,
} from 'lexical';
import { useEffect } from 'react';


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
