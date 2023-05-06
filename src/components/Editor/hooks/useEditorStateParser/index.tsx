import Image from 'next/image';
import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { cx } from '@/helpers';
import {
    getAlign,
    getTextStyle,
    isElementNode,
    isHeading,
    isImage,
    isLineBreak,
    isLink,
    isParagraph,
    isQuote,
    isRoot,
    isText,
} from './helpers';


export const useEditorStateParser = (
    { root }: SerializedEditorState,
    { theme }: { theme: EditorThemeClasses },
) => {
    let key = 0;

    const convertToHtml = (node: SerializedLexicalNode) => {
        key++;

        const children = isElementNode(node) ? node.children.map(convertToHtml) : null;

        const align = isElementNode(node) ? getAlign(node.format) : null;
        const style = isText(node) ? getTextStyle(node.format) : null;
        const className = cx(align, style, isHeading(node) ? theme.heading?.[node.tag] : theme[node.type]);

        const props = { key, className, children };

        if (isRoot(node)) {
            return <div {...props} />;
        }

        if (isParagraph(node)) {
            return <p {...props} />;
        }

        if (isQuote(node)) {
            return <blockquote {...props} />;
        }

        if (isImage(node)) {
            return <Image {...props} {...node} alt={node.alt || ''} />;
        }

        if (isText(node)) {
            return style ? <span {...props}>{node.text}</span> : node.text;
        }

        if (isLink(node)) {
            return <a {...props} href={node.url} />
        }

        if (isHeading(node)) {
            const Tag = node.tag;

            return <Tag {...props} />;
        }

        if (isLineBreak(node)) {
            return <br {...props} />;
        }

        console.log('node is not supported:', node.type);

        return null;
    };

    return convertToHtml(root);
};
