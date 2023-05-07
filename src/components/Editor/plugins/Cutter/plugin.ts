import { COMMAND_PRIORITY_EDITOR, LexicalCommand, createCommand } from 'lexical';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { useRegisterCommand } from '../../hooks/useRegisterCommand';
import { Node } from './node';


export const INSERT_CUTTER_COMMAND: LexicalCommand<void> = createCommand('INSERT_CUTTER_COMMAND');

export const Plugin = () => {
    useRegisterCommand<void>(INSERT_CUTTER_COMMAND, () => {
        $insertNodeToNearestRoot(new Node());
        return true;
    }, COMMAND_PRIORITY_EDITOR);

    return null;
};
