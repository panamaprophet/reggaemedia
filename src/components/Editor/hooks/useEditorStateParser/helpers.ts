import { SerializedImageNode } from '@/components/Editor/plugins';
import { SerializedLinkNode } from '@lexical/link';
import { SerializedHeadingNode, SerializedQuoteNode } from '@lexical/rich-text';
import { SerializedLexicalNode, SerializedRootNode, SerializedParagraphNode, SerializedTextNode } from 'lexical';


export const isRoot = (node: SerializedLexicalNode): node is SerializedRootNode => node.type === 'root';

export const isParagraph = (node: SerializedLexicalNode): node is SerializedParagraphNode => node.type === 'paragraph';

export const isQuote = (node: SerializedLexicalNode): node is SerializedQuoteNode => node.type === 'quote';

export const isText = (node: SerializedLexicalNode): node is SerializedTextNode => node.type === 'text';

export const isImage = (node: SerializedLexicalNode): node is SerializedImageNode => node.type === 'image';

// export const isLineBreak = (node: SerializedLexicalNode): node is SerializedLineBreakNode => node.type === 'linebreak';

export const isHeading = (node: SerializedLexicalNode): node is SerializedHeadingNode => node.type === 'heading';

export const isLink = (node: SerializedLexicalNode): node is SerializedLinkNode => node.type === 'link';
