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

        if (isRoot(node)) {
            return <div key={key} className={theme.root}>{children}</div>;
        }

        if (isParagraph(node)) {
            return <p key={key} className={cx(theme.paragraph, align)}>{children}</p>;
        }

        if (isQuote(node)) {
            return <blockquote key={key} className={theme.quote}>{children}</blockquote>;
        }

        if (isImage(node)) {
            return <Image key={key} {...node} alt={node.alt || ''} className={theme.image} />;
        }

        if (isText(node)) {
            const style = getTextStyle(node.format);

            return style ? <span key={key} className={style}>{node.text}</span> : node.text;
        }

        if (isLink(node)) {
            return <a key={key} href={node.url}>{children}</a>;
        }

        if (isHeading(node)) {
            const Tag = node.tag;

            return <Tag key={key} className={cx(theme.heading?.[node.tag], align)}>{children}</Tag>;
        }

        if (isLineBreak(node)) {
            return <br key={key} />;
        }

        console.log('node is not supported:', node.type);

        return null;
    };

    return convertToHtml(root);
};
