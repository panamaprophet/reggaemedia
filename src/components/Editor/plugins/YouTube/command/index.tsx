import { LexicalCommand, createCommand } from 'lexical';


export const INSERT_YOUTUBE_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_YOUTUBE_COMMAND'
);

export const RESIZE_YOUTUBE_COMMAND: LexicalCommand<{ width: string, height: string, }> = createCommand(
    'RESIZE_YOUTUBE_COMMAND'
);
