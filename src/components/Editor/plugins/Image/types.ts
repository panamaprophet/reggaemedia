import { LexicalEditor, NodeKey } from 'lexical';

export type InsertImagePayload = Readonly<ImagePayload>;

export type Dimension = 'inherit' | number;

export interface ImagePayload {
    altText: string;
    src: string;
    key?: NodeKey;
    width?: Dimension;
    height?: Dimension;
    maxWidth?: number;
    showCaption?: boolean;
    caption?: LexicalEditor;
    captionsEnabled?: boolean;
}
