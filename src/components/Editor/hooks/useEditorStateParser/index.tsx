import { EditorThemeClasses, SerializedEditorState, SerializedLexicalNode } from 'lexical';
import Image from 'next/image';
import {
    getClassName,
    getTagByType,
    isCutter,
    isElementNode,
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

        const props ={
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
            Object.assign(props, { href: node.url });
        }

        if (isText(node) && !props.className) {
            return node.text;
        }

        if (isImage(node)) {
            const { alt, ...rest } = node;

            return <Image alt={alt} {...props} {...rest} />;
        }

        return <Tag {...props} />;
    };

    return convertToHtml(root);
};
