import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import Image from 'next/image';
import {
    getClassName,
    getTagByType,
    isCutter,
    isElementNode,
    isEmbed,
    isHeading,
    isImage,
    isLink,
    isText,
} from './helpers';


export const useEditorStateParser = (
    { root }: SerializedEditorState,
    { theme, isPreview }: { theme: EditorThemeClasses, isPreview?: boolean },
) => {
    let key = 0;

    const convertToHtml = (node: SerializedLexicalNode) => {
        const Tag = isHeading(node) ? node.tag : getTagByType(node.type);

        const props = {
            key: key++,
            children: null,
            className: getClassName(node, theme),
        };

        if (isElementNode(node)) {
            const cutterIndex = node.children.findIndex(isCutter);
            const children = (isPreview && cutterIndex !== -1)
                ? node.children.slice(0, cutterIndex)
                : node.children;

            Object.assign(props, { children: children.map(convertToHtml) });
        }

        if (isText(node)) {
            Object.assign(props, { children: node.text });
        }

        if (isLink(node)) {
            Object.assign(props, { href: node.url, target: node.target });
        }

        if (isEmbed(node)) {
            Object.assign(props, {
                width: node.width,
                height: node.height,
                src: decodeURIComponent(node.src),
            });
        }

        if (isText(node) && !props.className) {
            return node.text;
        }

        if (isImage(node)) {
            const { alt, src } = node;

            return <Image alt={alt} src={decodeURIComponent(src)} {...props} />;
        }

        if (isEmbed(node)) {
            const { key, className } = props;

            return (
                <p key={key} className={className}>
                    <Tag {...props} />
                </p>
            );
        }

        return <Tag {...props} />;
    };

    return convertToHtml(root);
};
