import Image from 'next/image';
import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { cx } from '@/helpers';
import {
    getAlign,
    getTextStyle,
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

        if (isRoot(node)) {
            const children = node.children.map(convertToHtml);

            return <div key={key} className={theme.root}>{children}</div>;
        }

        if (isParagraph(node) && node.children.length > 0) {
            const children = node.children.map(convertToHtml);
            const align = getAlign(node.format);

            return <p key={key} className={cx(theme.paragraph, align)}>{children}</p>;
        }

        if (isQuote(node)) {
            const children = node.children.map(convertToHtml);

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
            const children = node.children.map(convertToHtml);

            return <a key={key} href={node.url}>{children}</a>;
        }

        if (isHeading(node)) {
            const Tag = node.tag;
            const children = node.children.map(convertToHtml);
            const align = getAlign(node.format);

            return <Tag key={key} className={cx(theme.heading?.[node.tag], align)}>{children}</Tag>;
        }

        // treat empty paragraph as line break
        // @todo: fix it on article save
        if (isLineBreak(node) || (isParagraph(node) && !node.children.length)) {
            return <br key={key} />;
        }

        console.log('node is not supported:', node.type);

        return null;
    };

    return convertToHtml(root);
};
