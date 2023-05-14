import { LexicalCommand, createCommand } from 'lexical';
import { ImagePayload } from '../node';


export const INSERT_IMAGE_FILE_COMMAND: LexicalCommand<File> = createCommand(
    'INSERT_IMAGE_FILE_COMMAND'
);

export const INSERT_IMAGE_URL_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_IMAGE_URL_COMMAND'
);

export const RESIZE_IMAGE_COMMAND: LexicalCommand<{ width: number, height: number, key: ImagePayload['key'] }> = createCommand(
    'RESIZE_IMAGE_COMMAND'
);

export const INSERT_YOUTUBE_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_YOUTUBE_COMMAND'
);

export const INSERT_SOUNDCLOUD_COMMAND: LexicalCommand<string> = createCommand(
    'INSERT_SOUNDCLOUD_COMMAND'
);
