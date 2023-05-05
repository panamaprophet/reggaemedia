import Image from 'next/image';
import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import { isHeading, isImage, isLink, isParagraph, isQuote, isRoot, isText } from './helpers';


export const useEditorStateParser = (
    { root }: SerializedEditorState,
    { theme }: { theme: EditorThemeClasses },
) => {
    let key = 0;

    const convertToHtml = (node: SerializedLexicalNode) => {
        if (isRoot(node)) {
            const children = node.children.map(convertToHtml);

            return <div key={++key} className={theme.root}>{children}</div>;
        }

        if (isParagraph(node)) {
            const children = node.children.map(convertToHtml);

            return <p key={++key} className={theme.paragraph}>{children}</p>;
        }

        if (isQuote(node)) {
            const children = node.children.map(convertToHtml);

            return <blockquote key={++key} className={theme.quote}>{children}</blockquote>;
        }

        if (isImage(node)) {
            return <Image key={++key} {...node} alt={node.alt || ''} className={theme.image} />;
        }

        if (isText(node)) {
            return node.text;
        }

        if (isLink(node)) {
            const children = node.children.map(convertToHtml);

            return <a key={++key} href={node.url}>{children}</a>;
        }

        if (isHeading(node)) {
            const Tag = node.tag;
            const children = node.children.map(convertToHtml);

            return <Tag key={++key} className={theme.heading?.[node.tag]}>{children}</Tag>;
        }

        console.log('node is not supported:', node.type);

        return null;
    };

    return convertToHtml(root);
};
