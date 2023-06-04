import { LexicalCommand, createCommand } from 'lexical';


export const RESIZE_EMBED_COMMAND: LexicalCommand<{
    key: string,
    width: number,
    height: number,
}> = createCommand('RESIZE_EMBED_COMMAND');


export const INSERT_EMBED_COMMAND: LexicalCommand<{
    type: string,
    source: string,
} | {
    type: 'image',
    source: File | string,
}> = createCommand('INSERT_EMBED_COMMAND');
