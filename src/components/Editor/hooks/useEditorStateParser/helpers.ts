import { SerializedLinkNode } from '@lexical/link';
import { SerializedHeadingNode } from '@lexical/rich-text';
import {
    SerializedLexicalNode,
    SerializedTextNode,
    ElementFormatType,
    SerializedElementNode,
    EditorThemeClasses,
} from 'lexical';
import { SerializedEmbedNode } from '@/components/Editor/plugins';
import { SerializedCutterNode } from '@/components/Editor/plugins/Cutter';
import { cx } from '@/helpers';


const textStyle: { [k: number]: string } = {
    1: 'font-bold',
    2: 'italic',
    8: 'underline underline-offset-1',
};

const tagMap: { [k: string]: string } = {
    root: 'div',
    paragraph: 'p',
    quote: 'blockquote',
    image: 'img',
    text: 'span',
    link: 'a',
    linebreak: 'span',
};

export const getTextStyle = (format: number) => textStyle[format] || '';

export const getAlign = (formatType: ElementFormatType) => formatType ? `text-${formatType}` : '';

export const isText = (node: SerializedLexicalNode): node is SerializedTextNode => node.type === 'text';

export const isImage = (node: SerializedLexicalNode): node is SerializedEmbedNode => node.type === 'image';

export const isHeading = (node: SerializedLexicalNode): node is SerializedHeadingNode => node.type === 'heading';

export const isLink = (node: SerializedLexicalNode): node is SerializedLinkNode => node.type === 'link';

export const isElementNode = (node: SerializedLexicalNode): node is SerializedElementNode => 'children' in node;

export const isCutter = (node: SerializedLexicalNode): node is SerializedCutterNode => node.type === 'cutter';

export const getTagByType = (nodeType: string) => {
    const tag = tagMap[nodeType];

    if (!tag) {
        console.log('node is not supported:', nodeType);

        return 'span';
    }

    return tag;
};

export const getClassName = (node: SerializedLexicalNode, theme: EditorThemeClasses) => {
    const align = isElementNode(node) && getAlign(node.format);
    const style = isText(node) && getTextStyle(node.format);
    const className = cx(align, style, isHeading(node) ? theme.heading?.[node.tag] : theme[node.type]);

    return className;
};
