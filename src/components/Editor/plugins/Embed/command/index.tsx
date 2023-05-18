import { LexicalCommand, createCommand } from 'lexical';


export const INSERT_IMAGE_FILE_COMMAND: LexicalCommand<File> = createCommand('INSERT_IMAGE_FILE_COMMAND');

export const INSERT_IMAGE_URL_COMMAND: LexicalCommand<string> = createCommand('INSERT_IMAGE_URL_COMMAND');

export const RESIZE_EMBED_COMMAND: LexicalCommand<{ width: number, height: number, key: string }> = createCommand(
    'RESIZE_EMBED_COMMAND'
);

export const INSERT_EMBED_COMMAND: LexicalCommand<{ type: string, source: string } | { type: 'image', source: File | string }> = createCommand('INSERT_EMBED_COMMAND');
