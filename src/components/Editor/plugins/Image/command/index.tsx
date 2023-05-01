import { LexicalCommand, createCommand } from 'lexical';
import { ImagePayload } from '../node';


export const INSERT_IMAGE_COMMAND: LexicalCommand<ImagePayload> = createCommand(
    'INSERT_IMAGE_COMMAND'
);

export const RESIZE_IMAGE_COMMAND: LexicalCommand<{ width: number, height: number, key: ImagePayload['key'] }> = createCommand(
    'RESIZE_IMAGE_COMMAND'
);
