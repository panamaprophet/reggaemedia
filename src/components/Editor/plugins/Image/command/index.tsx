import { LexicalCommand, createCommand } from 'lexical';
import { ImagePayload } from '../node';


export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand(
    'INSERT_IMAGE_COMMAND'
);
