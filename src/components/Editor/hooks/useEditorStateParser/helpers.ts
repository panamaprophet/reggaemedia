import { SerializedImageNode } from '@/components/Editor/plugins';
import { SerializedLinkNode } from '@lexical/link';
import { SerializedHeadingNode, SerializedQuoteNode } from '@lexical/rich-text';
import {
    SerializedLexicalNode,
    SerializedRootNode,
    SerializedParagraphNode,
    SerializedTextNode,
    ElementFormatType,
    SerializedLineBreakNode,
    SerializedElementNode,
} from 'lexical';


const TextStyle: { [k: number]: string } = {
    1: 'font-bold',
    2: 'italic',
    8: 'underline underline-offset-1',
};

export const getTextStyle = (format: number) => TextStyle[format] || '';

export const getAlign = (formatType: ElementFormatType) => formatType ? `text-${formatType}` : '';

// this exact node type is necessary because of eqaulity of SerializedLineBreakNode and SerializedLexicalNode
export const isLineBreak = (node: SerializedLexicalNode): node is SerializedLineBreakNode & { type: 'linebreak' } => node.type === 'linebreak';

export const isRoot = (node: SerializedLexicalNode): node is SerializedRootNode => node.type === 'root';

export const isParagraph = (node: SerializedLexicalNode): node is SerializedParagraphNode => node.type === 'paragraph';

export const isQuote = (node: SerializedLexicalNode): node is SerializedQuoteNode => node.type === 'quote';

export const isText = (node: SerializedLexicalNode): node is SerializedTextNode => node.type === 'text';

export const isImage = (node: SerializedLexicalNode): node is SerializedImageNode => node.type === 'image';

export const isHeading = (node: SerializedLexicalNode): node is SerializedHeadingNode => node.type === 'heading';

export const isLink = (node: SerializedLexicalNode): node is SerializedLinkNode => node.type === 'link';

export const isElementNode = (node: SerializedLexicalNode): node is SerializedElementNode => 'children' in node;
